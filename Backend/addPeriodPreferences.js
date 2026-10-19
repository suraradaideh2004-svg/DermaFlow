require("dotenv").config();

const pool = require("./db");


const updateDatabase = async () => {
  try {
    await pool.query(`
      ALTER TABLE clients

      ADD COLUMN IF NOT EXISTS
        period_tracking_enabled BOOLEAN
        DEFAULT FALSE,

      ADD COLUMN IF NOT EXISTS
        last_period_start DATE,

      ADD COLUMN IF NOT EXISTS
        cycle_length_days INTEGER
        DEFAULT 28,

      ADD COLUMN IF NOT EXISTS
        period_length_days INTEGER
        DEFAULT 5;
    `);


    console.log(
      "Period scheduling fields added successfully."
    );

  } catch (error) {
    console.error(
      "Database update failed:",
      error
    );

  } finally {
    await pool.end();
  }
};


updateDatabase();