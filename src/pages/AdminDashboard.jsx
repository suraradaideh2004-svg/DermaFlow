import { useState } from "react";
import { Link } from "react-router-dom";

import {
  clinicServices
} from "../data/clinicData";

import "../App.css";
import API_BASE_URL from "../config/api";
/* =========================================================
   ADMIN DASHBOARD TRANSLATIONS
========================================================= */

const translations = {
  en: {
    language: "العربية",

    adminPortal: "CLINIC ADMIN",

    overview: "Overview",
    appointments: "Appointments",
    clients: "Clients",
    treatments: "Treatments",
    specialists: "Specialists",
    bookingInbox: "Booking Inbox",
bookingInboxText:
  "New website bookings and booking updates.",

    home: "Website",
    signOut: "Sign Out",
    dashboard: "Dashboard",

    welcome: "Good morning",
    welcomeText:
      "Here is what is happening at DermaFlow today.",

    todaysAppointments: "Today's Appointments",
    totalClients: "Total Clients",
    activeTreatments: "Active Treatment Plans",
    specialistsCount: "Specialists",

    upcomingToday: "Today's Schedule",
    recentClients: "Recent Clients",
    viewAll: "View All",

    time: "Time",
    client: "Client",
    treatment: "Treatment",
    specialist: "Specialist",
    status: "Status",

    confirmed: "Confirmed",
    completed: "Completed",
    pending: "Pending",
    cancelled: "Cancelled",

    phone: "Phone",
    email: "Email",
    lastVisit: "Last Visit",
    plan: "Treatment Plan",

    appointmentManagement: "Appointment Management",
    appointmentText:
      "View and manage all clinic appointments.",

    clientManagement: "Client Management",
    clientText:
      "View client profiles, treatment plans and session history.",

    treatmentManagement: "Treatment Management",
    treatmentText:
      "Manage the treatments and services offered by the clinic.",

    specialistManagement: "Specialist Management",
    specialistText:
      "Manage clinic specialists and their schedules.",

    viewProfile: "View Profile",
    manage: "Manage",

    clientProfile: "Client Profile",
    backToClients: "Back to Clients",

    treatmentPlans: "Treatment Plans",
    sessionHistory: "Session History",

    activeTreatment: "ACTIVE TREATMENT",
    completedTreatment: "COMPLETED",

    allPlansCompleted:
      "All treatment plans are completed.",

    sessionsCompleted: "sessions completed",
    treatmentAreas: "Treatment Areas",

    lastSession: "Last Session",
    nextSuggested: "Suggested Next Visit",

    nextAppointment: "Next Appointment",
    noAppointment: "No upcoming appointment",

    emailReminder: "Email Reminder",
    reminderEnabled: "Enabled",
    reminderDisabled: "Disabled",

    reminderScheduled:
      "Reminder scheduled for",

    reminderSent:
      "Reminder already sent",

    twoDaysBefore:
      "The client will receive an email reminder 2 days before the appointment.",

    addSession: "Add New Session",
    newSession: "New Session",
    createTreatmentPlan:
  "Create Treatment Plan",

newTreatmentPlan:
  "New Treatment Plan",

chooseTreatment:
  "Choose Treatment",

totalSessions:
  "Total Sessions",

startDate:
  "Start Date",

treatmentAreasHint:
  "Separate areas with commas, e.g. Face, Neck, Underarms",

saveTreatmentPlan:
  "Save Treatment Plan",

treatmentPlanCreated:
  "Treatment plan created successfully.",

noActiveTreatmentPlans:
  "No active treatment plans yet.",


    sessionDate: "Session Date",
    selectTreatment: "Select Treatment",

    notes: "Notes",
    notesPlaceholder:
      "Optional session notes...",

    saveSession: "Save Session",
    cancel: "Cancel",

    sessionAdded:
      "Session added successfully.",

    session: "Session",
    noSessionsYet: "No sessions yet.",

    appointmentDate: "Appointment Date",
    appointmentTime: "Appointment Time",

    appointmentDetails:
      "Appointment Details",

    confirmAppointment:
      "Confirm Appointment",

    completeAppointment:
      "Mark as Completed",

    reschedule: "Reschedule",

    cancelAppointment:
      "Cancel Appointment",

    backToAppointments:
      "Back to Appointments",

    rescheduleAppointment:
      "Reschedule Appointment",

    newDate: "New Date",
    newTime: "New Time",

    saveChanges: "Save Changes",

    appointmentUpdated:
      "Appointment updated successfully.",

    cancelConfirm:
      "Are you sure you want to cancel this appointment?",

    invalidSessionDate:
      "Session date must be between January 1, 2000 and today.",

    invalidAppointmentDate:
      "The new appointment date cannot be in the past.",

    activeClients: "Active Clients",

    addTreatment: "Add Treatment",
    editTreatment: "Edit Treatment",

    treatmentNameEnglish:
      "Treatment Name - English",

    treatmentNameArabic:
      "Treatment Name - Arabic",

    defaultSessionsLabel:
      "Default Sessions",

    suggestedIntervalLabel:
      "Suggested Interval",

    days: "days",

    activeStatus: "Active",
    inactiveStatus: "Inactive",

    activate: "Activate",
    deactivate: "Deactivate",

    saveTreatment: "Save Treatment",
    updateTreatment: "Update Treatment",

    treatmentAdded:
      "Treatment added successfully.",

    treatmentUpdated:
      "Treatment updated successfully.",

    treatmentStatusUpdated:
      "Treatment status updated successfully.",

    treatmentSettings:
      "These settings will be used as defaults when creating new treatment plans.",
addSpecialist: "Add Specialist",
editSpecialist: "Edit Specialist",

specialistName: "Specialist Name",

specialtyEnglish:
  "Specialty - English",

specialtyArabic:
  "Specialty - Arabic",

assignedServices:
  "Assigned Services",

workingSchedule:
  "Working Schedule",

workingDays:
  "Working Days",

off: "OFF",

saveSpecialist:
  "Save Specialist",

updateSpecialist:
  "Update Specialist",

specialistAdded:
  "Specialist added successfully.",

specialistUpdated:
  "Specialist updated successfully.",

specialistStatusUpdated:
  "Specialist status updated successfully.",

selectServiceError:
  "Select at least one service.",

servicesCount:
  "Services",
  
    },

  ar: {
    language: "English",

    adminPortal: "إدارة العيادة",

    overview: "نظرة عامة",
    appointments: "المواعيد",
    clients: "العميلات",
    treatments: "العلاجات",
    specialists: "الأخصائيات",
    bookingInbox: "طلبات الحجز",
bookingInboxText:
  "الحجوزات الجديدة والتحديثات القادمة من الموقع.",

    home: "الموقع",
    signOut: "تسجيل الخروج",
    dashboard: "لوحة التحكم",

    welcome: "صباح الخير",
    welcomeText:
      "إليك ملخص ما يحدث في ديرما فلو اليوم.",

    todaysAppointments: "مواعيد اليوم",
    totalClients: "إجمالي العميلات",
    activeTreatments: "خطط العلاج النشطة",
    specialistsCount: "الأخصائيات",

    upcomingToday: "جدول اليوم",
    recentClients: "أحدث العميلات",
    viewAll: "عرض الكل",
    createTreatmentPlan:
  "إنشاء خطة علاج",

newTreatmentPlan:
  "خطة علاج جديدة",

chooseTreatment:
  "اختر العلاج",

totalSessions:
  "إجمالي الجلسات",

startDate:
  "تاريخ بدء الخطة",

treatmentAreasHint:
  "افصل المناطق بفاصلة، مثال: الوجه، الرقبة، تحت الإبط",

saveTreatmentPlan:
  "حفظ خطة العلاج",

treatmentPlanCreated:
  "تم إنشاء خطة العلاج بنجاح.",

noActiveTreatmentPlans:
  "لا توجد خطط علاج نشطة حاليًا.",

    time: "الوقت",
    client: "العميلة",
    treatment: "العلاج",
    specialist: "الأخصائية",
    status: "الحالة",

    confirmed: "مؤكد",
    completed: "مكتمل",
    pending: "بانتظار التأكيد",
    cancelled: "ملغي",

    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    lastVisit: "آخر زيارة",
    plan: "خطة العلاج",

    appointmentManagement:
      "إدارة المواعيد",

    appointmentText:
      "عرض وإدارة جميع مواعيد العيادة.",

    clientManagement:
      "إدارة العميلات",

    clientText:
      "عرض ملفات العميلات وخطط العلاج وسجل الجلسات.",

    treatmentManagement:
      "إدارة العلاجات",

    treatmentText:
      "إدارة الخدمات والعلاجات التي تقدمها العيادة.",

    specialistManagement:
      "إدارة الأخصائيات",

    specialistText:
      "إدارة الأخصائيات وجداول العمل.",

    viewProfile: "عرض الملف",
    manage: "إدارة",

    clientProfile: "ملف العميلة",
    backToClients:
      "العودة للعميلات",

    treatmentPlans: "خطط العلاج",
    sessionHistory: "سجل الجلسات",

    activeTreatment: "علاج نشط",
    completedTreatment: "مكتمل",

    allPlansCompleted:
      "جميع خطط العلاج مكتملة.",

    sessionsCompleted:
      "جلسات مكتملة",

    treatmentAreas:
      "مناطق العلاج",

    lastSession: "آخر جلسة",

    nextSuggested:
      "الزيارة القادمة المقترحة",

    nextAppointment:
      "الموعد القادم",

    noAppointment:
      "لا يوجد موعد قادم",

    emailReminder:
      "تذكير البريد الإلكتروني",

    reminderEnabled: "مفعّل",
    reminderDisabled: "غير مفعّل",

    reminderScheduled:
      "سيتم إرسال التذكير بتاريخ",

    reminderSent:
      "تم إرسال التذكير",

    twoDaysBefore:
      "سيصل للعميلة تذكير عبر البريد الإلكتروني قبل الموعد بيومين.",

    addSession:
      "إضافة جلسة جديدة",

    newSession: "جلسة جديدة",

    sessionDate:
      "تاريخ الجلسة",

    selectTreatment:
      "اختاري العلاج",

    notes: "ملاحظات",

    notesPlaceholder:
      "ملاحظات اختيارية عن الجلسة...",

    saveSession:
      "حفظ الجلسة",

    cancel: "إلغاء",

    sessionAdded:
      "تمت إضافة الجلسة بنجاح.",

    session: "الجلسة",

    noSessionsYet:
      "لا يوجد جلسات حتى الآن.",

    appointmentDate:
      "تاريخ الموعد",

    appointmentTime:
      "وقت الموعد",

    appointmentDetails:
      "تفاصيل الموعد",

    confirmAppointment:
      "تأكيد الموعد",

    completeAppointment:
      "تحديد كمكتمل",

    reschedule:
      "إعادة جدولة",

    cancelAppointment:
      "إلغاء الموعد",

    backToAppointments:
      "العودة للمواعيد",

    rescheduleAppointment:
      "إعادة جدولة الموعد",

    newDate:
      "التاريخ الجديد",

    newTime:
      "الوقت الجديد",

    saveChanges:
      "حفظ التعديلات",

    appointmentUpdated:
      "تم تحديث الموعد بنجاح.",

    cancelConfirm:
      "هل أنت متأكدة من إلغاء هذا الموعد؟",

    invalidSessionDate:
      "يجب أن يكون تاريخ الجلسة بين 1 يناير 2000 وتاريخ اليوم.",

    invalidAppointmentDate:
      "لا يمكن إعادة جدولة الموعد إلى تاريخ سابق.",

    activeClients:
      "العميلات النشطات",

    addTreatment:
      "إضافة علاج",

    editTreatment:
      "تعديل العلاج",

    treatmentNameEnglish:
      "اسم العلاج بالإنجليزية",

    treatmentNameArabic:
      "اسم العلاج بالعربية",

    defaultSessionsLabel:
      "عدد الجلسات الافتراضي",

    suggestedIntervalLabel:
      "الفترة المقترحة",

    days: "يوم",

    activeStatus: "نشط",
    inactiveStatus: "غير نشط",

    activate: "تفعيل",
    deactivate: "تعطيل",

    saveTreatment:
      "حفظ العلاج",

    updateTreatment:
      "تحديث العلاج",

    treatmentAdded:
      "تمت إضافة العلاج بنجاح.",

    treatmentUpdated:
      "تم تحديث العلاج بنجاح.",

    treatmentStatusUpdated:
      "تم تحديث حالة العلاج بنجاح.",

    treatmentSettings:
      "سيتم استخدام هذه الإعدادات كقيم افتراضية عند إنشاء خطط علاج جديدة.",
  addSpecialist: "إضافة أخصائية",
editSpecialist: "تعديل الأخصائية",

specialistName: "اسم الأخصائية",

specialtyEnglish:
  "التخصص بالإنجليزية",

specialtyArabic:
  "التخصص بالعربية",

assignedServices:
  "الخدمات المقدمة",

workingSchedule:
  "جدول العمل",

workingDays:
  "أيام العمل",

off: "إجازة",

saveSpecialist:
  "حفظ الأخصائية",

updateSpecialist:
  "تحديث الأخصائية",

specialistAdded:
  "تمت إضافة الأخصائية بنجاح.",

specialistUpdated:
  "تم تحديث الأخصائية بنجاح.",

specialistStatusUpdated:
  "تم تحديث حالة الأخصائية بنجاح.",

selectServiceError:
  "يجب اختيار خدمة واحدة على الأقل.",

servicesCount:
  "الخدمات",
    },
};


/* =========================================================
   DATE HELPER
========================================================= */

