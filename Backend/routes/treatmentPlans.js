const express = require("express");
const pool = require("../db");

const router = express.Router();


/* =========================================================
   GET CLIENT TREATMENT PLANS
========================================================= */

router.get(
  "/client/:clientId",
  async (req, res) => {
    try {
      const clientId =
        Number(req.params.clientId);


      const result =
        await pool.query(
          `
          SELECT
            tp.id,

            tp.client_id AS "clientId",

            tp.treatment_id AS "treatmentId",
            t.name AS treatment,
            t.name_ar AS "treatmentAr",

            tp.specialist_id AS "specialistId",
            s.name AS specialist,

            tp.total_sessions AS "totalSessions",
            tp.completed_sessions AS "completedSessions",

            TO_CHAR(
              tp.start_date,
              'YYYY-MM-DD'
            ) AS "startDate",

            TO_CHAR(
              tp.last_session,
              'YYYY-MM-DD'
            ) AS "lastSession",

            TO_CHAR(
              tp.next_suggested,
              'YYYY-MM-DD'
            ) AS "nextSuggested",

            tp.interval_days AS "intervalDays",

            tp.areas,

            tp.created_at AS "createdAt"

          FROM treatment_plans tp

          JOIN treatments t
            ON t.id = tp.treatment_id

          LEFT JOIN specialists s
            ON s.id = tp.specialist_id

          WHERE tp.client_id = $1

          ORDER BY tp.created_at DESC
          `,
          [clientId]
        );


      res.status(200).json({
        success: true,
        treatmentPlans:
          result.rows,
      });

    } catch (error) {

      console.error(
        "Get treatment plans error:",
        error
      );


      res.status(500).json({
        success: false,
        message:
          "Failed to get treatment plans.",
      });
    }
  }
);


/* =========================================================
   CREATE TREATMENT PLAN
========================================================= */

router.post(
  "/",
  async (req, res) => {
    try {

      const {
        clientId,
        treatmentId,
        specialistId,
        totalSessions,
        startDate,
        intervalDays,
        areas,
      } = req.body;


      if (
        !clientId ||
        !treatmentId ||
        !totalSessions
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Client, treatment and total sessions are required.",
          });
      }


      const result =
        await pool.query(
          `
          INSERT INTO treatment_plans
          (
            client_id,
            treatment_id,
            specialist_id,
            total_sessions,
            completed_sessions,
            start_date,
            interval_days,
            areas
          )

          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            0,
            $5,
            $6,
            $7
          )

          RETURNING id
          `,
          [
            Number(clientId),
            Number(treatmentId),

            specialistId
              ? Number(specialistId)
              : null,

            Number(totalSessions),

            startDate || null,

            Number(
              intervalDays || 30
            ),

            JSON.stringify(
              areas || []
            ),
          ]
        );


      const newPlanId =
        result.rows[0].id;


      const planResult =
        await pool.query(
          `
          SELECT
            tp.id,

            tp.client_id AS "clientId",

            tp.treatment_id AS "treatmentId",
            t.name AS treatment,
            t.name_ar AS "treatmentAr",

            tp.specialist_id AS "specialistId",
            s.name AS specialist,

            tp.total_sessions AS "totalSessions",
            tp.completed_sessions AS "completedSessions",

            TO_CHAR(
              tp.start_date,
              'YYYY-MM-DD'
            ) AS "startDate",

            TO_CHAR(
              tp.last_session,
              'YYYY-MM-DD'
            ) AS "lastSession",

            TO_CHAR(
              tp.next_suggested,
              'YYYY-MM-DD'
            ) AS "nextSuggested",

            tp.interval_days AS "intervalDays",

            tp.areas,

            tp.created_at AS "createdAt"

          FROM treatment_plans tp

          JOIN treatments t
            ON t.id = tp.treatment_id

          LEFT JOIN specialists s
            ON s.id = tp.specialist_id

          WHERE tp.id = $1
          `,
          [newPlanId]
        );


      res.status(201).json({
        success: true,

        message:
          "Treatment plan created successfully.",

        treatmentPlan:
          planResult.rows[0],
      });

    } catch (error) {

      console.error(
        "Create treatment plan error:",
        error
      );


      res.status(500).json({
        success: false,
        message:
          "Failed to create treatment plan.",
      });
    }
  }
);


module.exports = router;