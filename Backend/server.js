const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const pool = require("./db");
const clientsRouter =
  require("./routes/clients");

const app = express();

const PORT =
  process.env.PORT || 5000;
const appointmentsRouter =
  require("./routes/appointments");

  const treatmentPlansRouter =
  require("./routes/treatmentPlans");
  const sessionsRouter =
  require("./routes/sessions");

/* Middleware */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  "/api/clients",
  clientsRouter
);
app.use(
  "/api/appointments",
  appointmentsRouter
);

app.use(
  "/api/treatment-plans",
  treatmentPlansRouter
);
app.use(
  "/api/sessions",
  sessionsRouter
);
/* Test route */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DermaFlow API is running.",
  });
});
/* Database test route */

app.get(
  "/api/db-health",
  async (req, res) => {
    try {
      const result =
        await pool.query(
          "SELECT NOW()"
        );

      res.status(200).json({
        success: true,
        message:
          "Database connected successfully.",
        databaseTime:
          result.rows[0].now,
      });

    } catch (error) {
      console.error(
        "Database connection error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Database connection failed.",
      });
    }
  }
);

/* 404 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});


/* Server */

app.listen(PORT, () => {
  console.log(
    `DermaFlow API running on http://localhost:${PORT}`
  );
});