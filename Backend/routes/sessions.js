const express = require("express");
const pool = require("../db");

const router = express.Router();


/* =========================================================
   GET CLIENT SESSION HISTORY
========================================================= */

router.get("/client/:clientId", async (req, res) => {
  const clientId = Number(req.params.clientId);

  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.treatment_plan_id AS "treatmentPlanId",
        TO_CHAR(s.session_date, 'YYYY-MM-DD') AS "date",
        s.session_number AS "sessionNumber",
        s.notes,

        tp.total_sessions AS "totalSessions",
        tp.areas,

        t.name AS "treatment",
        t.name_ar AS "treatmentAr",

        sp.name AS "specialist"

      FROM sessions s

      JOIN treatment_plans tp
        ON tp.id = s.treatment_plan_id

      JOIN treatments t
        ON t.id = tp.treatment_id

      LEFT JOIN specialists sp
        ON sp.id = s.specialist_id

      WHERE tp.client_id = $1

      ORDER BY
        s.session_date DESC,
        s.id DESC
      `,
      [clientId]
    );

    res.json({
      success: true,
      sessions: result.rows,
    });

  } catch (error) {
    console.error(
      "Get client sessions error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load sessions.",
    });
  }
});


/* =========================================================
   CREATE NEW SESSION
========================================================= */

router.post("/", async (req, res) => {
  const {
    treatmentPlanId,
    sessionDate,
    specialistId,
    notes,
  } = req.body;

  const db = await pool.connect();

  try {
    await db.query("BEGIN");


    /* Lock the treatment plan while updating it. */
    const planResult = await db.query(
      `
      SELECT
        tp.*,
        t.name AS treatment,
        t.name_ar AS treatment_ar

      FROM treatment_plans tp

      JOIN treatments t
        ON t.id = tp.treatment_id

      WHERE tp.id = $1

      FOR UPDATE OF tp
      `,
      [treatmentPlanId]
    );


    if (planResult.rows.length === 0) {
      await db.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Treatment plan not found.",
      });
    }


    const plan = planResult.rows[0];


    if (
      plan.completed_sessions >=
      plan.total_sessions
    ) {
      await db.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message:
          "This treatment plan is already completed.",
      });
    }


    const newSessionNumber =
      plan.completed_sessions + 1;


    const isCompleted =
      newSessionNumber >=
      plan.total_sessions;


    /* Calculate next suggested visit. */
    let nextSuggested = null;

    if (!isCompleted) {
      const date = new Date(
        `${sessionDate}T00:00:00`
      );

      date.setDate(
        date.getDate() +
          Number(plan.interval_days || 30)
      );

      nextSuggested =
        date
          .toISOString()
          .split("T")[0];
    }


    /* Save the session. */
    const sessionResult = await db.query(
      `
      INSERT INTO sessions (
        treatment_plan_id,
        session_date,
        session_number,
        specialist_id,
        notes
      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING
        id,
        treatment_plan_id,
        TO_CHAR(session_date, 'YYYY-MM-DD')
          AS session_date,
        session_number,
        specialist_id,
        notes,
        created_at
      `,
      [
        treatmentPlanId,
        sessionDate,
        newSessionNumber,
        specialistId || plan.specialist_id,
        notes || null,
      ]
    );


    /* Update treatment plan progress. */
    const updatedPlanResult =
      await db.query(
        `
        UPDATE treatment_plans

        SET
          completed_sessions = $1,
          last_session = $2,
          next_suggested = $3

        WHERE id = $4

        RETURNING *
        `,
        [
          newSessionNumber,
          sessionDate,
          nextSuggested,
          treatmentPlanId,
        ]
      );


    /* Update client's last visit. */
    await db.query(
      `
      UPDATE clients

      SET
        last_visit = $1,
        updated_at = NOW()

      WHERE id = $2
      `,
      [
        sessionDate,
        plan.client_id,
      ]
    );


    await db.query("COMMIT");


    const session =
      sessionResult.rows[0];

    const updatedPlan =
      updatedPlanResult.rows[0];


    res.status(201).json({
      success: true,

      message:
        "Session saved successfully.",

      session: {
        id:
          session.id,

        treatmentPlanId:
          session.treatment_plan_id,

        date:
          session.session_date,

        sessionNumber:
          session.session_number,

        totalSessions:
          plan.total_sessions,

        treatment:
          plan.treatment,

        treatmentAr:
          plan.treatment_ar,

        specialistId:
          session.specialist_id,

        areas:
          plan.areas,

        notes:
          session.notes,
      },

      treatmentPlan: {
        id:
          updatedPlan.id,

        completedSessions:
          updatedPlan.completed_sessions,

        lastSession:
          updatedPlan.last_session,

        nextSuggested:
          updatedPlan.next_suggested,
      },
    });

  } catch (error) {

    await db.query("ROLLBACK");

    console.error(
      "Create session error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to save session.",
    });

  } finally {

    db.release();
  }
});


module.exports = router;