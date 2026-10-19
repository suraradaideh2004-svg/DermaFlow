const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pool = require("./db");


const initializeDatabase = async () => {
  try {
    const schemaPath =
      path.join(
        __dirname,
        "schema.sql"
      );


    const schema =
      fs.readFileSync(
        schemaPath,
        "utf8"
      );


    await pool.query(schema);


    console.log(
      "DermaFlow database tables created successfully."
    );

  } catch (error) {

    console.error(
      "Database initialization failed:",
      error
    );

  } finally {

    await pool.end();

  }
};


initializeDatabase();