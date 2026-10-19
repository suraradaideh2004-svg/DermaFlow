/* =========================================================
   DERMAFLOW SHARED SPECIALIST DATA

   This data is shared between the public website
   and the Admin Dashboard.

   Later this data will come from the backend/database.
========================================================= */
/* =========================================================
   CLINIC SERVICES

   Service IDs must match the IDs used by the booking flow.
========================================================= */

export const clinicServices = [
  {
    id: 1,
    name: "Laser Hair Removal",
  },

  {
    id: 2,
    name: "Hydrafacial",
  },

  {
    id: 3,
    name: "Skin Rejuvenation",
  },

  {
    id: 4,
    name: "Acne Treatment",
  },

  {
    id: 5,
    name: "Pigmentation Treatment",
  },

  {
    id: 6,
    name: "Deep Cleansing Facial",
  },
];
export const initialSpecialists = [
  {
    id: 1,

    name: "Dr. Lina Ahmad",

    specialty:
      "Dermatology & Skin Care",

    specialtyAr:
      "العناية بالبشرة والجلدية",

    /* Controls whether the specialist appears publicly. */

    isActive: true,

    /* Service IDs that this specialist can perform. */

    services: [2, 3, 4, 5, 6],

    /*
      JavaScript day numbers:
      0 = Sunday
      1 = Monday
      2 = Tuesday
      3 = Wednesday
      4 = Thursday
      5 = Friday
      6 = Saturday

      Each day contains the available booking time slots.
    */

    schedule: {
      0: [],

      1: [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
      ],

      2: [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "03:00 PM",
      ],

      3: [
        "09:00 AM",
        "10:00 AM",
        "01:00 PM",
        "04:00 PM",
      ],

      4: [
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
      ],

      5: [],

      6: [
        "09:00 AM",
        "11:00 AM",
        "01:00 PM",
      ],
    },
  },

  {
    id: 2,

    name: "Dr. Sara Khalil",

    specialty:
      "Laser Specialist",

    specialtyAr:
      "أخصائية ليزر",

    isActive: true,

    services: [1, 3, 5],

    schedule: {
      0: [
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
      ],

      1: [
        "09:00 AM",
        "10:00 AM",
        "12:00 PM",
        "03:00 PM",
      ],

      2: [],

      3: [
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "04:00 PM",
      ],

      4: [
        "09:00 AM",
        "12:00 PM",
        "03:00 PM",
      ],

      5: [],

      6: [
        "10:00 AM",
        "01:00 PM",
        "04:00 PM",
      ],
    },
  },

  {
    id: 3,

    name: "Dr. Maya Ali",

    specialty:
      "Facial & Skin Treatments",

    specialtyAr:
      "علاجات الوجه والبشرة",

    isActive: true,

    services: [2, 3, 4, 6],

    schedule: {
      0: [
        "11:00 AM",
        "12:00 PM",
        "03:00 PM",
      ],

      1: [
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
      ],

      2: [
        "09:00 AM",
        "12:00 PM",
        "03:00 PM",
        "05:00 PM",
      ],

      3: [],

      4: [
        "10:00 AM",
        "01:00 PM",
        "04:00 PM",
      ],

      5: [],

      6: [
        "09:00 AM",
        "11:00 AM",
        "02:00 PM",
      ],
    },
  },
];