function getLocalDateString(
  date = new Date()
) {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/* =========================================================
   DUMMY APPOINTMENTS
========================================================= */

const initialAppointments = [
  {
    id: 1,
    clientId: 2,

    date: "2026-10-15",
    time: "09:00 AM",

    client: "Lana Ahmad",

    treatment: "Hydrafacial",
    treatmentAr: "هيدرافيشل",

    specialist: "Dr. Maya Ali",

    status: "confirmed",
  },

  {
    id: 2,
    clientId: 3,

    date: "2026-10-17",
    time: "10:30 AM",

    client: "Maya Omar",

    treatment: "Acne Treatment",
    treatmentAr:
      "علاج حب الشباب",

    specialist:
      "Dr. Lina Ahmad",

    status: "completed",
  },

  {
    id: 3,
    clientId: 4,

    date: "2026-10-20",
    time: "12:00 PM",

    client: "Rama Ali",

    treatment:
      "Skin Rejuvenation",

    treatmentAr:
      "تجديد البشرة",

    specialist:
      "Dr. Maya Ali",

    status: "confirmed",
  },

  {
    id: 4,
    clientId: 1,

    date: "2026-10-28",
    time: "04:00 PM",

    client: "Sura Khaled",

    treatment:
      "Laser Hair Removal",

    treatmentAr:
      "إزالة الشعر بالليزر",

    specialist:
      "Dr. Sara Khalil",

    status: "pending",
  },

  {
    id: 5,
    clientId: 5,

    date: "2026-10-30",
    time: "04:00 PM",

    client: "Dana Sami",

    treatment:
      "Skin Rejuvenation",

    treatmentAr:
      "تجديد البشرة",

    specialist:
      "Dr. Maya Ali",

    status: "confirmed",
  },
];


/* =========================================================
   DUMMY CLIENTS
========================================================= */
export const initialClients = [
  {
    id: 1,

    name: "Sura Khaled",

    email: "sura@email.com",

    phone: "0791234567",

    lastVisit:
      "2026-10-07",

    nextAppointment: {
      date: "2026-10-28",

      time: "04:00 PM",

      treatment:
        "Laser Hair Removal",

      treatmentAr:
        "إزالة الشعر بالليزر",

      specialist:
        "Dr. Sara Khalil",

      reminderEnabled: true,

      reminderSent: false,
    },

    treatmentPlans: [
      {
        id: 1,

        treatment:
          "Laser Hair Removal",

        treatmentAr:
          "إزالة الشعر بالليزر",

        completedSessions: 3,

        totalSessions: 6,

        lastSession:
          "2026-10-07",

        nextSuggested:
          "2026-10-28",

        specialist:
          "Dr. Sara Khalil",

        areas: [
          {
            en: "Full Legs",
            ar: "الساقان بالكامل",
          },

          {
            en: "Arms",
            ar: "الذراعان",
          },

          {
            en: "Underarms",
            ar: "تحت الإبط",
          },
        ],
      },

      {
        id: 2,

        treatment: "Hydrafacial",

        treatmentAr:
          "هيدرافيشل",

        completedSessions: 2,

        totalSessions: 4,

        lastSession:
          "2026-09-30",

        nextSuggested:
          "2026-10-30",

        specialist:
          "Dr. Maya Ali",

        areas: [
          {
            en: "Face",
            ar: "الوجه",
          },
        ],
      },
    ],

    sessionHistory: [
      {
        id: 1,

        date: "2026-10-07",

        treatment:
          "Laser Hair Removal",

        treatmentAr:
          "إزالة الشعر بالليزر",

        sessionNumber: 3,

        totalSessions: 6,

        specialist:
          "Dr. Sara Khalil",

        areas: [
          {
            en: "Full Legs",
            ar: "الساقان بالكامل",
          },

          {
            en: "Arms",
            ar: "الذراعان",
          },

          {
            en: "Underarms",
            ar: "تحت الإبط",
          },
        ],

        notes: "",
      },

      {
        id: 2,

        date: "2026-09-16",

        treatment:
          "Laser Hair Removal",

        treatmentAr:
          "إزالة الشعر بالليزر",

        sessionNumber: 2,

        totalSessions: 6,

        specialist:
          "Dr. Sara Khalil",

        areas: [
          {
            en: "Full Legs",
            ar: "الساقان بالكامل",
          },

          {
            en: "Arms",
            ar: "الذراعان",
          },

          {
            en: "Underarms",
            ar: "تحت الإبط",
          },
        ],

        notes: "",
      },

      {
        id: 3,

        date: "2026-08-26",

        treatment:
          "Laser Hair Removal",

        treatmentAr:
          "إزالة الشعر بالليزر",

        sessionNumber: 1,

        totalSessions: 6,

        specialist:
          "Dr. Sara Khalil",

        areas: [
          {
            en: "Full Legs",
            ar: "الساقان بالكامل",
          },

          {
            en: "Arms",
            ar: "الذراعان",
          },

          {
            en: "Underarms",
            ar: "تحت الإبط",
          },
        ],

        notes: "",
      },

      {
        id: 4,

        date: "2026-09-30",

        treatment:
          "Hydrafacial",

        treatmentAr:
          "هيدرافيشل",

        sessionNumber: 2,

        totalSessions: 4,

        specialist:
          "Dr. Maya Ali",

        areas: [
          {
            en: "Face",
            ar: "الوجه",
          },
        ],

        notes: "",
      },
    ],
  },

  {
    id: 2,

    name: "Lana Ahmad",

    email: "lana@email.com",

    phone: "0787654321",

    lastVisit:
      "2026-10-05",

    nextAppointment: {
      date: "2026-10-15",

      time: "09:00 AM",

      treatment:
        "Hydrafacial",

      treatmentAr:
        "هيدرافيشل",

      specialist:
        "Dr. Maya Ali",

      reminderEnabled: true,

      reminderSent: false,
    },

    treatmentPlans: [
      {
        id: 1,

        treatment:
          "Hydrafacial",

        treatmentAr:
          "هيدرافيشل",

        completedSessions: 2,

        totalSessions: 4,

        lastSession:
          "2026-10-05",

        nextSuggested:
          "2026-11-05",

        specialist:
          "Dr. Maya Ali",

        areas: [
          {
            en: "Face",
            ar: "الوجه",
          },
        ],
      },
    ],

    sessionHistory: [],
  },

  {
    id: 3,

    name: "Maya Omar",

    email: "maya@email.com",

    phone: "0775554433",

    lastVisit:
      "2026-10-01",

    nextAppointment: null,

    treatmentPlans: [
      {
        id: 1,

        treatment:
          "Acne Treatment",

        treatmentAr:
          "علاج حب الشباب",

        completedSessions: 4,

        totalSessions: 6,

        lastSession:
          "2026-10-01",

        nextSuggested:
          "2026-10-22",

        specialist:
          "Dr. Lina Ahmad",

        areas: [
          {
            en: "Face",
            ar: "الوجه",
          },
        ],
      },
    ],

    sessionHistory: [],
  },

  {
    id: 4,

    name: "Rama Ali",

    email: "rama@email.com",

    phone: "0799876543",

    lastVisit:
      "2026-09-27",

    nextAppointment: {
      date: "2026-10-20",

      time: "12:00 PM",

      treatment:
        "Skin Rejuvenation",

      treatmentAr:
        "تجديد البشرة",

      specialist:
        "Dr. Maya Ali",

      reminderEnabled: true,

      reminderSent: false,
    },

    treatmentPlans: [
      {
        id: 1,

        treatment:
          "Skin Rejuvenation",

        treatmentAr:
          "تجديد البشرة",

        completedSessions: 1,

        totalSessions: 4,

        lastSession:
          "2026-09-27",

        nextSuggested:
          "2026-10-27",

        specialist:
          "Dr. Maya Ali",

        areas: [
          {
            en: "Face",
            ar: "الوجه",
          },
        ],
      },
    ],

    sessionHistory: [],
  },

  {
    id: 5,

    name: "Dana Sami",

    email: "dana@email.com",

    phone: "0794445566",

    lastVisit:
      "2026-10-02",

    nextAppointment: {
      date: "2026-10-30",

      time: "04:00 PM",

      treatment:
        "Skin Rejuvenation",

      treatmentAr:
        "تجديد البشرة",

      specialist:
        "Dr. Maya Ali",

      reminderEnabled: true,

      reminderSent: false,
    },

    treatmentPlans: [
      {
        id: 1,

        treatment:
          "Skin Rejuvenation",

        treatmentAr:
          "تجديد البشرة",

        completedSessions: 2,

        totalSessions: 4,

        lastSession:
          "2026-10-02",

        nextSuggested:
          "2026-10-30",

        specialist:
          "Dr. Maya Ali",

        areas: [
          {
            en: "Face",
            ar: "الوجه",
          },
        ],
      },
    ],

    sessionHistory: [],
  },
];


/* =========================================================
   DUMMY TREATMENTS
========================================================= */

const initialTreatments = [
  {
    id: 1,

    name:
      "Laser Hair Removal",

    nameAr:
      "إزالة الشعر بالليزر",

    defaultSessions: 6,

    intervalDays: 28,

    activeClients: 24,

    isActive: true,
  },

  {
    id: 2,

    name: "Hydrafacial",

    nameAr:
      "هيدرافيشل",

    defaultSessions: 4,

    intervalDays: 30,

    activeClients: 17,

    isActive: true,
  },

  {
    id: 3,

    name:
      "Skin Rejuvenation",

    nameAr:
      "تجديد البشرة",

    defaultSessions: 4,

    intervalDays: 30,

    activeClients: 12,

    isActive: true,
  },

  {
    id: 4,

    name:
      "Acne Treatment",

    nameAr:
      "علاج حب الشباب",

    defaultSessions: 6,

    intervalDays: 21,

    activeClients: 9,

    isActive: true,
  },
];


/* =========================================================
   DUMMY SPECIALISTS
========================================================= */

const specialists = [
  {
    id: 1,

    name:
      "Dr. Lina Ahmad",

    specialty:
      "Dermatology & Skin Care",

    specialtyAr:
      "الجلدية والعناية بالبشرة",

    appointmentsToday: 4,
  },

  {
    id: 2,

    name:
      "Dr. Sara Khalil",

    specialty:
      "Laser Specialist",

    specialtyAr:
      "أخصائية ليزر",

    appointmentsToday: 5,
  },

  {
    id: 3,

    name:
      "Dr. Maya Ali",

    specialty:
      "Facial & Skin Treatments",

    specialtyAr:
      "علاجات الوجه والبشرة",

    appointmentsToday: 3,
  },
];


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard({
  language = "en",
  toggleLanguage,
    specialists = [],
  setSpecialists,
  appointments = [],
  setAppointments,
    clients = [],
  setClients,
}) {
  const isArabic =
    language === "ar";

  const t =
    translations[language] ||
    translations.en;

/* =========================================================
   BOOKING INBOX
========================================================= */

const bookingInboxAppointments =
  appointments
    .filter(
      (appointment) =>
        appointment.source ===
        "website"
    )
    .sort(
      (a, b) =>
        Number(b.id) -
        Number(a.id)
    );


const newBookingCount =
  bookingInboxAppointments.filter(
    (appointment) =>
      appointment.status ===
      "pending"
  ).length;
;


 


  /* Treatments */

  const [
    treatments,
    setTreatments,
  ] = useState(
    initialTreatments
  );


  /* Current section */

  const [
    activeSection,
    setActiveSection,
  ] = useState(
    "dashboard"
  );


  /* Selected client */

  const [
    selectedClientId,
    setSelectedClientId,
  ] = useState(null);


  /* Selected appointment */

  const [
    selectedAppointmentId,
    setSelectedAppointmentId,
  ] = useState(null);


  /* Add Session */

  const [
    showAddSession,
    setShowAddSession,
  ] = useState(false);


  const [
    sessionMessage,
    setSessionMessage,
  ] = useState("");

  /* Treatment Plan Form */

const [
  showTreatmentPlanForm,
  setShowTreatmentPlanForm,
] = useState(false);


const [
  treatmentPlanMessage,
  setTreatmentPlanMessage,
] = useState("");

  /* Appointment message */

  const [
    appointmentMessage,
    setAppointmentMessage,
  ] = useState("");


  /* Treatment form */

  const [
    showTreatmentForm,
    setShowTreatmentForm,
  ] = useState(false);


  const [
    editingTreatmentId,
    setEditingTreatmentId,
  ] = useState(null);


  const [
    treatmentMessage,
    setTreatmentMessage,
  ] = useState("");
/* =========================================================
   SPECIALIST MANAGEMENT STATE
========================================================= */

const [
  showSpecialistForm,
  setShowSpecialistForm,
] = useState(false);


const [
  editingSpecialistId,
  setEditingSpecialistId,
] = useState(null);


const [
  specialistMessage,
  setSpecialistMessage,
] = useState("");

  /* =========================================================
     SELECTED RECORDS
  ========================================================= */

  const selectedClient =
    clients.find(
      (client) =>
        client.id ===
        selectedClientId
    ) || null;


  const selectedAppointment =
    appointments.find(
      (appointment) =>
        appointment.id ===
        selectedAppointmentId
    ) || null;


  const editingTreatment =
    treatments.find(
      (treatment) =>
        treatment.id ===
        editingTreatmentId
    ) || null;
const editingSpecialist =
  specialists.find(
    (specialist) =>
      specialist.id ===
      editingSpecialistId
  ) || null;

  /* =========================================================
     HELPERS
  ========================================================= */
const formatDate = (
  dateValue
) => {
  if (!dateValue) {
    return "-";
  }

  let normalizedDate = "";

  if (
    dateValue instanceof Date
  ) {
    normalizedDate =
      dateValue
        .toISOString()
        .split("T")[0];
  } else {
    normalizedDate =
      String(dateValue)
        .split("T")[0];
  }

  const date = new Date(
    `${normalizedDate}T00:00:00`
  );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    isArabic
      ? "ar-JO"
      : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(date);
};
  const getReminderDate = (
    appointmentDate
  ) => {
    if (!appointmentDate) {
      return null;
    }

    const date = new Date(
      `${appointmentDate}T00:00:00`
    );

    date.setDate(
      date.getDate() - 2
    );

    return getLocalDateString(
      date
    );
  };


  const getTreatmentName = (
    item
  ) => {
    if (!item) {
      return "";
    }

    return isArabic
      ? item.treatmentAr ||
          item.nameAr ||
          item.planAr
      : item.treatment ||
          item.name ||
          item.plan;
  };


  const getAreas = (
    areas = []
  ) => {
    return areas.map(
      (area) =>
        isArabic
          ? area.ar
          : area.en
    );
  };


  const getStatusText = (
    status
  ) => {
    if (
      status === "completed"
    ) {
      return t.completed;
    }

    if (
      status === "pending"
    ) {
      return t.pending;
    }

    if (
      status === "cancelled"
    ) {
      return t.cancelled;
    }

    return t.confirmed;
  };


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const changeSection = (
    section
  ) => {
    setActiveSection(section);

    setSelectedClientId(null);

    setSelectedAppointmentId(
      null
    );

    setShowAddSession(false);

    setSessionMessage("");

    setAppointmentMessage("");

    setShowTreatmentForm(false);

    setEditingTreatmentId(null);

    setTreatmentMessage("");

    setShowSpecialistForm(false);

setEditingSpecialistId(null);

setSpecialistMessage("");
  };
const openClientProfile =
  async (clientId) => {

    setActiveSection(
      "clients"
    );

    setSelectedClientId(
      clientId
    );

    setSelectedAppointmentId(
      null
    );

    setShowAddSession(
      false
    );

    setSessionMessage(
      ""
    );

    setAppointmentMessage(
      ""
    );


    const currentClient =
      clients.find(
        (client) =>
          String(client.id) ===
          String(clientId)
      );


    if (!currentClient) {
      return;
    }


    try {

      /* =====================================================
         STEP 1
         Get the real PostgreSQL client record.
      ===================================================== */

      const clientResponse =
        await fetch(
          `${API_BASE_URL}/clients`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                currentClient.name,

              email:
                currentClient.email ||
                null,

              phone:
                currentClient.phone,
            }),
          }
        );


      const clientData =
        await clientResponse.json();


      if (!clientResponse.ok) {
        throw new Error(
          clientData.message ||
          "Failed to load client."
        );
      }


      const databaseClient =
        clientData.client;


      /* =====================================================
         STEP 2
         Load treatment plans from PostgreSQL.
      ===================================================== */

      const plansResponse =
        await fetch(
          `${API_BASE_URL}/treatment-plans/client/${databaseClient.id}`
        );


      const plansData =
        await plansResponse.json();


      if (!plansResponse.ok) {
        throw new Error(
          plansData.message ||
          "Failed to load treatment plans."
        );
      }


      /* =====================================================
         STEP 3
         Put PostgreSQL data into the Admin screen.
      ===================================================== */

      setClients(
        (previousClients) =>
          previousClients.map(
            (client) => {

              if (
                String(client.id) !==
                String(clientId)
              ) {
                return client;
              }


              return {
                ...client,

                dbId:
                  databaseClient.id,

                treatmentPlans:
                  plansData.treatmentPlans ||
                  [],

                period_tracking_enabled:
                  databaseClient.period_tracking_enabled,

                periodTrackingEnabled:
                  databaseClient.period_tracking_enabled,

                last_period_start:
                  databaseClient.last_period_start,

                lastPeriodStart:
                  databaseClient.last_period_start,

                cycle_length_days:
                  databaseClient.cycle_length_days,

                cycleLengthDays:
                  databaseClient.cycle_length_days,

                period_length_days:
                  databaseClient.period_length_days,

                periodLengthDays:
                  databaseClient.period_length_days,
              };
            }
          )
      );

    } catch (error) {

      console.error(
        "Load client profile error:",
        error
      );

      alert(
        error.message
      );
    }
  };
