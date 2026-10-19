const express = require("express");
const pool = require("../db");

const router = express.Router();


/* =========================================================
   GET ALL APPOINTMENTS
========================================================= */

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,

        a.client_id AS "clientId",
        c.name AS client,
        c.phone,
        c.email,

        a.treatment_id AS "treatmentId",
        t.name AS treatment,
        t.name_ar AS "treatmentAr",

        a.specialist_id AS "specialistId",
        s.name AS specialist,

       TO_CHAR(
  a.appointment_date,
  'YYYY-MM-DD'
) AS date,
        a.appointment_time AS time,

        a.status,
        a.source,

        a.created_at AS "createdAt"

      FROM appointments a

      LEFT JOIN clients c
        ON c.id = a.client_id

      LEFT JOIN treatments t
        ON t.id = a.treatment_id

      LEFT JOIN specialists s
        ON s.id = a.specialist_id

      ORDER BY
        a.appointment_date ASC,
        a.appointment_time ASC
    `);


    res.status(200).json({
      success: true,
      appointments: result.rows,
    });

  } catch (error) {

    console.error(
      "Get appointments error:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to get appointments.",
    });
  }
});


/* =========================================================
   CREATE APPOINTMENT
========================================================= */

router.post("/", async (req, res) => {
  try {
    const {
      clientId,
      treatmentId,
      specialistId,
      date,
      time,
      status = "pending",
      source = "website",
    } = req.body;


    if (
      !clientId ||
      !treatmentId ||
      !specialistId ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Client, treatment, specialist, date and time are required.",
      });
    }


    /* Prevent double booking. */

    const existingAppointment =
      await pool.query(
        `
        SELECT id
        FROM appointments

        WHERE specialist_id = $1
          AND appointment_date = $2
          AND appointment_time = $3
          AND status != 'cancelled'
        `,
        [
          specialistId,
          date,
          time,
        ]
      );


    if (
      existingAppointment.rows.length >
      0
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This appointment slot is already booked.",
      });
    }


    const result =
      await pool.query(
        `
        INSERT INTO appointments
        (
          client_id,
          treatment_id,
          specialist_id,
          appointment_date,
          appointment_time,
          status,
          source
        )

        VALUES
        ($1, $2, $3, $4, $5, $6, $7)

        RETURNING *
        `,
        [
          clientId,
          treatmentId,
          specialistId,
          date,
          time,
          status,
          source,
        ]
      );


    res.status(201).json({
      success: true,
      message:
        "Appointment created successfully.",
      appointment:
        result.rows[0],
    });

  } catch (error) {

    console.error(
      "Create appointment error:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to create appointment.",
    });
  }
});
/* =========================================================
   UPDATE APPOINTMENT
========================================================= */

router.patch("/:id", async (req, res) => {
  try {
    const appointmentId =
      Number(req.params.id);

    const {
      status,
      date,
      time,
    } = req.body;


    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];


    if (
      status &&
      !allowedStatuses.includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid appointment status.",
      });
    }


    /* Get current appointment. */

    const currentResult =
      await pool.query(
        `
        SELECT *
        FROM appointments
        WHERE id = $1
        `,
        [appointmentId]
      );


    if (
      currentResult.rows.length ===
      0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found.",
      });
    }


    const currentAppointment =
      currentResult.rows[0];


    /* Final appointments cannot be changed. */

    if (
      currentAppointment.status ===
        "completed" ||
      currentAppointment.status ===
        "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This appointment can no longer be changed.",
      });
    }


    const newDate =
      date ||
      currentAppointment.appointment_date;

    const newTime =
      time ||
      currentAppointment.appointment_time;


    /* Prevent double booking when rescheduling. */

    if (date || time) {

      const conflictResult =
        await pool.query(
          `
          SELECT id
          FROM appointments

          WHERE specialist_id = $1
            AND appointment_date = $2
            AND appointment_time = $3
            AND status != 'cancelled'
            AND id != $4
          `,
          [
            currentAppointment.specialist_id,
            newDate,
            newTime,
            appointmentId,
          ]
        );


      if (
        conflictResult.rows.length >
        0
      ) {
        return res.status(409).json({
          success: false,
          message:
            "This appointment slot is already booked.",
        });
      }
    }


    await pool.query(
      `
      UPDATE appointments

      SET
        appointment_date = $1,
        appointment_time = $2,
        status = $3,
        updated_at = NOW()

      WHERE id = $4
      `,
      [
        newDate,
        newTime,
        status ||
          currentAppointment.status,
        appointmentId,
      ]
    );


    /* Return the updated appointment in frontend format. */

    const updatedResult =
      await pool.query(
        `
        SELECT
          a.id,

          a.client_id AS "clientId",
          c.name AS client,
          c.phone,
          c.email,

          a.treatment_id AS "treatmentId",
          t.name AS treatment,
          t.name_ar AS "treatmentAr",

          a.specialist_id AS "specialistId",
          s.name AS specialist,

          TO_CHAR(
            a.appointment_date,
            'YYYY-MM-DD'
          ) AS date,

          a.appointment_time AS time,

          a.status,
          a.source,

          a.created_at AS "createdAt"

        FROM appointments a

        LEFT JOIN clients c
          ON c.id = a.client_id

        LEFT JOIN treatments t
          ON t.id = a.treatment_id

        LEFT JOIN specialists s
          ON s.id = a.specialist_id

        WHERE a.id = $1
        `,
        [appointmentId]
      );


    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully.",
      appointment:
        updatedResult.rows[0],
    });

  } catch (error) {

    console.error(
      "Update appointment error:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to update appointment.",
    });
  }
});

module.exports = router;
