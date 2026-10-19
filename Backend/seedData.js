require("dotenv").config();

const pool = require("./db");


const treatments = [
  {
    name: "Laser Hair Removal",
    nameAr: "إزالة الشعر بالليزر",
    defaultSessions: 6,
    intervalDays: 28,
  },

  {
    name: "Hydrafacial",
    nameAr: "هيدرافيشل",
    defaultSessions: 4,
    intervalDays: 30,
  },

  {
    name: "Skin Rejuvenation",
    nameAr: "تجديد البشرة",
    defaultSessions: 4,
    intervalDays: 30,
  },

  {
    name: "Acne Treatment",
    nameAr: "علاج حب الشباب",
    defaultSessions: 6,
    intervalDays: 21,
  },
  {
  name: "Pigmentation Treatment",
  nameAr: "علاج التصبغات",
  defaultSessions: 4,
  intervalDays: 30,
},

{
  name: "Deep Cleansing Facial",
  nameAr: "تنظيف عميق للبشرة",
  defaultSessions: 4,
  intervalDays: 30,
},
];


const specialists = [
  {
    name: "Dr. Lina Ahmad",
    specialty:
      "Dermatology & Skin Care",
    specialtyAr:
      "العناية بالبشرة والجلدية",
  },

  {
    name: "Dr. Sara Khalil",
    specialty:
      "Laser Specialist",
    specialtyAr:
      "أخصائية ليزر",
  },

  {
    name: "Dr. Maya Ali",
    specialty:
      "Facial & Skin Treatments",
    specialtyAr:
      "علاجات الوجه والبشرة",
  },
];


const seedDatabase = async () => {
  try {

    /* Treatments */

    for (
      const treatment of
      treatments
    ) {

      const existing =
        await pool.query(
          `
          SELECT id
          FROM treatments
          WHERE name = $1
          `,
          [
            treatment.name,
          ]
        );


      if (
        existing.rows.length ===
        0
      ) {

        await pool.query(
          `
          INSERT INTO treatments
          (
            name,
            name_ar,
            default_sessions,
            interval_days
          )
          VALUES
          ($1, $2, $3, $4)
          `,
          [
            treatment.name,
            treatment.nameAr,
            treatment.defaultSessions,
            treatment.intervalDays,
          ]
        );

      }
    }


    /* Specialists */

    for (
      const specialist of
      specialists
    ) {

      const existing =
        await pool.query(
          `
          SELECT id
          FROM specialists
          WHERE name = $1
          `,
          [
            specialist.name,
          ]
        );


      if (
        existing.rows.length ===
        0
      ) {

        await pool.query(
          `
          INSERT INTO specialists
          (
            name,
            specialty,
            specialty_ar
          )
          VALUES
          ($1, $2, $3)
          `,
          [
            specialist.name,
            specialist.specialty,
            specialist.specialtyAr,
          ]
        );

      }
    }


    console.log(
      "DermaFlow seed data added successfully."
    );

  } catch (error) {

    console.error(
      "Seed data failed:",
      error
    );

  } finally {

    await pool.end();

  }
};


seedDatabase();