const openAppointment = (
  appointmentId
) => {
  setActiveSection(
    "appointments"
  );

  setSelectedClientId(null);

  setSelectedAppointmentId(
    appointmentId
  );

  setShowAddSession(false);

  setSessionMessage("");

  setAppointmentMessage("");
};

  const getPageTitle = () => {
    if (selectedAppointment) {
      return t.appointmentDetails;
    }

    if (selectedClient) {
      return t.clientProfile;
    }
if (
  activeSection ===
  "bookingInbox"
) {
  return t.bookingInbox;
}
    if (
      activeSection ===
      "appointments"
    ) {
      return t.appointments;
    }

    if (
      activeSection ===
      "clients"
    ) {
      return t.clients;
    }

    if (
      activeSection ===
      "treatments"
    ) {
      return t.treatments;
    }

    if (
      activeSection ===
      "specialists"
    ) {
      return t.specialists;
    }

    if (
      activeSection ===
      "dashboard"
    ) {
      return isArabic
        ? "اليوم"
        : "Today";
    }

    return t.dashboard;
  };


  /* =========================================================
     TREATMENT MANAGEMENT
  ========================================================= */

  const openAddTreatment = () => {
    setEditingTreatmentId(null);

    setShowTreatmentForm(true);

    setTreatmentMessage("");
  };


  const openEditTreatment = (
    treatmentId
  ) => {
    setEditingTreatmentId(
      treatmentId
    );

    setShowTreatmentForm(true);

    setTreatmentMessage("");
  };


  const handleSaveTreatment = (
    treatmentData
  ) => {
    if (editingTreatmentId) {
      setTreatments(
        (previousTreatments) =>
          previousTreatments.map(
            (treatment) =>
              treatment.id ===
              editingTreatmentId
                ? {
                    ...treatment,
                    ...treatmentData,
                  }
                : treatment
          )
      );

      setTreatmentMessage(
        t.treatmentUpdated
      );
    } else {
      const newId =
        treatments.length > 0
          ? Math.max(
              ...treatments.map(
                (treatment) =>
                  treatment.id
              )
            ) + 1
          : 1;


      const newTreatment = {
        id: newId,

        ...treatmentData,

        activeClients: 0,

        isActive: true,
      };


      setTreatments(
        (previousTreatments) => [
          ...previousTreatments,
          newTreatment,
        ]
      );


      setTreatmentMessage(
        t.treatmentAdded
      );
    }


    setShowTreatmentForm(false);

    setEditingTreatmentId(null);
  };


  const toggleTreatmentStatus = (
    treatmentId
  ) => {
    setTreatments(
      (previousTreatments) =>
        previousTreatments.map(
          (treatment) =>
            treatment.id ===
            treatmentId
              ? {
                  ...treatment,

                  isActive:
                    !treatment.isActive,
                }
              : treatment
        )
    );


    setTreatmentMessage(
      t.treatmentStatusUpdated
    );
  };
/* =========================================================
   SPECIALIST MANAGEMENT
========================================================= */

/* Opens a blank form for a new specialist. */

const openAddSpecialist = () => {
  setEditingSpecialistId(null);

  setShowSpecialistForm(true);

  setSpecialistMessage("");
};


/* Opens an existing specialist for editing. */

const openEditSpecialist = (
  specialistId
) => {
  setEditingSpecialistId(
    specialistId
  );

  setShowSpecialistForm(true);

  setSpecialistMessage("");
};


/* Saves a new specialist or updates an existing one. */

const handleSaveSpecialist = (
  specialistData
) => {
  if (editingSpecialistId) {
    setSpecialists(
      (previousSpecialists) =>
        previousSpecialists.map(
          (specialist) =>
            specialist.id ===
            editingSpecialistId
              ? {
                  ...specialist,
                  ...specialistData,
                }
              : specialist
        )
    );

    setSpecialistMessage(
      t.specialistUpdated
    );
  } else {
    const newId =
      specialists.length > 0
        ? Math.max(
            ...specialists.map(
              (specialist) =>
                specialist.id
            )
          ) + 1
        : 1;


    const newSpecialist = {
      id: newId,

      ...specialistData,

      isActive: true,
    };


    setSpecialists(
      (previousSpecialists) => [
        ...previousSpecialists,
        newSpecialist,
      ]
    );


    setSpecialistMessage(
      t.specialistAdded
    );
  }


  setShowSpecialistForm(false);

  setEditingSpecialistId(null);
};


/* Activates or deactivates a specialist. */

const toggleSpecialistStatus = (
  specialistId
) => {
  setSpecialists(
    (previousSpecialists) =>
      previousSpecialists.map(
        (specialist) =>
          specialist.id ===
          specialistId
            ? {
                ...specialist,

                isActive:
                  !specialist.isActive,
              }
            : specialist
      )
  );


  setSpecialistMessage(
    t.specialistStatusUpdated
  );
};


/* =========================================================
   CREATE TREATMENT PLAN
========================================================= */const handleCreateTreatmentPlan =
  async (formData) => {

    if (!selectedClient) {
      return;
    }

    const selectedTreatment =
      treatments.find(
        (treatment) =>
          String(treatment.id) ===
          String(formData.treatmentId)
      );

    const selectedSpecialist =
      specialists.find(
        (specialist) =>
          specialist.name ===
          formData.specialist
      );

    if (
      !selectedTreatment ||
      !selectedSpecialist
    ) {
      alert(
        "Please select a valid treatment and specialist."
      );
      return;
    }

    const treatmentAreas =
      formData.areas
        .split(",")
        .map((area) =>
          area.trim()
        )
        .filter(Boolean)
        .map((area) => ({
          en: area,
          ar: area,
        }));

    try {

      // Get the real client record from PostgreSQL
      const clientResponse =
        await fetch(
          `${API_BASE_URL}/clients`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                selectedClient.name,

              email:
                selectedClient.email ||
                null,

              phone:
                selectedClient.phone,
            }),
          }
        );

      const clientData =
        await clientResponse.json();

      if (!clientResponse.ok) {
        throw new Error(
          clientData.message ||
          "Failed to find client."
        );
      }

      const databaseClient =
        clientData.client;


      // Save treatment plan in PostgreSQL
      const response =
        await fetch(
          `${API_BASE_URL}/treatment-plans`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              clientId:
                databaseClient.id,

              treatmentId:
                Number(
                  formData.treatmentId
                ),

              specialistId:
                Number(
                  selectedSpecialist.id
                ),

              totalSessions:
                Number(
                  formData.totalSessions
                ),

              startDate:
                formData.startDate,

              intervalDays:
                Number(
                  formData.intervalDays
                ),

              areas:
                treatmentAreas,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to create treatment plan."
        );
      }

      const newPlan =
        data.treatmentPlan;


      setClients(
        (previousClients) =>
          previousClients.map(
            (client) => {

              if (
                String(client.id) !==
                String(
                  selectedClient.id
                )
              ) {
                return client;
              }

              return {
                ...client,

                dbId:
                  databaseClient.id,

                treatmentPlans: [
                  ...(
                    client.treatmentPlans ||
                    []
                  ),
                  newPlan,
                ],
              };
            }
          )
      );

      setShowTreatmentPlanForm(
        false
      );

      setTreatmentPlanMessage(
        t.treatmentPlanCreated
      );

    } catch (error) {

      console.error(
        "Create treatment plan error:",
        error
      );

      alert(error.message);
    }
  };/* =========================================================
   ADD SESSION
   Saves the session in PostgreSQL and updates the UI.
========================================================= */

const handleAddSession = async (
  formData
) => {
  if (!selectedClient) {
    return;
  }


  const selectedPlan =
    selectedClient.treatmentPlans.find(
      (plan) =>
        Number(plan.id) ===
        Number(formData.planId)
    );


  if (!selectedPlan) {
    alert(
      "Treatment plan not found."
    );

    return;
  }


  try {

    const response =
      await fetch(
        `${API_BASE_URL}/sessions`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            treatmentPlanId:
              Number(
                formData.planId
              ),

            sessionDate:
              formData.date,

            specialistId:
              selectedPlan.specialistId,

            notes:
              formData.notes,
          }),
        }
      );


    const data =
      await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to save session."
      );
    }


    const savedSession = {
      ...data.session,

      specialist:
        selectedPlan.specialist,

      areas:
        selectedPlan.areas,
    };


    setClients(
      (previousClients) =>
        previousClients.map(
          (client) => {

            if (
              String(client.id) !==
              String(
                selectedClient.id
              )
            ) {
              return client;
            }


            const updatedPlans =
              (
                client.treatmentPlans ||
                []
              ).map(
                (plan) => {

                  if (
                    Number(plan.id) !==
                    Number(
                      formData.planId
                    )
                  ) {
                    return plan;
                  }


                  return {
                    ...plan,

                    completedSessions:
                      data.treatmentPlan
                        .completedSessions,

                    lastSession:
                      data.treatmentPlan
                        .lastSession,

                    nextSuggested:
                      data.treatmentPlan
                        .nextSuggested,
                  };
                }
              );


            return {
              ...client,

              lastVisit:
                formData.date,

              treatmentPlans:
                updatedPlans,

              sessionHistory: [
                savedSession,

                ...(
                  client.sessionHistory ||
                  []
                ),
              ],
            };
          }
        )
    );


    setShowAddSession(
      false
    );


    setSessionMessage(
      t.sessionAdded
    );


  } catch (error) {

    console.error(
      "Add session error:",
      error
    );


    alert(
      error.message
    );
  }
};
  /* =========================================================
     APPOINTMENT / CLIENT SYNC
  ========================================================= */

  const syncClientAppointment = (
    appointment
  ) => {
    setClients(
      (previousClients) =>
        previousClients.map(
          (client) => {
            if (
              client.id !==
              appointment.clientId
            ) {
              return client;
            }


            if (
              appointment.status ===
                "cancelled" ||
              appointment.status ===
                "completed"
            ) {
              return {
                ...client,

                nextAppointment:
                  null,
              };
            }


            return {
              ...client,

              nextAppointment: {
                date:
                  appointment.date,

                time:
                  appointment.time,

                treatment:
                  appointment.treatment,

                treatmentAr:
                  appointment.treatmentAr,

                specialist:
                  appointment.specialist,

                reminderEnabled:
                  true,

                reminderSent:
                  false,
              },
            };
          }
        )
    );
  };
/* =========================================================
   PERIOD SCHEDULING PREFERENCES
========================================================= */
/* =========================================================
   PERIOD SCHEDULING PREFERENCES
========================================================= */

const handleSavePeriodPreferences = async (
  preferences
) => {
  if (!selectedClientId) {
    return null;
  }

  const response = await fetch(
    `${API_BASE_URL}/clients/${selectedClientId}/period-preferences`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update scheduling preferences."
    );
  }

  const savedClient =
    data.client;

  setClients(
    (previousClients) =>
      previousClients.map(
        (client) =>
          String(client.id) ===
          String(selectedClientId)
            ? {
                ...client,

                period_tracking_enabled:
                  savedClient.period_tracking_enabled,

                periodTrackingEnabled:
                  savedClient.period_tracking_enabled,

                last_period_start:
                  savedClient.last_period_start,

                lastPeriodStart:
                  savedClient.last_period_start,

                cycle_length_days:
                  savedClient.cycle_length_days,

                cycleLengthDays:
                  savedClient.cycle_length_days,

                period_length_days:
                  savedClient.period_length_days,

                periodLengthDays:
                  savedClient.period_length_days,
              }
            : client
      )
  );

  return savedClient;
};

const updateAppointmentStatus =
  async (newStatus) => {

    if (!selectedAppointment) {
      return;
    }


    if (
      selectedAppointment.status ===
        "completed" ||
      selectedAppointment.status ===
        "cancelled"
    ) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_BASE_URL}/appointments/${selectedAppointment.id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status:
                newStatus,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to update appointment."
        );
      }


      const updatedAppointment =
        data.appointment;


      setAppointments(
        (
          previousAppointments
        ) =>
          previousAppointments.map(
            (appointment) =>
              appointment.id ===
              updatedAppointment.id
                ? updatedAppointment
                : appointment
          )
      );


      syncClientAppointment(
        updatedAppointment
      );


      setAppointmentMessage(
        t.appointmentUpdated
      );

    } catch (error) {

      console.error(
        "Appointment status update error:",
        error
      );

      alert(
        error.message
      );
    }
  };

