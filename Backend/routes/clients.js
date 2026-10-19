const express = require("express");
const pool = require("../db");

const router = express.Router();


/* =========================================================
   GET ALL CLIENTS
========================================================= */

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM clients
      ORDER BY created_at DESC
      `
    );

    res.status(200).json({
      success: true,
      clients: result.rows,
    });

  } catch (error) {
    console.error(
      "Get clients error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to get clients.",
    });
  }
});


/* =========================================================
   CREATE CLIENT
========================================================= */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
    } = req.body;


    if (
      !name ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name and phone are required.",
      });
    }


    const cleanName =
      name.trim();

    const cleanPhone =
      phone.trim();

    const cleanEmail =
      email?.trim() || null;


    /* Check whether this client already exists. */

    const existingClient =
      await pool.query(
        `
        SELECT *
        FROM clients
        WHERE phone = $1
        `,
        [cleanPhone]
      );


    if (
      existingClient.rows.length >
      0
    ) {

      const updatedClient =
        await pool.query(
          `
          UPDATE clients

          SET
            name = $1,
            email = COALESCE($2, email),
            updated_at = NOW()

          WHERE phone = $3

          RETURNING *
          `,
          [
            cleanName,
            cleanEmail,
            cleanPhone,
          ]
        );


      return res.status(200).json({
        success: true,
        existing: true,
        message:
          "Existing client found.",
        client:
          updatedClient.rows[0],
      });
    }


    /* Create a new client. */

    const result =
      await pool.query(
        `
        INSERT INTO clients
          (name, email, phone)

        VALUES
          ($1, $2, $3)

        RETURNING *
        `,
        [
          cleanName,
          cleanEmail,
          cleanPhone,
        ]
      );


    res.status(201).json({
      success: true,
      existing: false,
      message:
        "Client created successfully.",
      client:
        result.rows[0],
    });

  } catch (error) {

    console.error(
      "Create client error:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        "Failed to create client.",
    });
  }
});
/* =========================================================
   UPDATE PERIOD SCHEDULING PREFERENCES
========================================================= */

router.patch(
  "/:id/period-preferences",
  async (req, res) => {
    try {
      const clientId =
        Number(req.params.id);

      const {
        enabled,
        lastPeriodStart,
        cycleLengthDays,
        periodLengthDays,
      } = req.body;


      const result =
        await pool.query(
          `
          UPDATE clients

          SET
            period_tracking_enabled = $1,
            last_period_start = $2,
            cycle_length_days = $3,
            period_length_days = $4,
            updated_at = NOW()

          WHERE id = $5

          RETURNING *
          `,
          [
            Boolean(enabled),
            lastPeriodStart || null,
            Number(
              cycleLengthDays || 28
            ),
            Number(
              periodLengthDays || 5
            ),
            clientId,
          ]
        );


      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Client not found.",
        });
      }


      res.status(200).json({
        success: true,
        message:
          "Scheduling preferences updated.",
        client:
          result.rows[0],
      });

    } catch (error) {
      console.error(
        "Update period preferences error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update scheduling preferences.",
      });
    }
  }
);

module.exports = router;