const handleRescheduleAppointment =
  async (newDate, newTime) => {
    if (!selectedAppointment) {
      return;
    }

    if (
      selectedAppointment.status === "completed" ||
      selectedAppointment.status === "cancelled"
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/appointments/${selectedAppointment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: newDate,
            time: newTime,
            status: "confirmed",
          }),
        }
      );

      const data =
        await response.json();

      if (response.status === 409) {
        alert(
          "This appointment slot is already booked."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to reschedule appointment."
        );
      }

      const updatedAppointment =
        data.appointment;

      setAppointments(
        (previousAppointments) =>
          previousAppointments.map(
            (appointment) =>
              appointment.id ===
              updatedAppointment.id
                ? updatedAppointment
                : appointment
          )
      );

      syncClientAppointment(
        updatedAppointment
      );

      setAppointmentMessage(
        t.appointmentUpdated
      );

    } catch (error) {
      console.error(
        "Reschedule appointment error:",
        error
      );

      alert(error.message);
    }
  };


  return (
    <div
      className="admin-dashboard"
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
      lang={language}
    >
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="admin-sidebar">

        <Link
          to="/"
          className="admin-logo"
        >
          DERMA<span>FLOW</span>
        </Link>


        <p className="admin-sidebar-label">
          {t.adminPortal}
        </p>


        <nav className="admin-menu">

          <button
            type="button"
            className={
              activeSection ===
                "dashboard" &&
              !selectedClient &&
              !selectedAppointment
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection(
                "dashboard"
              )
            }
          >
            <span>▣</span>
            {isArabic
              ? "اليوم"
              : "Today"}
          </button>


          <button
            type="button"
            className={
              activeSection ===
              "bookingInbox"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection(
                "bookingInbox"
              )
            }
          >
            <span>✉</span>

            {t.bookingInbox}

            {newBookingCount > 0 && (
              <strong className="admin-menu-badge">
                {newBookingCount}
              </strong>
            )}
          </button>


          <button
            type="button"
            className={
              activeSection ===
              "appointments"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection(
                "appointments"
              )
            }
          >
            <span>▤</span>
            {t.appointments}
          </button>


          <button
            type="button"
            className={
              activeSection ===
              "clients"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection(
                "clients"
              )
            }
          >
            <span>◎</span>
            {t.clients}
          </button>


          <div className="admin-menu-divider">
            {isArabic
              ? "الإدارة"
              : "MANAGEMENT"}
          </div>


          <button
            type="button"
            className={
              activeSection ===
              "treatments"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection(
                "treatments"
              )
            }
          >
            <span>✦</span>
            {t.treatments}
          </button>


          <button
            type="button"
            className={
              activeSection ===
              "specialists"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection(
                "specialists"
              )
            }
          >
            <span>♙</span>
            {t.specialists}
          </button>

        </nav>


        <div className="admin-sidebar-bottom">

          <Link to="/">
            {t.home}
          </Link>


          <Link to="/staff-login">
            {t.signOut}
          </Link>

        </div>

      </aside>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="admin-content">

        <header
          className={`admin-topbar ${
            activeSection === "dashboard" &&
            !selectedClient &&
            !selectedAppointment
              ? "today-mode"
              : ""
          }`}
        >

          {!(
            activeSection === "dashboard" &&
            !selectedClient &&
            !selectedAppointment
          ) && (
            <div>

              <p className="admin-page-label">
                {t.adminPortal}
              </p>

              <h1>
                {getPageTitle()}
              </h1>

            </div>
          )}


          <div className="admin-top-actions">

            <button
              type="button"
              className="language-btn"
              onClick={
                toggleLanguage
              }
            >
              {t.language}
            </button>


            <div className="admin-user">

              <div className="admin-avatar">
                A
              </div>

              <div>

                <strong>
                  Clinic Admin
                </strong>

                <small>
                  Administrator
                </small>

              </div>

            </div>

          </div>

        </header>


        {/* APPOINTMENT DETAILS */}

        {selectedAppointment &&
          !selectedClient && (
            <AppointmentDetails
              appointment={
                selectedAppointment
              }
              t={t}
              formatDate={
                formatDate
              }
              getTreatmentName={
                getTreatmentName
              }
              getStatusText={
                getStatusText
              }
              message={
                appointmentMessage
              }
              onBack={() => {
                setSelectedAppointmentId(
                  null
                );

                setAppointmentMessage(
                  ""
                );
              }}
              onConfirm={() =>
                updateAppointmentStatus(
                  "confirmed"
                )
              }
              onComplete={() =>
                updateAppointmentStatus(
                  "completed"
                )
              }
              onCancel={() => {
                const confirmed =
                  window.confirm(
                    t.cancelConfirm
                  );

                if (confirmed) {
                  updateAppointmentStatus(
                    "cancelled"
                  );
                }
              }}
              onReschedule={
                handleRescheduleAppointment
              }
            />
          )}


        {/* CLIENT PROFILE */}

        {selectedClient &&
          !selectedAppointment && (
            <ClientProfile

            treatments={
  treatments
}

specialists={
  specialists
}

showTreatmentPlanForm={
  showTreatmentPlanForm
}

treatmentPlanMessage={
  treatmentPlanMessage
}

onSavePeriodPreferences={
  handleSavePeriodPreferences
}

onCreateTreatmentPlan={() => {
  setShowTreatmentPlanForm(
    true
  );

  setShowAddSession(
    false
  );

  setTreatmentPlanMessage(
    ""
  );

  setSessionMessage(
    ""
  );
}}

onCancelTreatmentPlan={() =>
  setShowTreatmentPlanForm(
    false
  )
}

onSaveTreatmentPlan={
  handleCreateTreatmentPlan
}

              client={
                selectedClient
              }
              isArabic={
                isArabic
              }
              t={t}
              formatDate={
                formatDate
              }
              getTreatmentName={
                getTreatmentName
              }
              getAreas={
                getAreas
              }
              getReminderDate={
                getReminderDate
              }
              onBack={() => {
                setSelectedClientId(
                  null
                );

                setShowAddSession(
                  false
                );

                setSessionMessage(
                  ""
                );
              }}
              onAddSession={() => {
                setShowAddSession(
                  true
                );
 setShowTreatmentPlanForm(
    false
  );

  setSessionMessage(
    ""
  );
                setSessionMessage(
                  ""
                );
              }}
              showAddSession={
                showAddSession
              }
              onCancelSession={() =>
                setShowAddSession(
                  false
                )
              }
              onSaveSession={
                handleAddSession
              }
              sessionMessage={
                sessionMessage
              }
            />
          )}


        {/* TODAY SCHEDULE */}

        {!selectedClient &&
          !selectedAppointment &&
          activeSection ===
            "dashboard" && (
            <TodaySchedule
              appointments={
                appointments
              }
              specialists={
                specialists
              }
              isArabic={
                isArabic
              }
              getStatusText={
                getStatusText
              }
              onOpenAppointment={
                openAppointment
              }
              onOpenClient={
                openClientProfile
              }
              onOpenInbox={() =>
                changeSection(
                  "bookingInbox"
                )
              }
            />
          )}


{/* =====================================================
    BOOKING INBOX
===================================================== */}

{!selectedClient &&
  !selectedAppointment &&
  activeSection ===
    "bookingInbox" && (
    <main>

      <section className="admin-page-intro">

        <h2>
          {t.bookingInbox}
        </h2>

        <p>
          {t.bookingInboxText}
        </p>

      </section>


      <section className="admin-panel">

        {bookingInboxAppointments.length >
        0 ? (

          <AppointmentTable
            appointments={
              bookingInboxAppointments
            }
            isArabic={
              isArabic
            }
            t={t}
            getStatusText={
              getStatusText
            }
            formatDate={
              formatDate
            }
            onOpenAppointment={
              openAppointment
            }
          />

        ) : (

          <div className="admin-empty-state">
            {isArabic
              ? "لا توجد طلبات حجز من الموقع حتى الآن."
              : "No website bookings yet."}
          </div>

        )}

      </section>

    </main>
  )}
        {/* APPOINTMENTS */}

        {!selectedClient &&
          !selectedAppointment &&
          activeSection ===
            "appointments" && (
            <main>

              <section className="admin-page-intro">

                <h2>
                  {
                    t.appointmentManagement
                  }
                </h2>

                <p>
                  {
                    t.appointmentText
                  }
                </p>

              </section>


              <section className="admin-panel">

                <AppointmentTable
                  appointments={
                    appointments
                  }
                  isArabic={
                    isArabic
                  }
                  t={t}
                  getStatusText={
                    getStatusText
                  }
                  formatDate={
                    formatDate
                  }
                  onOpenAppointment={
                    openAppointment
                  }
                />

              </section>

            </main>
          )}


        {/* CLIENTS */}

        {!selectedClient &&
          !selectedAppointment &&
          activeSection ===
            "clients" && (
            <main>

              <section className="admin-page-intro">

                <h2>
                  {
                    t.clientManagement
                  }
                </h2>

                <p>
                  {t.clientText}
                </p>

              </section>


              <section className="admin-panel">

                <ClientTable
                  clients={
                    clients
                  }
                  t={t}
                  formatDate={
                    formatDate
                  }
                  getTreatmentName={
                    getTreatmentName
                  }
                  onOpenClient={
                    openClientProfile
                  }
                />

              </section>

            </main>
          )}


        {/* TREATMENTS */}

        {!selectedClient &&
          !selectedAppointment &&
          activeSection ===
            "treatments" && (
            <main>

              <section className="admin-page-intro treatment-page-heading">

                <div>

                  <h2>
                    {
                      t.treatmentManagement
                    }
                  </h2>

                  <p>
                    {
                      t.treatmentText
                    }
                  </p>

                </div>


                <button
                  type="button"
                  className="admin-primary-btn"
                  onClick={
                    openAddTreatment
                  }
                >
                  + {t.addTreatment}
                </button>

              </section>


              {treatmentMessage && (
                <div className="admin-success-message">
                  ✓ {treatmentMessage}
                </div>
              )}


              {showTreatmentForm && (
                <TreatmentForm
                  key={
                    editingTreatment
                      ? editingTreatment.id
                      : "new"
                  }
                  treatment={
                    editingTreatment
                  }
                  t={t}
                  onSave={
                    handleSaveTreatment
                  }
                  onCancel={() => {
                    setShowTreatmentForm(
                      false
                    );

                    setEditingTreatmentId(
                      null
                    );
                  }}
                />
              )}


              <section className="treatment-management-grid">

                {treatments.map(
                  (treatment) => (
                    <article
                      className={`treatment-management-card ${
                        treatment.isActive
                          ? ""
                          : "inactive-treatment"
                      }`}
                      key={
                        treatment.id
                      }
                    >

                      <div className="treatment-management-top">

                        <div className="admin-management-number">
                          {String(
                            treatment.id
                          ).padStart(
                            2,
                            "0"
                          )}
                        </div>


                        <span
                          className={`treatment-status-pill ${
                            treatment.isActive
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {treatment.isActive
                            ? t.activeStatus
                            : t.inactiveStatus}
                        </span>

                      </div>


                      <h3>
                        {getTreatmentName(
                          treatment
                        )}
                      </h3>


                      <p className="treatment-secondary-name">
                        {isArabic
                          ? treatment.name
                          : treatment.nameAr}
                      </p>


                      <div className="treatment-management-metrics">

                        <div>

                          <span>
                            {
                              t.defaultSessionsLabel
                            }
                          </span>

                          <strong>
                            {
                              treatment.defaultSessions
                            }
                          </strong>

                        </div>


                        <div>

                          <span>
                            {
                              t.suggestedIntervalLabel
                            }
                          </span>

                          <strong>
                            {
                              treatment.intervalDays
                            }{" "}
                            {t.days}
                          </strong>

                        </div>


                        <div>

                          <span>
                            {
                              t.activeClients
                            }
                          </span>

                          <strong>
                            {
                              treatment.activeClients
                            }
                          </strong>

                        </div>

                      </div>


                      <div className="treatment-management-actions">

                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() =>
                            openEditTreatment(
                              treatment.id
                            )
                          }
                        >
                          {t.editTreatment}
                        </button>


                        <button
                          type="button"
                          className={
                            treatment.isActive
                              ? "admin-danger-btn"
                              : "admin-primary-btn"
                          }
                          onClick={() =>
                            toggleTreatmentStatus(
                              treatment.id
                            )
                          }
                        >
                          {treatment.isActive
                            ? t.deactivate
                            : t.activate}
                        </button>

                      </div>

                    </article>
                  )
                )}

              </section>

            </main>
          )}
{/* ===================================================
    SPECIALISTS
=================================================== */}

{!selectedClient &&
  !selectedAppointment &&
  activeSection ===
    "specialists" && (
    <main>

      <section className="admin-page-intro specialist-page-heading">

        <div>

          <h2>
            {t.specialistManagement}
          </h2>

          <p>
            {t.specialistText}
          </p>

        </div>


        <button
          type="button"
          className="admin-primary-btn"
          onClick={
            openAddSpecialist
          }
        >
          + {t.addSpecialist}
        </button>

      </section>


      {/* SUCCESS MESSAGE */}

      {specialistMessage && (
        <div className="admin-success-message">
          ✓ {specialistMessage}
        </div>
      )}


      {/* ADD / EDIT SPECIALIST FORM */}

      {showSpecialistForm && (
        <SpecialistForm
          key={
            editingSpecialist
              ? editingSpecialist.id
              : "new-specialist"
          }
          specialist={
            editingSpecialist
          }
          t={t}
          isArabic={
            isArabic
          }
          onSave={
            handleSaveSpecialist
          }
          onCancel={() => {
            setShowSpecialistForm(
              false
            );

            setEditingSpecialistId(
              null
            );
          }}
        />
      )}


      {/* SPECIALIST CARDS */}

      <section className="specialist-management-grid">

        {specialists.map(
          (specialist) => {

            const assignedServices =
              (
                specialist.services ||
                []
              )
                .map(
                  (serviceId) =>
                    clinicServices.find(
                      (service) =>
                        service.id ===
                        serviceId
                    )
                )
                .filter(Boolean);


            const workingDays =
              Object.values(
                specialist.schedule ||
                  {}
              ).filter(
                (slots) =>
                  Array.isArray(
                    slots
                  ) &&
                  slots.length > 0
              ).length;


            return (
              <article
                className={`specialist-management-card ${
                  specialist.isActive
                    ? ""
                    : "inactive-specialist"
                }`}
                key={
                  specialist.id
                }
              >

                <div className="specialist-management-top">

                  <div className="admin-specialist-avatar">
                    {specialist.name
                      .replace(
                        "Dr. ",
                        ""
                      )
                      .charAt(0)}
                  </div>


                  <span
                    className={`treatment-status-pill ${
                      specialist.isActive
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {specialist.isActive
                      ? t.activeStatus
                      : t.inactiveStatus}
                  </span>

                </div>


                <h3>
                  {specialist.name}
                </h3>


                <p className="specialist-specialty">
                  {isArabic
                    ? specialist.specialtyAr
                    : specialist.specialty}
                </p>


                <div className="specialist-summary-grid">

                  <div>

                    <span>
                      {t.servicesCount}
                    </span>

                    <strong>
                      {
                        assignedServices.length
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      {t.workingDays}
                    </span>

                    <strong>
                      {workingDays}
                    </strong>

                  </div>

                </div>


                <div className="specialist-services">

                  <span>
                    {t.assignedServices}
                  </span>


                  <div className="specialist-service-tags">

                    {assignedServices.map(
                      (service) => (
                        <small
                          key={
                            service.id
                          }
                        >
                          {service.name}
                        </small>
                      )
                    )}

                  </div>

                </div>


                <div className="treatment-management-actions">

                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={() =>
                      openEditSpecialist(
                        specialist.id
                      )
                    }
                  >
                    {t.editSpecialist}
                  </button>


                  <button
                    type="button"
                    className={
                      specialist.isActive
                        ? "admin-danger-btn"
                        : "admin-primary-btn"
                    }
                    onClick={() =>
                      toggleSpecialistStatus(
                        specialist.id
                      )
                    }
                  >
                    {specialist.isActive
                      ? t.deactivate
                      : t.activate}
                  </button>

                </div>

              </article>
            );
          }
        )}

      </section>

    </main>
  )}


      {/* END OF ADMIN CONTENT */}

      </div>
      

    </div>
  );
}

/* =========================================================
   TODAY SCHEDULE
========================================================= */

function TodaySchedule({
  appointments,
  specialists,
  isArabic,
  getStatusText,
  onOpenAppointment,
  onOpenClient,
  onOpenInbox,
}) {
  const [
    selectedDate,
    setSelectedDate,
  ] = useState(
    getLocalDateString()
  );

  const [
    specialistFilter,
    setSpecialistFilter,
  ] = useState("all");

  const [
    treatmentFilter,
    setTreatmentFilter,
  ] = useState("all");

  const [
    viewMode,
    setViewMode,
  ] = useState("timeline");


  const labels = isArabic
    ? {
        title: "جدول اليوم",
        subtitle:
          "عرض وإدارة جميع مواعيد العيادة لهذا اليوم.",
        appointmentsToday:
          "مواعيد اليوم",
        confirmed: "مؤكد",
        pending: "بانتظار التأكيد",
        cancelled: "ملغي",
        allSpecialists:
          "كل الأخصائيات",
        allTreatments:
          "كل العلاجات",
        list: "قائمة",
        timeline: "الجدول",
        todaySummary:
          "ملخص اليوم",
        appointments: "مواعيد",
        recentBookings:
          "طلبات الحجز الأخيرة",
        viewAll: "عرض الكل",
        noAppointments:
          "لا توجد مواعيد في هذا اليوم.",
        noRequests:
          "لا توجد طلبات حجز جديدة.",
        today: "اليوم",
      }
    : {
        title: "Today's Schedule",
        subtitle:
          "View and manage all clinic appointments for the selected day.",
        appointmentsToday:
          "Appointments Today",
        confirmed: "Confirmed",
        pending: "Pending",
        cancelled: "Cancelled",
        allSpecialists:
          "All Specialists",
        allTreatments:
          "All Treatments",
        list: "List",
        timeline: "Timeline",
        todaySummary:
          "Today Summary",
        appointments:
          "Appointments",
        recentBookings:
          "Recent Booking Requests",
        viewAll: "View All",
        noAppointments:
          "No appointments scheduled for this day.",
        noRequests:
          "No new booking requests.",
        today: "Today",
      };


  const treatmentDurations = {
    "Laser Hair Removal": 45,
    Hydrafacial: 60,
    "Skin Rejuvenation": 45,
    "Acne Treatment": 45,
    "Pigmentation Treatment": 45,
    "Deep Cleansing Facial": 60,
  };


  const timeToMinutes = (
    time
  ) => {
    if (!time) {
      return 0;
    }

    const match =
      time.match(
        /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
      );

    if (!match) {
      return 0;
    }

    let hour =
      Number(match[1]);

    const minute =
      Number(match[2]);

    const period =
      match[3].toUpperCase();

    if (
      period === "PM" &&
      hour !== 12
    ) {
      hour += 12;
    }

    if (
      period === "AM" &&
      hour === 12
    ) {
      hour = 0;
    }

    return (
      hour * 60 +
      minute
    );
  };


  const minutesToTime = (
    totalMinutes
  ) => {
    const normalized =
      ((totalMinutes %
        (24 * 60)) +
        24 * 60) %
      (24 * 60);

    const hour24 =
      Math.floor(
        normalized / 60
      );

    const minute =
      normalized % 60;

    const period =
      hour24 >= 12
        ? "PM"
        : "AM";

    const hour12 =
      hour24 % 12 || 12;

    return `${String(
      hour12
    ).padStart(
      2,
      "0"
    )}:${String(
      minute
    ).padStart(
      2,
      "0"
    )} ${period}`;
  };


  const getDuration = (
    treatment
  ) =>
    treatmentDurations[
      treatment
    ] || 45;


  const getEndTime = (
    appointment
  ) =>
    minutesToTime(
      timeToMinutes(
        appointment.time
      ) +
        getDuration(
          appointment.treatment
        )
    );


  const selectedDateObject =
    new Date(
      `${selectedDate}T00:00:00`
    );


  const dayAppointments =
    appointments
      .filter(
        (appointment) =>
          appointment.date ===
          selectedDate
      )
      .sort(
        (a, b) =>
          timeToMinutes(
            a.time
          ) -
          timeToMinutes(
            b.time
          )
      );


  const treatmentNames =
    Array.from(
      new Set(
        appointments
          .map(
            (appointment) =>
              appointment.treatment
          )
          .filter(Boolean)
      )
    ).sort();


  const visibleAppointments =
    dayAppointments.filter(
      (appointment) => {
        const specialistMatches =
          specialistFilter ===
            "all" ||
          appointment.specialist ===
            specialistFilter;

        const treatmentMatches =
          treatmentFilter ===
            "all" ||
          appointment.treatment ===
            treatmentFilter;

        return (
          specialistMatches &&
          treatmentMatches
        );
      }
    );


  const confirmedCount =
    dayAppointments.filter(
      (appointment) =>
        appointment.status ===
        "confirmed"
    ).length;

  const pendingCount =
    dayAppointments.filter(
      (appointment) =>
        appointment.status ===
        "pending"
    ).length;

  const cancelledCount =
    dayAppointments.filter(
      (appointment) =>
        appointment.status ===
        "cancelled"
    ).length;


  const treatmentSummary =
    Object.entries(
      dayAppointments.reduce(
        (
          summary,
          appointment
        ) => {
          const key =
            appointment.treatment ||
            (isArabic
              ? "علاج آخر"
              : "Other Treatment");

          summary[key] =
            (summary[key] || 0) +
            1;

          return summary;
        },
        {}
      )
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 4);


  const recentRequests =
    appointments
      .filter(
        (appointment) =>
          appointment.source ===
            "website" &&
          appointment.status ===
            "pending"
      )
      .sort(
        (a, b) => {
          const aTime =
            a.createdAt
              ? new Date(
                  a.createdAt
                ).getTime()
              : Number(a.id);

          const bTime =
            b.createdAt
              ? new Date(
                  b.createdAt
                ).getTime()
              : Number(b.id);

          return (
            bTime - aTime
          );
        }
      )
      .slice(0, 3);


  const shiftDay = (
    amount
  ) => {
    const nextDate =
      new Date(
        `${selectedDate}T00:00:00`
      );

    nextDate.setDate(
      nextDate.getDate() +
        amount
    );

    setSelectedDate(
      getLocalDateString(
        nextDate
      )
    );
  };


  const shiftMonth = (
    amount
  ) => {
    const nextDate =
      new Date(
        `${selectedDate}T00:00:00`
      );

    nextDate.setMonth(
      nextDate.getMonth() +
        amount
    );

    setSelectedDate(
      getLocalDateString(
        nextDate
      )
    );
  };


  const monthName =
    new Intl.DateTimeFormat(
      isArabic
        ? "ar-JO"
        : "en-US",
      {
        month: "long",
        year: "numeric",
      }
    ).format(
      selectedDateObject
    );


  const fullDateLabel =
    new Intl.DateTimeFormat(
      isArabic
        ? "ar-JO"
        : "en-US",
      {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(
      selectedDateObject
    );


  const monthStart =
    new Date(
      selectedDateObject.getFullYear(),
      selectedDateObject.getMonth(),
      1
    );

  const monthEnd =
    new Date(
      selectedDateObject.getFullYear(),
      selectedDateObject.getMonth() +
        1,
      0
    );

  const daysInMonth =
    monthEnd.getDate();

  const firstWeekday =
    monthStart.getDay();

  const calendarCells = [
    ...Array(
      firstWeekday
    ).fill(null),
    ...Array.from(
      {
        length:
          daysInMonth,
      },
      (_, index) =>
        index + 1
    ),
  ];


  const selectCalendarDay = (
    day
  ) => {
    if (!day) {
      return;
    }

    const nextDate =
      new Date(
        selectedDateObject.getFullYear(),
        selectedDateObject.getMonth(),
        day
      );

    setSelectedDate(
      getLocalDateString(
        nextDate
      )
    );
  };


  const statusClass = (
    status
  ) =>
    status === "confirmed"
      ? "confirmed"
      : status ===
          "completed"
        ? "completed"
        : status ===
            "cancelled"
          ? "cancelled"
          : "pending";


  return (
    <main className="today-dashboard">

      <div className="today-dashboard-grid">

        <section className="today-main-column">

          <div className="today-hero-card">

            <div className="today-heading-row">

              <div>

                <h1>
                  {
                    labels.title
                  }
                </h1>

                <p>
                  {
                    labels.subtitle
                  }{" "}
                  <strong>
                    {
                      fullDateLabel
                    }
                  </strong>
                </p>

              </div>


              <div className="today-date-nav">

                <button
                  type="button"
                  onClick={() =>
                    shiftDay(-1)
                  }
                  aria-label="Previous day"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className="today-date-current"
                  onClick={() =>
                    setSelectedDate(
                      getLocalDateString()
                    )
                  }
                >
                  ◫{" "}
                  {
                    labels.today
                  }
                </button>

                <button
                  type="button"
                  onClick={() =>
                    shiftDay(1)
                  }
                  aria-label="Next day"
                >
                  ›
                </button>

              </div>

            </div>


            <div className="today-stats-grid">

              <div className="today-stat-card">

                <span className="today-stat-icon appointments">
                  ▣
                </span>

                <div>
                  <strong>
                    {
                      dayAppointments.length
                    }
                  </strong>
                  <small>
                    {
                      labels.appointmentsToday
                    }
                  </small>
                </div>

              </div>


              <div className="today-stat-card">

                <span className="today-stat-icon confirmed">
                  ✓
                </span>

                <div>
                  <strong>
                    {
                      confirmedCount
                    }
                  </strong>
                  <small>
                    {
                      labels.confirmed
                    }
                  </small>
                </div>

              </div>


              <div className="today-stat-card">

                <span className="today-stat-icon pending">
                  ◷
                </span>

                <div>
                  <strong>
                    {
                      pendingCount
                    }
                  </strong>
                  <small>
                    {
                      labels.pending
                    }
                  </small>
                </div>

              </div>


              <div className="today-stat-card">

                <span className="today-stat-icon cancelled">
                  ×
                </span>

                <div>
                  <strong>
                    {
                      cancelledCount
                    }
                  </strong>
                  <small>
                    {
                      labels.cancelled
                    }
                  </small>
                </div>

              </div>

            </div>


            <div className="today-toolbar">

              <select
                value={
                  specialistFilter
                }
                onChange={(
                  event
                ) =>
                  setSpecialistFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="all">
                  {
                    labels.allSpecialists
                  }
                </option>

                {specialists.map(
                  (specialist) => (
                    <option
                      key={
                        specialist.id
                      }
                      value={
                        specialist.name
                      }
                    >
                      {
                        specialist.name
                      }
                    </option>
                  )
                )}

              </select>


              <select
                value={
                  treatmentFilter
                }
                onChange={(
                  event
                ) =>
                  setTreatmentFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="all">
                  {
                    labels.allTreatments
                  }
                </option>

                {treatmentNames.map(
                  (treatment) => (
                    <option
                      key={
                        treatment
                      }
                      value={
                        treatment
                      }
                    >
                      {treatment}
                    </option>
                  )
                )}

              </select>


              <div className="today-view-toggle">

                <button
                  type="button"
                  className={
                    viewMode ===
                    "list"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setViewMode(
                      "list"
                    )
                  }
                >
                  ☷{" "}
                  {
                    labels.list
                  }
                </button>

                <button
                  type="button"
                  className={
                    viewMode ===
                    "timeline"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setViewMode(
                      "timeline"
                    )
                  }
                >
                  ≡{" "}
                  {
                    labels.timeline
                  }
                </button>

              </div>

            </div>

          </div>


          <section
            className={`today-appointments-list ${viewMode}`}
          >

            {visibleAppointments.length >
            0 ? (

              visibleAppointments.map(
                (
                  appointment
                ) => (

                  <article
                    className={`today-appointment-row ${statusClass(
                      appointment.status
                    )}`}
                    key={
                      appointment.id
                    }
                  >

                    <div className="today-time-block">

                      <strong>
                        {
                          appointment.time
                        }
                      </strong>

                      <small>
                        {getEndTime(
                          appointment
                        )}
                      </small>

                    </div>


                    <button
                      type="button"
                      className="today-client-block"
                      onClick={() =>
                        onOpenClient(
                          appointment.clientId
                        )
                      }
                    >

                      <span className="today-client-avatar">
                        {appointment.client
                          ?.charAt(0)
                          .toUpperCase() ||
                          "C"}
                      </span>

                      <span>
                        <strong>
                          {
                            appointment.client
                          }
                        </strong>

                        <small>
                          {
                            appointment.phone ||
                            ""
                          }
                        </small>
                      </span>

                    </button>


                    <div className="today-treatment-block">

                      <strong>
                        {
                          appointment.treatment
                        }
                      </strong>

                      <small>
                        {getDuration(
                          appointment.treatment
                        )}{" "}
                        min
                      </small>

                    </div>


                    <div className="today-specialist-block">
                      {
                        appointment.specialist
                      }
                    </div>


                    <span
                      className={`today-status-pill ${statusClass(
                        appointment.status
                      )}`}
                    >
                      {getStatusText(
                        appointment.status
                      )}
                    </span>


                    <button
                      type="button"
                      className="today-row-menu"
                      onClick={() =>
                        onOpenAppointment(
                          appointment.id
                        )
                      }
                      aria-label="Manage appointment"
                    >
                      ⋮
                    </button>

                  </article>

                )
              )

            ) : (

              <div className="today-empty-state">
                {
                  labels.noAppointments
                }
              </div>

            )}

          </section>

        </section>


        <aside className="today-side-column">

          <section className="today-side-card today-calendar-card">

            <div className="today-side-card-header">

              <h3>
                {monthName}
              </h3>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    shiftMonth(-1)
                  }
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() =>
                    shiftMonth(1)
                  }
                >
                  ›
                </button>
              </div>

            </div>


            <div className="today-calendar-weekdays">

              {(isArabic
                ? [
                    "أح",
                    "إث",
                    "ث",
                    "أر",
                    "خ",
                    "ج",
                    "س",
                  ]
                : [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ]
              ).map(
                (day) => (
                  <span
                    key={day}
                  >
                    {day}
                  </span>
                )
              )}

            </div>


            <div className="today-calendar-grid">

              {calendarCells.map(
                (
                  day,
                  index
                ) => {

                  const isSelected =
                    day ===
                    selectedDateObject.getDate();

                  return (
                    <button
                      type="button"
                      key={`${day}-${index}`}
                      className={
                        isSelected
                          ? "selected"
                          : ""
                      }
                      disabled={
                        !day
                      }
                      onClick={() =>
                        selectCalendarDay(
                          day
                        )
                      }
                    >
                      {day || ""}
                    </button>
                  );
                }
              )}

            </div>

          </section>


          <section className="today-side-card">

            <h3>
              {
                labels.todaySummary
              }
            </h3>


            <div className="today-summary-total">

              <span>
                ▣
              </span>

              <strong>
                {
                  dayAppointments.length
                }
              </strong>

              <small>
                {
                  labels.appointments
                }
              </small>

            </div>


            <div className="today-summary-list">

              {treatmentSummary.map(
                (
                  [
                    treatment,
                    count,
                  ]
                ) => (

                  <div
                    key={
                      treatment
                    }
                  >

                    <span className="today-summary-icon">
                      ✦
                    </span>

                    <strong>
                      {count}
                    </strong>

                    <small>
                      {
                        treatment
                      }
                    </small>

                  </div>

                )
              )}

            </div>

          </section>


          <section className="today-side-card">

            <div className="today-side-card-header">

              <h3>
                {
                  labels.recentBookings
                }
              </h3>

              <button
                type="button"
                className="today-view-all"
                onClick={
                  onOpenInbox
                }
              >
                {
                  labels.viewAll
                }
              </button>

            </div>


            <div className="today-recent-list">

              {recentRequests.length >
              0 ? (

                recentRequests.map(
                  (
                    appointment
                  ) => (

                    <button
                      type="button"
                      key={
                        appointment.id
                      }
                      onClick={() =>
                        onOpenAppointment(
                          appointment.id
                        )
                      }
                    >

                      <span className="today-mini-avatar">
                        {appointment.client
                          ?.charAt(0)
                          .toUpperCase() ||
                          "C"}
                      </span>

                      <span className="today-recent-copy">

                        <strong>
                          {
                            appointment.client
                          }
                        </strong>

                        <small>
                          {
                            appointment.treatment
                          }
                        </small>

                      </span>

                      <span className="today-mini-status">
                        {
                          labels.pending
                        }
                      </span>

                      <span>
                        ›
                      </span>

                    </button>

                  )
                )

              ) : (

                <p className="today-no-requests">
                  {
                    labels.noRequests
                  }
                </p>

              )}

            </div>

          </section>

        </aside>

      </div>

    </main>
  );
}


/* =========================================================
   ADD / EDIT TREATMENT
========================================================= */

function TreatmentForm({
  treatment,
  t,
  onSave,
  onCancel,
}) {
  const [
    formData,
    setFormData,
  ] = useState({
    name:
      treatment?.name || "",

    nameAr:
      treatment?.nameAr || "",

    defaultSessions:
      treatment?.defaultSessions ||
      6,

    intervalDays:
      treatment?.intervalDays ||
      30,
  });


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );
  };


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();


    if (
      !formData.name.trim() ||
      !formData.nameAr.trim()
    ) {
      return;
    }


    onSave({
      name:
        formData.name.trim(),

      nameAr:
        formData.nameAr.trim(),

      defaultSessions:
        Number(
          formData.defaultSessions
        ),

      intervalDays:
        Number(
          formData.intervalDays
        ),
    });
  };


  return (
    <section className="treatment-form-card">

      <div className="add-session-header">

        <div>

          <p className="section-label">
            {t.treatmentManagement}
          </p>

          <h2>
            {treatment
              ? t.editTreatment
              : t.addTreatment}
          </h2>

        </div>


        <button
          type="button"
          className="session-close-btn"
          onClick={onCancel}
        >
          ×
        </button>

      </div>


      <p className="treatment-form-description">
        {t.treatmentSettings}
      </p>


      <form
        onSubmit={
          handleSubmit
        }
      >

        <div className="treatment-form-grid">

          <div className="admin-form-field">

            <label>
              {
                t.treatmentNameEnglish
              }
            </label>

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {
                t.treatmentNameArabic
              }
            </label>

            <input
              type="text"
              name="nameAr"
              value={
                formData.nameAr
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {
                t.defaultSessionsLabel
              }
            </label>

            <input
              type="number"
              name="defaultSessions"
              min="1"
              max="50"
              value={
                formData.defaultSessions
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {
                t.suggestedIntervalLabel
              }
            </label>

            <input
              type="number"
              name="intervalDays"
              min="1"
              max="365"
              value={
                formData.intervalDays
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

        </div>


        <div className="add-session-actions">

          <button
            type="button"
            className="admin-secondary-btn"
            onClick={onCancel}
          >
            {t.cancel}
          </button>


          <button
            type="submit"
            className="admin-primary-btn"
          >
            {treatment
              ? t.updateTreatment
              : t.saveTreatment}
          </button>

        </div>

      </form>

    </section>
  );
}

/* =========================================================
   ADD / EDIT SPECIALIST
========================================================= */

function SpecialistForm({
  specialist,
  t,
  isArabic,
  onSave,
  onCancel,
}) {
  const days = [
    {
      id: 0,
      en: "Sunday",
      ar: "الأحد",
    },

    {
      id: 1,
      en: "Monday",
      ar: "الإثنين",
    },

    {
      id: 2,
      en: "Tuesday",
      ar: "الثلاثاء",
    },

    {
      id: 3,
      en: "Wednesday",
      ar: "الأربعاء",
    },

    {
      id: 4,
      en: "Thursday",
      ar: "الخميس",
    },

    {
      id: 5,
      en: "Friday",
      ar: "الجمعة",
    },

    {
      id: 6,
      en: "Saturday",
      ar: "السبت",
    },
  ];


  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",

    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",

    "05:00 PM",
    "06:00 PM",
  ];


  const emptySchedule = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };


  const initialSchedule =
    specialist?.schedule
      ? Object.fromEntries(
          Object.entries(
            specialist.schedule
          ).map(
            ([
              day,
              slots,
            ]) => [
              day,
              [...slots],
            ]
          )
        )
      : emptySchedule;


  const [
    formData,
    setFormData,
  ] = useState({
    name:
      specialist?.name || "",

    specialty:
      specialist?.specialty ||
      "",

    specialtyAr:
      specialist?.specialtyAr ||
      "",

    services:
      specialist?.services
        ? [...specialist.services]
        : [],

    schedule:
      initialSchedule,
  });


  const [
    formError,
    setFormError,
  ] = useState("");


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );
  };


  /* Adds or removes a service from this specialist. */

  const toggleService = (
    serviceId
  ) => {
    setFormError("");


    setFormData(
      (previous) => {

        const alreadySelected =
          previous.services.includes(
            serviceId
          );


        return {
          ...previous,

          services:
            alreadySelected
              ? previous.services.filter(
                  (id) =>
                    id !==
                    serviceId
                )
              : [
                  ...previous.services,
                  serviceId,
                ],
        };
      }
    );
  };


  /*
    Turns a working day on or off.

    A newly activated day starts with 09:00 AM.
  */

  const toggleWorkingDay = (
    dayId
  ) => {
    setFormData(
      (previous) => {

        const currentSlots =
          previous.schedule[
            dayId
          ] || [];


        return {
          ...previous,

          schedule: {
            ...previous.schedule,

            [dayId]:
              currentSlots.length >
              0
                ? []
                : ["09:00 AM"],
          },
        };
      }
    );
  };


  /* Adds or removes an available time slot. */

  const toggleTimeSlot = (
    dayId,
    time
  ) => {
    setFormData(
      (previous) => {

        const currentSlots =
          previous.schedule[
            dayId
          ] || [];


        const alreadySelected =
          currentSlots.includes(
            time
          );


        return {
          ...previous,

          schedule: {
            ...previous.schedule,

            [dayId]:
              alreadySelected
                ? currentSlots.filter(
                    (slot) =>
                      slot !== time
                  )
                : [
                    ...currentSlots,
                    time,
                  ],
          },
        };
      }
    );
  };


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setFormError("");


    if (
      formData.services.length ===
      0
    ) {
      setFormError(
        t.selectServiceError
      );

      return;
    }


    onSave({
      name:
        formData.name.trim(),

      specialty:
        formData.specialty.trim(),

      specialtyAr:
        formData.specialtyAr.trim(),

      services:
        formData.services,

      schedule:
        formData.schedule,
    });
  };


  return (
    <section className="specialist-form-card">

      <div className="add-session-header">

        <div>

          <p className="section-label">
            {
              t.specialistManagement
            }
          </p>

          <h2>
            {specialist
              ? t.editSpecialist
              : t.addSpecialist}
          </h2>

        </div>


        <button
          type="button"
          className="session-close-btn"
          onClick={onCancel}
        >
          ×
        </button>

      </div>


      {formError && (
        <div className="auth-error">
          {formError}
        </div>
      )}


      <form
        onSubmit={
          handleSubmit
        }
      >

        <div className="treatment-form-grid">

          <div className="admin-form-field">

            <label>
              {
                t.specialistName
              }
            </label>

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              placeholder="Dr. Name"
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {
                t.specialtyEnglish
              }
            </label>

            <input
              type="text"
              name="specialty"
              value={
                formData.specialty
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {
                t.specialtyArabic
              }
            </label>

            <input
              type="text"
              name="specialtyAr"
              value={
                formData.specialtyAr
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

        </div>


        {/* SERVICES */}

        <div className="specialist-form-section">

          <div className="specialist-form-section-title">

            <p className="section-label">
              {
                t.assignedServices
              }
            </p>

            <h3>
              {
                t.assignedServices
              }
            </h3>

          </div>


          <div className="specialist-service-options">

            {clinicServices.map(
              (service) => {

                const selected =
                  formData.services.includes(
                    service.id
                  );


                return (
                  <button
                    type="button"
                    key={
                      service.id
                    }
                    className={
                      selected
                        ? "specialist-service-option selected"
                        : "specialist-service-option"
                    }
                    onClick={() =>
                      toggleService(
                        service.id
                      )
                    }
                  >
                    <span>
                      {selected
                        ? "✓"
                        : "+"}
                    </span>

                    {
                      service.name
                    }
                  </button>
                );
              }
            )}

          </div>

        </div>


        {/* WORKING SCHEDULE */}

        <div className="specialist-form-section">

          <div className="specialist-form-section-title">

            <p className="section-label">
              {
                t.workingSchedule
              }
            </p>

            <h3>
              {
                t.workingSchedule
              }
            </h3>

          </div>


          <div className="specialist-schedule-editor">

            {days.map(
              (day) => {

                const selectedSlots =
                  formData.schedule[
                    day.id
                  ] || [];


                const isWorking =
                  selectedSlots.length >
                  0;


                return (
                  <div
                    className="specialist-day-row"
                    key={
                      day.id
                    }
                  >

                    <div className="specialist-day-header">

                      <label className="specialist-day-toggle">

                        <input
                          type="checkbox"
                          checked={
                            isWorking
                          }
                          onChange={() =>
                            toggleWorkingDay(
                              day.id
                            )
                          }
                        />

                        <strong>
                          {isArabic
                            ? day.ar
                            : day.en}
                        </strong>

                      </label>


                      {!isWorking && (
                        <span className="specialist-off-label">
                          {t.off}
                        </span>
                      )}

                    </div>


                    {isWorking && (
                      <div className="specialist-time-options">

                        {timeSlots.map(
                          (
                            time
                          ) => {

                            const selected =
                              selectedSlots.includes(
                                time
                              );


                            return (
                              <button
                                type="button"
                                key={
                                  time
                                }
                                className={
                                  selected
                                    ? "specialist-time-option selected"
                                    : "specialist-time-option"
                                }
                                onClick={() =>
                                  toggleTimeSlot(
                                    day.id,
                                    time
                                  )
                                }
                              >
                                {time}
                              </button>
                            );
                          }
                        )}

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>

        </div>


        <div className="add-session-actions">

          <button
            type="button"
            className="admin-secondary-btn"
            onClick={onCancel}
          >
            {t.cancel}
          </button>


          <button
            type="submit"
            className="admin-primary-btn"
          >
            {specialist
              ? t.updateSpecialist
              : t.saveSpecialist}
          </button>

        </div>

      </form>

    </section>
  );
}
/* =========================================================
   APPOINTMENT DETAILS
========================================================= */

function AppointmentDetails({
  appointment,
  t,
  formatDate,
  getTreatmentName,
  getStatusText,
  message,
  onBack,
  onConfirm,
  onComplete,
  onCancel,
  onReschedule,
}) {
  const [
    showReschedule,
    setShowReschedule,
  ] = useState(false);


  const [
    newDate,
    setNewDate,
  ] = useState(
    appointment.date
  );


  const [
    newTime,
    setNewTime,
  ] = useState(
    appointment.time
  );


  const [
    dateError,
    setDateError,
  ] = useState("");


  const today =
    getLocalDateString();


  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];


  const isFinalStatus =
    appointment.status ===
      "completed" ||
    appointment.status ===
      "cancelled";


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setDateError("");


    if (
      !newDate ||
      newDate < today
    ) {
      setDateError(
        t.invalidAppointmentDate
      );

      return;
    }


    onReschedule(
      newDate,
      newTime
    );


    setShowReschedule(false);
  };


  return (
    <main>

      <div className="appointment-detail-actions">

        <button
          type="button"
          className="admin-back-btn"
          onClick={onBack}
        >
          ← {t.backToAppointments}
        </button>

      </div>


      {message && (
        <div className="admin-success-message">
          ✓ {message}
        </div>
      )}


      <section className="appointment-detail-card">

        <div className="appointment-detail-header">

          <div>

            <p className="section-label">
              {t.appointmentDetails}
            </p>

            <h2>
              {appointment.client}
            </h2>

          </div>


          <span
            className={`admin-status ${appointment.status}`}
          >
            {getStatusText(
              appointment.status
            )}
          </span>

        </div>


        <div className="appointment-detail-grid">

          <div>

            <span>
              {t.appointmentDate}
            </span>

            <strong>
              {formatDate(
                appointment.date
              )}
            </strong>

          </div>


          <div>

            <span>
              {t.appointmentTime}
            </span>

            <strong>
              {appointment.time}
            </strong>

          </div>


          <div>

            <span>
              {t.treatment}
            </span>

            <strong>
              {getTreatmentName(
                appointment
              )}
            </strong>

          </div>


          <div>

            <span>
              {t.specialist}
            </span>

            <strong>
              {
                appointment.specialist
              }
            </strong>

          </div>

        </div>


        {!isFinalStatus && (
          <div className="appointment-management-buttons">

            {appointment.status ===
              "pending" && (
              <button
                type="button"
                className="admin-primary-btn"
                onClick={
                  onConfirm
                }
              >
                ✓ {t.confirmAppointment}
              </button>
            )}


            {appointment.status ===
              "confirmed" && (
              <button
                type="button"
                className="admin-primary-btn"
                onClick={
                  onComplete
                }
              >
                ✓ {t.completeAppointment}
              </button>
            )}


            <button
              type="button"
              className="admin-secondary-btn"
              onClick={() => {
                setShowReschedule(
                  (previous) =>
                    !previous
                );

                setDateError("");
              }}
            >
              {t.reschedule}
            </button>


            <button
              type="button"
              className="admin-danger-btn"
              onClick={
                onCancel
              }
            >
              {t.cancelAppointment}
            </button>

          </div>
        )}

      </section>


      {showReschedule &&
        !isFinalStatus && (
          <section className="reschedule-card">

            <div>

              <p className="section-label">
                {t.reschedule}
              </p>

              <h2>
                {
                  t.rescheduleAppointment
                }
              </h2>

            </div>


            {dateError && (
              <div className="auth-error">
                {dateError}
              </div>
            )}


            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="add-session-form-grid">

                <div className="admin-form-field">

                  <label>
                    {t.newDate}
                  </label>

                  <input
                    type="date"
                    value={
                      newDate
                    }
                    min={
                      today
                    }
                    onChange={(
                      event
                    ) => {
                      setNewDate(
                        event.target
                          .value
                      );

                      setDateError(
                        ""
                      );
                    }}
                    required
                  />

                </div>


                <div className="admin-form-field">

                  <label>
                    {t.newTime}
                  </label>

                  <select
                    value={
                      newTime
                    }
                    onChange={(
                      event
                    ) =>
                      setNewTime(
                        event.target
                          .value
                      )
                    }
                  >

                    {timeSlots.map(
                      (time) => (
                        <option
                          key={time}
                          value={time}
                        >
                          {time}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>


              <div className="add-session-actions">

                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => {
                    setShowReschedule(
                      false
                    );

                    setDateError(
                      ""
                    );
                  }}
                >
                  {t.cancel}
                </button>


                <button
                  type="submit"
                  className="admin-primary-btn"
                >
                  {t.saveChanges}
                </button>

              </div>

            </form>

          </section>
        )}

    </main>
  );
}


/* =========================================================
   CLIENT PROFILE
========================================================= */

function normalizeDateValue(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return "";
}


function addProfileDays(dateString, days) {
  if (!dateString) {
    return null;
  }

  const date = new Date(
    `${normalizeDateValue(dateString)}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setDate(
    date.getDate() + Number(days || 0)
  );

  return date;
}


function profileDateString(date) {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function getLaserPeriodRecommendation(
  plan,
  client
) {
  const enabled = Boolean(
    client.period_tracking_enabled ??
      client.periodTrackingEnabled
  );

  const lastPeriodStart =
    normalizeDateValue(
      client.last_period_start ||
        client.lastPeriodStart
    );

  const targetDate = normalizeDateValue(
    plan.nextSuggested
  );

  if (
    !enabled ||
    !lastPeriodStart ||
    !targetDate
  ) {
    return null;
  }

  const cycleLength = Number(
    client.cycle_length_days ||
      client.cycleLengthDays ||
      28
  );

  const periodLength = Number(
    client.period_length_days ||
      client.periodLengthDays ||
      5
  );

  const target = new Date(
    `${targetDate}T00:00:00`
  );

  let upcomingPeriod = new Date(
    `${lastPeriodStart}T00:00:00`
  );

  if (
    Number.isNaN(target.getTime()) ||
    Number.isNaN(upcomingPeriod.getTime())
  ) {
    return null;
  }

  while (upcomingPeriod < target) {
    const next = new Date(upcomingPeriod);
    next.setDate(
      next.getDate() + cycleLength
    );

    if (next >= target) {
      upcomingPeriod = next;
      break;
    }

    upcomingPeriod = next;
  }

  const previousPeriod = new Date(
    upcomingPeriod
  );
  previousPeriod.setDate(
    previousPeriod.getDate() -
      cycleLength
  );

  const candidatePeriods = [
    previousPeriod,
    upcomingPeriod,
  ];

  for (const periodStart of candidatePeriods) {
    const blockedStart = new Date(
      periodStart
    );
    blockedStart.setDate(
      blockedStart.getDate() - 2
    );

    const blockedEnd = new Date(
      periodStart
    );
    blockedEnd.setDate(
      blockedEnd.getDate() +
        periodLength +
        1
    );

    if (
      target >= blockedStart &&
      target <= blockedEnd
    ) {
      const recommended = new Date(
        blockedEnd
      );
      recommended.setDate(
        recommended.getDate() + 1
      );

      return {
        hasConflict: true,
        originalDate: targetDate,
        recommendedDate:
          profileDateString(
            recommended
          ),
        blockedStart:
          profileDateString(
            blockedStart
          ),
        blockedEnd:
          profileDateString(
            blockedEnd
          ),
      };
    }
  }

  return {
    hasConflict: false,
    originalDate: targetDate,
    recommendedDate: targetDate,
  };
}


function ClientProfile({
  client,
  isArabic,
  t,
  formatDate,
  getTreatmentName,
  getAreas,
  getReminderDate,
  treatments,
  specialists,
  onBack,
  onAddSession,
  showAddSession,
  onCancelSession,
  onSaveSession,
  sessionMessage,
  onCreateTreatmentPlan,
  showTreatmentPlanForm,
  onCancelTreatmentPlan,
  onSaveTreatmentPlan,
  treatmentPlanMessage,
  onSavePeriodPreferences,
}) {
  const appointment =
    client.nextAppointment;

  const plans =
    client.treatmentPlans || [];

  const sessions =
    client.sessionHistory || [];

  const activePlans =
    plans.filter(
      (plan) =>
        plan.completedSessions <
        plan.totalSessions
    );

  const hasActivePlans =
    activePlans.length > 0;

  const reminderDate =
    appointment
      ? getReminderDate(
          appointment.date
        )
      : null;

  const periodEnabled = Boolean(
    client.period_tracking_enabled ??
      client.periodTrackingEnabled
  );

  const currentPeriodStart =
    normalizeDateValue(
      client.last_period_start ||
        client.lastPeriodStart
    );

  const currentCycleLength = Number(
    client.cycle_length_days ||
      client.cycleLengthDays ||
      28
  );

  const currentPeriodLength = Number(
    client.period_length_days ||
      client.periodLengthDays ||
      5
  );

  const [
    showPeriodForm,
    setShowPeriodForm,
  ] = useState(false);

  const [
    periodMessage,
    setPeriodMessage,
  ] = useState("");

  const [
    periodSaving,
    setPeriodSaving,
  ] = useState(false);

  const [
    periodForm,
    setPeriodForm,
  ] = useState({
    enabled: periodEnabled,
    lastPeriodStart:
      currentPeriodStart,
    cycleLengthDays:
      currentCycleLength,
    periodLengthDays:
      currentPeriodLength,
  });

  const openPeriodForm = () => {
    setPeriodForm({
      enabled: periodEnabled,
      lastPeriodStart:
        currentPeriodStart,
      cycleLengthDays:
        currentCycleLength,
      periodLengthDays:
        currentPeriodLength,
    });

    setPeriodMessage("");
    setShowPeriodForm(true);
  };

  const savePeriodPreferences =
    async (event) => {
      event.preventDefault();

      if (
        periodForm.enabled &&
        !periodForm.lastPeriodStart
      ) {
        setPeriodMessage(
          isArabic
            ? "أدخلي تاريخ بداية آخر دورة."
            : "Enter the start date of the last period."
        );
        return;
      }

      try {
        setPeriodSaving(true);
        setPeriodMessage("");

        await onSavePeriodPreferences({
          enabled:
            periodForm.enabled,
          lastPeriodStart:
            periodForm.enabled
              ? periodForm.lastPeriodStart
              : null,
          cycleLengthDays:
            Number(
              periodForm.cycleLengthDays
            ),
          periodLengthDays:
            Number(
              periodForm.periodLengthDays
            ),
        });

        setPeriodMessage(
          isArabic
            ? "تم حفظ تفضيلات الجدولة."
            : "Scheduling preferences saved."
        );

        setShowPeriodForm(false);
      } catch (error) {
        setPeriodMessage(
          error.message ||
            (isArabic
              ? "تعذر حفظ التفضيلات."
              : "Could not save the preferences.")
        );
      } finally {
        setPeriodSaving(false);
      }
    };

  return (
    <main className="client-profile-page">

      <div className="client-profile-back-row">
        <button
          type="button"
          className="admin-back-btn"
          onClick={onBack}
        >
          ← {t.backToClients}
        </button>
      </div>


      <section className="client-profile-hero-card">

        <div className="client-profile-identity">
          <div className="client-profile-avatar client-profile-avatar-large">
            {client.name?.charAt(0) || "C"}
          </div>

          <div>
            <p className="section-label">
              {t.clientProfile}
            </p>

            <h2>
              {client.name}
            </h2>

            <div className="client-profile-contact-line">
              <span>
                {client.phone || "-"}
              </span>
              <span>•</span>
              <span>
                {client.email || "-"}
              </span>
            </div>
          </div>
        </div>


        <div className="client-profile-hero-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={
              onCreateTreatmentPlan
            }
          >
            + {t.createTreatmentPlan}
          </button>

          {hasActivePlans && (
            <button
              type="button"
              className="admin-primary-btn"
              onClick={onAddSession}
            >
              + {t.addSession}
            </button>
          )}
        </div>


        <div className="client-profile-quick-facts">
          <div>
            <span>{t.lastVisit}</span>
            <strong>
              {formatDate(
                client.lastVisit ||
                  client.last_visit
              )}
            </strong>
          </div>

          <div>
            <span>
              {isArabic
                ? "خطط العلاج النشطة"
                : "Active Plans"}
            </span>
            <strong>
              {activePlans.length}
            </strong>
          </div>

          <div>
            <span>
              {isArabic
                ? "إجمالي الجلسات"
                : "Sessions Logged"}
            </span>
            <strong>
              {sessions.length}
            </strong>
          </div>
        </div>

      </section>


      {treatmentPlanMessage && (
        <div className="admin-success-message">
          ✓ {treatmentPlanMessage}
        </div>
      )}

      {sessionMessage && (
        <div className="admin-success-message">
          ✓ {sessionMessage}
        </div>
      )}


      {showTreatmentPlanForm && (
        <CreateTreatmentPlanForm
          treatments={treatments}
          specialists={specialists}
          isArabic={isArabic}
          t={t}
          onCancel={
            onCancelTreatmentPlan
          }
          onSave={
            onSaveTreatmentPlan
          }
        />
      )}


      {showAddSession &&
        hasActivePlans && (
          <AddSessionForm
            client={client}
            t={t}
            isArabic={isArabic}
            onCancel={
              onCancelSession
            }
            onSave={onSaveSession}
          />
        )}


      <div className="client-profile-focus-grid">

        <section className="client-focus-card client-appointment-focus">
          <div className="client-focus-heading">
            <div>
              <p className="section-label">
                {t.nextAppointment}
              </p>
              <h3>
                {t.nextAppointment}
              </h3>
            </div>

            {appointment && (
              <span className="client-focus-pill">
                {isArabic
                  ? "مجدول"
                  : "Scheduled"}
              </span>
            )}
          </div>

          {appointment ? (
            <>
              <div className="client-appointment-main">
                <div className="client-appointment-date-badge">
                  <span>
                    {new Intl.DateTimeFormat(
                      isArabic
                        ? "ar-JO"
                        : "en-US",
                      { month: "short" }
                    ).format(
                      new Date(
                        `${appointment.date}T00:00:00`
                      )
                    )}
                  </span>
                  <strong>
                    {new Date(
                      `${appointment.date}T00:00:00`
                    ).getDate()}
                  </strong>
                </div>

                <div>
                  <h4>
                    {getTreatmentName(
                      appointment
                    )}
                  </h4>

                  <p>
                    {appointment.time} · {appointment.specialist}
                  </p>

                  <small>
                    {formatDate(
                      appointment.date
                    )}
                  </small>
                </div>
              </div>

              <div className="client-reminder-strip">
                <span>✉</span>
                <div>
                  <strong>
                    {t.emailReminder}
                  </strong>
                  <small>
                    {appointment.reminderSent
                      ? t.reminderSent
                      : `${t.reminderScheduled} ${formatDate(
                          reminderDate
                        )}`}
                  </small>
                </div>
              </div>
            </>
          ) : (
            <div className="client-profile-empty-card">
              {t.noAppointment}
            </div>
          )}
        </section>


        <section className="client-focus-card client-period-focus">
          <div className="client-focus-heading">
            <div>
              <p className="section-label">
                {isArabic
                  ? "تفضيلات الجدولة"
                  : "Scheduling Preferences"}
              </p>
              <h3>
                {isArabic
                  ? "جدولة جلسات الليزر"
                  : "Laser Scheduling"}
              </h3>
            </div>

            <span
              className={`client-focus-pill ${
                periodEnabled
                  ? "enabled"
                  : "muted"
              }`}
            >
              {periodEnabled
                ? isArabic
                  ? "مفعّل"
                  : "Enabled"
                : isArabic
                  ? "غير مفعّل"
                  : "Not enabled"}
            </span>
          </div>

          <p className="client-period-description">
            {isArabic
              ? "اختياري. يستخدم النظام هذه البيانات فقط لاقتراح موعد ليزر لا يقع ضمن فترة الدورة المقدّرة أو يومين قبلها وبعدها."
              : "Optional. The system uses this only to suggest a laser date outside the estimated period window and two days before/after."}
          </p>

          {!showPeriodForm && (
            <>
              {periodEnabled ? (
                <div className="client-period-summary">
                  <div>
                    <span>
                      {isArabic
                        ? "بداية آخر دورة"
                        : "Last period start"}
                    </span>
                    <strong>
                      {formatDate(
                        currentPeriodStart
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {isArabic
                        ? "متوسط الدورة"
                        : "Cycle length"}
                    </span>
                    <strong>
                      {currentCycleLength} {t.days}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {isArabic
                        ? "مدة الدورة"
                        : "Period length"}
                    </span>
                    <strong>
                      {currentPeriodLength} {t.days}
                    </strong>
                  </div>
                </div>
              ) : (
                <div className="client-profile-empty-card compact">
                  {isArabic
                    ? "لا توجد تفضيلات جدولة مسجلة."
                    : "No scheduling preference recorded."}
                </div>
              )}

              <button
                type="button"
                className="client-period-edit-btn"
                onClick={openPeriodForm}
              >
                {periodEnabled
                  ? isArabic
                    ? "تعديل التفضيلات"
                    : "Edit preferences"
                  : isArabic
                    ? "إضافة التفضيلات"
                    : "Add preferences"}
              </button>
            </>
          )}


          {showPeriodForm && (
            <form
              className="client-period-form"
              onSubmit={
                savePeriodPreferences
              }
            >
              <label className="client-period-toggle">
                <input
                  type="checkbox"
                  checked={
                    periodForm.enabled
                  }
                  onChange={(event) =>
                    setPeriodForm(
                      (previous) => ({
                        ...previous,
                        enabled:
                          event.target.checked,
                      })
                    )
                  }
                />
                <span>
                  {isArabic
                    ? "استخدام تفضيلات الدورة في اقتراح مواعيد الليزر"
                    : "Use period preference when suggesting laser dates"}
                </span>
              </label>

              {periodForm.enabled && (
                <div className="client-period-form-grid">
                  <label>
                    <span>
                      {isArabic
                        ? "بداية آخر دورة"
                        : "Last period start"}
                    </span>
                    <input
                      type="date"
                      value={
                        periodForm.lastPeriodStart
                      }
                      onChange={(event) =>
                        setPeriodForm(
                          (previous) => ({
                            ...previous,
                            lastPeriodStart:
                              event.target.value,
                          })
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      {isArabic
                        ? "متوسط طول الدورة"
                        : "Average cycle length"}
                    </span>
                    <input
                      type="number"
                      min="20"
                      max="45"
                      value={
                        periodForm.cycleLengthDays
                      }
                      onChange={(event) =>
                        setPeriodForm(
                          (previous) => ({
                            ...previous,
                            cycleLengthDays:
                              event.target.value,
                          })
                        )
                      }
                    />
                  </label>

                  <label>
                    <span>
                      {isArabic
                        ? "متوسط مدة الدورة"
                        : "Average period length"}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={
                        periodForm.periodLengthDays
                      }
                      onChange={(event) =>
                        setPeriodForm(
                          (previous) => ({
                            ...previous,
                            periodLengthDays:
                              event.target.value,
                          })
                        )
                      }
                    />
                  </label>
                </div>
              )}

              {periodMessage && (
                <p className="client-period-message">
                  {periodMessage}
                </p>
              )}

              <div className="client-period-form-actions">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => {
                    setShowPeriodForm(false);
                    setPeriodMessage("");
                  }}
                >
                  {t.cancel}
                </button>

                <button
                  type="submit"
                  className="admin-primary-btn"
                  disabled={periodSaving}
                >
                  {periodSaving
                    ? isArabic
                      ? "جارٍ الحفظ..."
                      : "Saving..."
                    : isArabic
                      ? "حفظ التفضيلات"
                      : "Save preferences"}
                </button>
              </div>
            </form>
          )}

          {!showPeriodForm &&
            periodMessage && (
              <p className="client-period-message success">
                {periodMessage}
              </p>
            )}
        </section>

      </div>


      <section className="client-profile-section-card">
        <div className="client-profile-section-heading">
          <div>
            <p className="section-label">
              {t.treatmentPlans}
            </p>
            <h2>
              {isArabic
                ? "رحلة العلاج"
                : "Treatment Journey"}
            </h2>
          </div>

          <span className="client-section-count">
            {plans.length}
          </span>
        </div>

        {plans.length > 0 ? (
          <div className="client-treatment-journey-grid">
            {plans.map((plan) => {
              const isCompleted =
                plan.completedSessions >=
                plan.totalSessions;

              const progress = Math.min(
                (plan.completedSessions /
                  plan.totalSessions) *
                  100,
                100
              );

              const isLaser =
                String(
                  plan.treatment || ""
                )
                  .toLowerCase()
                  .includes("laser") ||
                String(
                  plan.treatmentAr || ""
                ).includes("ليزر");

              const laserRecommendation =
                isLaser
                  ? getLaserPeriodRecommendation(
                      plan,
                      client
                    )
                  : null;

              return (
                <article
                  className={`client-treatment-journey-card ${
                    isCompleted
                      ? "completed"
                      : ""
                  }`}
                  key={plan.id}
                >
                  <div className="client-treatment-card-top">
                    <div>
                      <span
                        className={`client-plan-status ${
                          isCompleted
                            ? "completed"
                            : "active"
                        }`}
                      >
                        {isCompleted
                          ? t.completedTreatment
                          : t.activeTreatment}
                      </span>

                      <h3>
                        {getTreatmentName(
                          plan
                        )}
                      </h3>

                      <p>
                        {plan.specialist || "-"}
                      </p>
                    </div>

                    <div className="client-session-ring">
                      <strong>
                        {plan.completedSessions}
                      </strong>
                      <span>
                        /{plan.totalSessions}
                      </span>
                    </div>
                  </div>

                  <div className="client-plan-progress-row">
                    <span>
                      {Math.round(progress)}%
                    </span>
                    <div className="client-plan-progress-track">
                      <div
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="client-plan-meta-grid">
                    <div>
                      <span>{t.lastSession}</span>
                      <strong>
                        {formatDate(
                          plan.lastSession
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>{t.nextSuggested}</span>
                      <strong>
                        {formatDate(
                          plan.nextSuggested
                        )}
                      </strong>
                    </div>
                  </div>

                  {laserRecommendation?.hasConflict && (
                    <div className="client-laser-recommendation warning">
                      <div>
                        <span>!</span>
                      </div>
                      <div>
                        <strong>
                          {isArabic
                            ? "تعارض مع تفضيلات الجدولة"
                            : "Scheduling preference conflict"}
                        </strong>
                        <p>
                          {isArabic
                            ? `الموعد المقترح ${formatDate(
                                laserRecommendation.originalDate
                              )} يقع ضمن النافذة المقدّرة. الموعد الأنسب: ${formatDate(
                                laserRecommendation.recommendedDate
                              )}.`
                            : `The suggested date ${formatDate(
                                laserRecommendation.originalDate
                              )} falls inside the estimated preference window. Recommended: ${formatDate(
                                laserRecommendation.recommendedDate
                              )}.`}
                        </p>
                      </div>
                    </div>
                  )}

                  {isLaser &&
                    periodEnabled &&
                    laserRecommendation &&
                    !laserRecommendation.hasConflict &&
                    plan.nextSuggested && (
                      <div className="client-laser-recommendation clear">
                        <div>✓</div>
                        <div>
                          <strong>
                            {isArabic
                              ? "الموعد المقترح مناسب"
                              : "Suggested date is clear"}
                          </strong>
                          <p>
                            {isArabic
                              ? "لا يوجد تعارض مع نافذة الجدولة المقدّرة."
                              : "No conflict with the estimated scheduling preference window."}
                          </p>
                        </div>
                      </div>
                    )}

                  <div className="client-treatment-areas-row">
                    <span>{t.treatmentAreas}</span>
                    <div>
                      {getAreas(
                        plan.areas || []
                      ).map((area) => (
                        <small key={area}>
                          {area}
                        </small>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="client-profile-empty-card">
            {t.noActiveTreatmentPlans}
          </div>
        )}
      </section>


      <section className="client-profile-section-card">
        <div className="client-profile-section-heading">
          <div>
            <p className="section-label">
              {t.sessionHistory}
            </p>
            <h2>
              {t.sessionHistory}
            </h2>
          </div>

          <span className="client-section-count">
            {sessions.length}
          </span>
        </div>

        {sessions.length > 0 ? (
          <div className="client-session-timeline">
            {sessions.map((session) => (
              <article
                className="client-session-timeline-row"
                key={session.id}
              >
                <div className="client-session-timeline-date">
                  <strong>
                    {formatDate(
                      session.date
                    )}
                  </strong>
                  <span>
                    {t.session} {session.sessionNumber} {isArabic ? "من" : "of"} {session.totalSessions}
                  </span>
                </div>

                <div className="client-session-timeline-dot" />

                <div className="client-session-timeline-content">
                  <h3>
                    {getTreatmentName(
                      session
                    )}
                  </h3>
                  <p>
                    {session.specialist}
                  </p>
                  <small>
                    {getAreas(
                      session.areas || []
                    ).join(" • ")}
                  </small>

                  {session.notes && (
                    <div className="client-session-note-box">
                      {session.notes}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="client-profile-empty-card">
            {t.noSessionsYet}
          </div>
        )}
      </section>

    </main>
  );
}
/* =========================================================
   CREATE TREATMENT PLAN FORM
========================================================= */

function CreateTreatmentPlanForm({
  treatments,
  specialists,
  isArabic,
  t,
  onCancel,
  onSave,
}) {

  const activeTreatments =
    treatments.filter(
      (treatment) =>
        treatment.isActive
    );


  const activeSpecialists =
    specialists.filter(
      (specialist) =>
        specialist.isActive
    );


  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const [
    formData,
    setFormData,
  ] = useState({
    treatmentId: "",
    specialist: "",
    totalSessions: "",
    areas: "",
    startDate: today,
    intervalDays: "",
  });


  const handleTreatmentChange = (
    event
  ) => {
    const treatmentId =
      event.target.value;


    const selectedTreatment =
      activeTreatments.find(
        (treatment) =>
          treatment.id ===
          Number(
            treatmentId
          )
      );


    setFormData(
      (previous) => ({
        ...previous,

        treatmentId:
          treatmentId,

        totalSessions:
          selectedTreatment
            ?.defaultSessions ||
          "",

        intervalDays:
          selectedTreatment
            ?.intervalDays ||
          "",
      })
    );
  };


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,

        [name]:
          value,
      })
    );
  };


  const handleSubmit = (
    event
  ) => {
    event.preventDefault();


    if (
      !formData.treatmentId ||
      !formData.specialist ||
      !formData.totalSessions ||
      !formData.startDate ||
      !formData.intervalDays ||
      !formData.areas.trim()
    ) {
      return;
    }


    onSave(
      formData
    );
  };


  return (
    <section className="treatment-form-card">

      <div className="add-session-header">

        <div>

          <p className="section-label">
            {t.treatmentPlans}
          </p>

          <h2>
            {t.newTreatmentPlan}
          </h2>

        </div>


        <button
          type="button"
          className="session-close-btn"
          onClick={
            onCancel
          }
        >
          ×
        </button>

      </div>


      <form
        onSubmit={
          handleSubmit
        }
      >

        <div className="treatment-form-grid">

          <div className="admin-form-field">

            <label>
              {t.treatment}
            </label>

            <select
              value={
                formData.treatmentId
              }
              onChange={
                handleTreatmentChange
              }
              required
            >

              <option value="">
                {t.chooseTreatment}
              </option>


              {activeTreatments.map(
                (treatment) => (
                  <option
                    key={
                      treatment.id
                    }
                    value={
                      treatment.id
                    }
                  >
                    {isArabic
                      ? treatment.nameAr
                      : treatment.name}
                  </option>
                )
              )}

            </select>

          </div>


          <div className="admin-form-field">

            <label>
              {t.specialist}
            </label>

            <select
              name="specialist"
              value={
                formData.specialist
              }
              onChange={
                handleChange
              }
              required
            >

              <option value="">
                {t.specialist}
              </option>


              {activeSpecialists.map(
                (specialist) => (
                  <option
                    key={
                      specialist.id
                    }
                    value={
                      specialist.name
                    }
                  >
                    {
                      specialist.name
                    }
                  </option>
                )
              )}

            </select>

          </div>


          <div className="admin-form-field">

            <label>
              {t.totalSessions}
            </label>

            <input
              type="number"
              name="totalSessions"
              min="1"
              max="50"
              value={
                formData.totalSessions
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {
                t.suggestedIntervalLabel
              }
            </label>

            <input
              type="number"
              name="intervalDays"
              min="1"
              max="365"
              value={
                formData.intervalDays
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {t.startDate}
            </label>

            <input
              type="date"
              name="startDate"
              value={
                formData.startDate
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          <div className="admin-form-field">

            <label>
              {t.treatmentAreas}
            </label>

            <input
              type="text"
              name="areas"
              value={
                formData.areas
              }
              placeholder={
                t.treatmentAreasHint
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

        </div>


        <div className="add-session-actions">

          <button
            type="button"
            className="admin-secondary-btn"
            onClick={
              onCancel
            }
          >
            {t.cancel}
          </button>


          <button
            type="submit"
            className="admin-primary-btn"
          >
            {t.saveTreatmentPlan}
          </button>

        </div>

      </form>

    </section>
  );
}
/* =========================================================
   ADD SESSION
========================================================= */

function AddSessionForm({
  client,
  t,
  isArabic,
  onCancel,
  onSave,
}) {
  const activePlans =
    client.treatmentPlans.filter(
      (plan) =>
        plan.completedSessions <
        plan.totalSessions
    );


  const [
    formData,
    setFormData,
  ] = useState({
    planId:
      activePlans[0]?.id ||
      "",

    date: "",

    notes: "",
  });


  const [
    dateError,
    setDateError,
  ] = useState("");

const [
  isSaving,
  setIsSaving,
] = useState(false);

  const today =
    getLocalDateString();


  const minimumDate =
    "2000-01-01";


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );


    if (
      name === "date"
    ) {
      setDateError("");
    }
  };

const handleSubmit = async (
  event
) => {
  event.preventDefault();

  setDateError("");

  if (
    !formData.date ||
    formData.date < minimumDate ||
    formData.date > today
  ) {
    setDateError(
      t.invalidSessionDate
    );

    return;
  }

  if (!formData.planId) {
    return;
  }

  if (isSaving) {
    return;
  }

  try {
    setIsSaving(true);

    await onSave(formData);

  } finally {
    setIsSaving(false);
  }
};

  return (
    <section className="add-session-card">

      <div className="add-session-header">

        <div>

          <p className="section-label">
            {t.newSession}
          </p>

          <h2>
            {t.addSession}
          </h2>

        </div>


        <button
          type="button"
          className="session-close-btn"
          onClick={onCancel}
        >
          ×
        </button>

      </div>


      {dateError && (
        <div className="auth-error">
          {dateError}
        </div>
      )}


      <form
        onSubmit={
          handleSubmit
        }
      >

        <div className="add-session-form-grid">

          <div className="admin-form-field">

            <label>
              {t.selectTreatment}
            </label>


            <select
              name="planId"
              value={
                formData.planId
              }
              onChange={
                handleChange
              }
            >

              {activePlans.map(
                (plan) => (
                  <option
                    key={
                      plan.id
                    }
                    value={
                      plan.id
                    }
                  >
                    {isArabic
                      ? plan.treatmentAr
                      : plan.treatment}
                  </option>
                )
              )}

            </select>

          </div>


          <div className="admin-form-field">

            <label>
              {t.sessionDate}
            </label>


            <input
              type="date"
              name="date"
              value={
                formData.date
              }
              min={
                minimumDate
              }
              max={
                today
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

        </div>


        <div className="admin-form-field">

          <label>
            {t.notes}
          </label>


          <textarea
            name="notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            placeholder={
              t.notesPlaceholder
            }
            rows="4"
          />

        </div>


        <div className="add-session-actions">

          <button
            type="button"
            className="admin-secondary-btn"
            onClick={onCancel}
          >
            {t.cancel}
          </button>


    <button
  type="submit"
  className="admin-primary-btn"
  disabled={isSaving}
>
  {isSaving
    ? "Saving session..."
    : t.saveSession}
</button>
        </div>

      </form>

    </section>
  );
}


/* =========================================================
   APPOINTMENT TABLE
========================================================= */

function AppointmentTable({
  appointments,
  isArabic,
  t,
  getStatusText,
  formatDate,
  onOpenAppointment,
}) {
  return (
    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>

            <th>
              {t.appointmentDate}
            </th>

            <th>
              {t.time}
            </th>

            <th>
              {t.client}
            </th>

            <th>
              {t.treatment}
            </th>

            <th>
              {t.specialist}
            </th>

            <th>
              {t.status}
            </th>

            <th></th>

          </tr>

        </thead>


        <tbody>

          {appointments.map(
            (appointment) => (
              <tr
                key={
                  appointment.id
                }
                className="clickable-appointment-row"
                onClick={() =>
                  onOpenAppointment(
                    appointment.id
                  )
                }
              >

                <td>
                  {formatDate(
                    appointment.date
                  )}
                </td>


                <td>
                  {
                    appointment.time
                  }
                </td>


                <td>
                  <strong>
                    {
                      appointment.client
                    }
                  </strong>
                </td>


                <td>
                  {isArabic
                    ? appointment.treatmentAr
                    : appointment.treatment}
                </td>


                <td>
                  {
                    appointment.specialist
                  }
                </td>


                <td>

                  <span
                    className={`admin-status ${appointment.status}`}
                  >
                    {getStatusText(
                      appointment.status
                    )}
                  </span>

                </td>


                <td>

                  <button
                    type="button"
                    className="admin-view-profile-btn"
                    onClick={(
                      event
                    ) => {
                      event.stopPropagation();

                      onOpenAppointment(
                        appointment.id
                      );
                    }}
                  >
                    {t.manage}
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}


/* =========================================================
   CLIENT TABLE
========================================================= */

function ClientTable({
  clients,
  t,
  formatDate,
  getTreatmentName,
  onOpenClient,
}) {
  return (
    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>

            <th>
              {t.client}
            </th>

            <th>
              {t.phone}
            </th>

            <th>
              {t.lastVisit}
            </th>

            <th>
              {t.plan}
            </th>

            <th></th>

          </tr>

        </thead>


        <tbody>

          {clients.map(
            (client) => {
              const mainPlan =
                client.treatmentPlans[0];


              return (
                <tr
                  key={
                    client.id
                  }
                  className="clickable-client-row"
                  onClick={() =>
                    onOpenClient(
                      client.id
                    )
                  }
                >

                  <td>

                    <div className="admin-client-cell">

                      <div className="admin-client-avatar">
                        {client.name.charAt(
                          0
                        )}
                      </div>


                      <strong>
                        {
                          client.name
                        }
                      </strong>

                    </div>

                  </td>


                  <td>
                    {client.phone}
                  </td>


                  <td>
                    {formatDate(
                      client.lastVisit
                    )}
                  </td>


                  <td>

                    {mainPlan && (
                      <div className="admin-plan-cell">

                        <span>
                          {getTreatmentName(
                            mainPlan
                          )}
                        </span>


                        <small>
                          {
                            mainPlan.completedSessions
                          }
                          /
                          {
                            mainPlan.totalSessions
                          }
                        </small>

                      </div>
                    )}

                  </td>


                  <td>

                    <button
                      type="button"
                      className="admin-view-profile-btn"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();

                        onOpenClient(
                          client.id
                        );
                      }}
                    >
                      {t.viewProfile}
                    </button>

                  </td>

                </tr>
              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
}


export default AdminDashboard;