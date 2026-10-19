import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import API_BASE_URL from "../config/api";
/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      specialists: "Specialists",
      booking: "Booking",
      login: "Client Login",
      book: "Book Appointment",
    },
    footerRights: "© 2026 DERMAFLOW. All rights reserved.",
staffLogin: "Staff Login",

    hero: {
      label: "LASER & SKIN CLINIC",
      title1: "Your Skin.",
      title2: "Your Confidence.",
      description:
        "Advanced laser and skin treatments designed around you.",
      book: "Book Appointment",
      explore: "Explore Services",
      image: "Clinic Image",
    },

    services: {
      label: "OUR TREATMENTS",
      title: "Services Designed Around You",
      description:
        "Discover personalized laser and skin treatments designed to help you look and feel your best.",
      button: "Book Treatment",
    },

    why: {
      label: "WHY DERMAFLOW",
      title: "Beauty Meets Expertise",
      description:
        "At DermaFlow, every treatment is designed around your skin, your goals, and your comfort.",
      image: "Clinic / Treatment Image",
    },

    specialists: {
      label: "OUR SPECIALISTS",
      title: "Meet Our Experts",
      description:
        "Professional care from specialists dedicated to your skin, comfort, and results.",
      photo: "Specialist Photo",
      bookWith: "Book with",
    },

    booking: {
      label: "BOOK YOUR VISIT",
      title: "Book Your Appointment",
      description:
        "Choose your treatment and preferred appointment time in just a few simple steps.",

      chooseTreatment: "Choose Your Treatment",
      chooseTreatmentText:
        "Select the service you would like to book.",

      showingTreatments: "Showing treatments by",
      showAll: "Show all treatments",

      chooseSpecialist: "Choose Your Specialist",
      specialistText: "Select a specialist available for",

      chooseDate: "Choose a Date",
      dateText: "Select your preferred appointment date.",
      appointmentDate: "Appointment date",

      chooseTime: "Choose a Time",
      availableFor: "Available appointments for",
      noAppointments:
        "No appointments are available on this day. Please go back and choose another date.",

      yourInfo: "Your Information",
      infoText:
        "Enter your details to complete your booking.",

      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",

      phone: "Phone Number",
      phonePlaceholder: "07XXXXXXXX or +962...",
      invalidPhone:
        "Enter a valid Jordanian mobile number, such as 0791234567 or +962791234567.",

      email: "Email (optional)",
      emailPlaceholder: "name@email.com",
      invalidEmail: "Enter a valid email address.",

      continue: "Continue",
      back: "Back",
      review: "Review Booking",

      reviewTitle: "Review Your Appointment",
      reviewText: "Please confirm your appointment details.",

      treatment: "Treatment",
      specialist: "Specialist",
      date: "Date",
      time: "Time",
      patient: "Patient",
      phoneLabel: "Phone",
      emailLabel: "Email",

      confirm: "Confirm Appointment",
   confirming: "Saving your appointment...",

      successTitle: "Appointment Confirmed!",
      successStart: "Thank you",
      successMiddle: "Your appointment with",
      successFor: "for",
      successEnd: "has been received.",

      another: "Book another appointment",

      submitError:
        "Something went wrong. Please try again.",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      about: "من نحن",
      specialists: "الأخصائيات",
      booking: "الحجز",
      login: "دخول العميلات",
      book: "احجزي موعد",
    },
    footerRights: "© 2026 DERMAFLOW. جميع الحقوق محفوظة.",
staffLogin: "دخول الموظفات",

    hero: {
      label: "عيادة الليزر والعناية بالبشرة",
      title1: "بشرتك.",
      title2: "ثقتك.",
      description:
        "علاجات متقدمة لليزر والعناية بالبشرة مصممة لتناسب احتياجاتك.",
      book: "احجزي موعد",
      explore: "تصفحي الخدمات",
      image: "صورة العيادة",
    },

    services: {
      label: "علاجاتنا",
      title: "خدمات مصممة لتناسبك",
      description:
        "اكتشفي علاجات الليزر والبشرة المصممة بعناية لمساعدتك على الحصول على أفضل النتائج.",
      button: "احجزي العلاج",
    },

    why: {
      label: "لماذا ديرما فلو",
      title: "الجمال يلتقي بالخبرة",
      description:
        "في ديرما فلو، يتم تصميم كل علاج بما يتناسب مع بشرتك وأهدافك وراحتك.",
      image: "صورة العيادة / العلاج",
    },

    specialists: {
      label: "أخصائياتنا",
      title: "تعرّفي على فريقنا",
      description:
        "رعاية متخصصة من فريق يهتم ببشرتك وراحتك ونتائجك.",
      photo: "صورة الأخصائية",
      bookWith: "احجزي مع",
    },

    booking: {
      label: "احجزي زيارتك",
      title: "احجزي موعدك",
      description:
        "اختاري العلاج والموعد المناسب لك بخطوات بسيطة.",

      chooseTreatment: "اختاري العلاج",
      chooseTreatmentText:
        "اختاري الخدمة التي ترغبين بحجزها.",

      showingTreatments: "يتم عرض علاجات",
      showAll: "عرض جميع العلاجات",

      chooseSpecialist: "اختاري الأخصائية",
      specialistText: "اختاري الأخصائية المتاحة لخدمة",

      chooseDate: "اختاري التاريخ",
      dateText: "اختاري تاريخ الموعد المناسب لك.",
      appointmentDate: "تاريخ الموعد",

      chooseTime: "اختاري الوقت",
      availableFor: "المواعيد المتاحة بتاريخ",
      noAppointments:
        "لا توجد مواعيد متاحة في هذا اليوم. الرجاء الرجوع واختيار تاريخ آخر.",

      yourInfo: "بياناتك",
      infoText:
        "أدخلي معلوماتك لإكمال الحجز.",

      fullName: "الاسم الكامل",
      fullNamePlaceholder: "أدخلي الاسم الكامل",

      phone: "رقم الهاتف",
      phonePlaceholder: "07XXXXXXXX أو +962...",
      invalidPhone:
        "أدخلي رقم هاتف أردني صحيح مثل 0791234567 أو +962791234567.",

      email: "البريد الإلكتروني (اختياري)",
      emailPlaceholder: "name@email.com",
      invalidEmail:
        "أدخلي بريدًا إلكترونيًا صحيحًا.",

      continue: "متابعة",
      back: "رجوع",
      review: "مراجعة الحجز",

      reviewTitle: "راجعي تفاصيل الموعد",
      reviewText:
        "تأكدي من تفاصيل الموعد قبل التأكيد.",

      treatment: "العلاج",
      specialist: "الأخصائية",
      date: "التاريخ",
      time: "الوقت",
      patient: "العميلة",
      phoneLabel: "رقم الهاتف",
      emailLabel: "البريد الإلكتروني",

      confirm: "تأكيد الموعد",
    confirming: "جارٍ حفظ موعدك...",

      successTitle: "تم تأكيد الموعد!",
      successStart: "شكرًا",
      successMiddle: "تم استلام طلب موعدك مع",
      successFor: "لخدمة",
      successEnd: ".",

      another: "حجز موعد آخر",

      submitError:
        "حدث خطأ. يرجى المحاولة مرة أخرى.",
    },
  },
};

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    id: 1,
    title: "Laser Hair Removal",
    titleAr: "إزالة الشعر بالليزر",
    description:
      "Advanced laser technology for smooth, long-lasting results.",
    descriptionAr:
      "تقنيات ليزر متقدمة للحصول على نتائج ناعمة وطويلة الأمد.",
  },
  {
    id: 2,
    title: "Hydrafacial",
    titleAr: "هيدرافيشل",
    description:
      "Deep cleansing, hydration and rejuvenation for glowing skin.",
    descriptionAr:
      "تنظيف عميق وترطيب وتجديد لبشرة أكثر نضارة.",
  },
  {
    id: 3,
    title: "Skin Rejuvenation",
    titleAr: "تجديد البشرة",
    description:
      "Personalized treatments designed to refresh and renew your skin.",
    descriptionAr:
      "علاجات مخصصة لتجديد البشرة واستعادة نضارتها.",
  },
  {
    id: 4,
    title: "Acne Treatment",
    titleAr: "علاج حب الشباب",
    description:
      "Targeted skin treatments to help reduce acne and improve skin texture.",
    descriptionAr:
      "علاجات مخصصة للمساعدة في تقليل حب الشباب وتحسين ملمس البشرة.",
  },
  {
    id: 5,
    title: "Pigmentation Treatment",
    titleAr: "علاج التصبغات",
    description:
      "Advanced solutions for uneven skin tone and pigmentation concerns.",
    descriptionAr:
      "حلول متقدمة للتصبغات وتفاوت لون البشرة.",
  },
  {
    id: 6,
    title: "Deep Cleansing Facial",
    titleAr: "تنظيف عميق للبشرة",
    description:
      "A refreshing facial treatment for cleaner, healthier-looking skin.",
    descriptionAr:
      "جلسة تنظيف عميق لبشرة أنظف وأكثر صحة ونضارة.",
  },
];


/* =========================================================
   WHY DERMAFLOW
========================================================= */

const whyPoints = [
  {
    title: "Advanced Technology",
    titleAr: "تقنيات متقدمة",
    text: "Modern laser and skin treatment technologies.",
    textAr:
      "تقنيات حديثة ومتقدمة في علاجات الليزر والبشرة.",
  },
  {
    title: "Personalized Care",
    titleAr: "عناية مخصصة",
    text: "Treatment plans tailored to each client's needs.",
    textAr:
      "خطط علاج مصممة لتناسب احتياجات كل عميلة.",
  },
  {
    title: "Professional Specialists",
    titleAr: "أخصائيات محترفات",
    text: "Experienced specialists focused on safe, quality care.",
    textAr:
      "فريق متخصص يركز على تقديم رعاية آمنة وعالية الجودة.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const initialBooking = {
  service: "",
  specialist: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
};

const PHONE_REGEX = /^07[789]\d{7}$/;

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(value) {
  let p = value.replace(/[\s\-()]/g, "");

  if (p.startsWith("+962")) {
    p = "0" + p.slice(4);
  } else if (p.startsWith("00962")) {
    p = "0" + p.slice(5);
  } else if (p.startsWith("962")) {
    p = "0" + p.slice(3);
  } else if (/^7[789]\d{7}$/.test(p)) {
    p = "0" + p;
  }

  return p;
}

function getTodayString() {
  const now = new Date();

  return new Date(
    now.getTime() -
      now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
}

/* =========================================================
   HOME
========================================================= */

function Home({
  language,
  toggleLanguage,
  specialists = [],
  appointments = [],
  setAppointments,
   clients = [],
  setClients,
}) {
  const isArabic = language === "ar";

  const t =
    translations[language] ||
    translations.en;

  /* NAVBAR */

  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* BOOKING */

  const [bookingStep, setBookingStep] =
    useState(1);

  const [booking, setBooking] =
    useState(initialBooking);

  const [
    bookingComplete,
    setBookingComplete,
  ] = useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  /* =========================================================
     BOOKING HELPERS
  ========================================================= */

  const updateBooking = (
    field,
    value
  ) => {
    setBooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectService = (
    serviceTitle
  ) => {
    setBooking((prev) => {
      const selectedService =
        services.find(
          (service) =>
            service.title ===
            serviceTitle
        );

      const currentSpecialist =
        specialists.find(
          (specialist) =>
            specialist.name ===
            prev.specialist
        );

      const keepSpecialist =
        currentSpecialist &&
        selectedService &&
        currentSpecialist.services.includes(
          selectedService.id
        );

      return {
        ...prev,

        service: serviceTitle,

        specialist:
          keepSpecialist
            ? prev.specialist
            : "",

        date: "",
        time: "",
      };
    });
  };

  const selectSpecialist = (
    specialistName
  ) => {
    setBooking((prev) => ({
      ...prev,

      specialist:
        specialistName,

      date: "",
      time: "",
    }));
  };

  const selectDate = (date) => {
    setBooking((prev) => ({
      ...prev,
      date,
      time: "",
    }));
  };

  const startWithService = (
    serviceTitle
  ) => {
    setBookingComplete(false);

    setBooking({
      ...initialBooking,
      service: serviceTitle,
    });

    setBookingStep(2);
  };

  const startWithSpecialist = (
    specialistName
  ) => {
    setBookingComplete(false);

    setBooking({
      ...initialBooking,
      specialist:
        specialistName,
    });

    setBookingStep(1);
  };

  const clearSpecialist = () => {
    setBooking((prev) => ({
      ...prev,
      specialist: "",
      date: "",
      time: "",
    }));
  };

  const nextStep = () => {
    setBookingStep((step) =>
      Math.min(step + 1, 6)
    );
  };

  const previousStep = () => {
    setBookingStep((step) =>
      Math.max(step - 1, 1)
    );
  };

  const resetBooking = () => {
    setBooking(initialBooking);

    setBookingStep(1);

    setBookingComplete(false);

    setSubmitError("");
  };
const confirmBooking = async () => {
  setSubmitting(true);

  setSubmitError("");


  try {

    const selectedServiceForBooking =
      services.find(
        (service) =>
          service.title ===
          booking.service
      );


    const selectedSpecialistForBooking =
      specialists.find(
        (specialist) =>
          specialist.name ===
          booking.specialist
      );


    if (
      !selectedServiceForBooking ||
      !selectedSpecialistForBooking ||
      !booking.date ||
      !booking.time
    ) {
      throw new Error(
        "Missing booking information."
      );
    }


    const normalizedPhone =
      normalizePhone(
        booking.phone
      );


    /* =====================================================
       STEP 1: CREATE OR FIND CLIENT
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
              booking.name.trim(),

            email:
              booking.email.trim(),

            phone:
              normalizedPhone,
          }),
        }
      );


    const clientData =
      await clientResponse.json();


    if (!clientResponse.ok) {
      throw new Error(
        clientData.message ||
        "Failed to save client."
      );
    }


    const savedClient =
      clientData.client;


    /* =====================================================
       STEP 2: CREATE APPOINTMENT
    ===================================================== */

    const appointmentResponse =
      await fetch(
        `${API_BASE_URL}/appointments`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            clientId:
              savedClient.id,

            treatmentId:
              selectedServiceForBooking.id,

            specialistId:
              selectedSpecialistForBooking.id,

            date:
              booking.date,

            time:
              booking.time,

            status:
              "pending",

            source:
              "website",
          }),
        }
      );


    const appointmentData =
      await appointmentResponse.json();


    /* Slot was booked by someone else. */

    if (
      appointmentResponse.status ===
      409
    ) {

      setSubmitError(
        isArabic
          ? "عذرًا، تم حجز هذا الموعد للتو. الرجاء اختيار وقت آخر."
          : "Sorry, this appointment was just booked. Please choose another time."
      );


      setBookingStep(4);

      return;
    }


    if (!appointmentResponse.ok) {
      throw new Error(
        appointmentData.message ||
        "Failed to save appointment."
      );
    }


    /* =====================================================
       KEEP CURRENT FRONTEND STATE UPDATED
    ===================================================== */

    const newAppointment = {
      id:
        appointmentData
          .appointment.id,

      clientId:
        savedClient.id,

      client:
        booking.name.trim(),

      phone:
        normalizedPhone,

      email:
        booking.email.trim(),

      treatment:
        selectedServiceForBooking.title,

      treatmentAr:
        selectedServiceForBooking.titleAr,

      specialist:
        selectedSpecialistForBooking.name,

      date:
        booking.date,

      time:
        booking.time,

      status:
        "pending",

      source:
        "website",
    };


    setAppointments(
      (previousAppointments) => [
        newAppointment,
        ...previousAppointments,
      ]
    );


    /* Keep the current Clients UI working. */

    setClients(
      (previousClients) => {

        const existingClient =
          previousClients.find(
            (client) =>
              normalizePhone(
                client.phone
              ) ===
              normalizedPhone
          );


        const nextAppointment = {
          date:
            booking.date,

          time:
            booking.time,

          treatment:
            selectedServiceForBooking.title,

          treatmentAr:
            selectedServiceForBooking.titleAr,

          specialist:
            selectedSpecialistForBooking.name,

          reminderEnabled:
            true,

          reminderSent:
            false,
        };


        if (existingClient) {

          return previousClients.map(
            (client) =>
              client.id ===
              existingClient.id
                ? {
                    ...client,

                    name:
                      booking.name.trim(),

                    email:
                      booking.email.trim() ||
                      client.email,

                    nextAppointment:
                      nextAppointment,
                  }
                : client
          );
        }


        const newClient = {
          id:
            savedClient.id,

          name:
            booking.name.trim(),

          email:
            booking.email.trim(),

          phone:
            normalizedPhone,

          lastVisit:
            "",

          nextAppointment:
            nextAppointment,

          treatmentPlans:
            [],

          sessionHistory:
            [],
        };


        return [
          newClient,
          ...previousClients,
        ];
      }
    );


    setBookingComplete(true);

  } catch (error) {

    console.error(
      "Booking error:",
      error
    );


    setSubmitError(
      isArabic
        ? "حدث خطأ أثناء حفظ الحجز. الرجاء المحاولة مرة أخرى."
        : "Something went wrong while saving your booking. Please try again."
    );

  } finally {

    setSubmitting(false);

  }
};

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const selectedService =
    services.find(
      (service) =>
        service.title ===
        booking.service
    );

  const selectedSpecialist =
    specialists.find(
      (specialist) =>
        specialist.name ===
        booking.specialist
    );

  const availableServices =
    selectedSpecialist
      ? services.filter((service) =>
          selectedSpecialist.services.includes(
            service.id
          )
        )
      : services;

  const filteredSpecialists =
    selectedService
      ? specialists.filter(
          (specialist) =>
            specialist.services.includes(
              selectedService.id
            )
        )
      : [];

 let availableTimeSlots = [];

if (
  booking.date &&
  selectedSpecialist
) {
  const dayNumber =
    new Date(
      `${booking.date}T00:00:00`
    ).getDay();

  const specialistSchedule =
    selectedSpecialist.schedule[
      dayNumber
    ] || [];

  /* Get booked times for this specialist and date. */

  const bookedTimes =
    appointments
      .filter(
        (appointment) =>
          appointment.specialist ===
            selectedSpecialist.name &&
          appointment.date ===
            booking.date &&
          appointment.status !==
            "cancelled"
      )
      .map(
        (appointment) =>
          appointment.time
      );

  /* Remove booked times from the available schedule. */

  availableTimeSlots =
    specialistSchedule.filter(
      (time) =>
        !bookedTimes.includes(
          time
        )
    );
}

const phoneValid =
  PHONE_REGEX.test(
    normalizePhone(
      booking.phone
    )
  );

  const emailValid =
    !booking.email ||
    EMAIL_REGEX.test(
      booking.email
    );

    
  const infoValid =
    booking.name.trim().length >=
      2 &&
    phoneValid &&
    emailValid;

  /* Helpers for bilingual data */

  const getServiceTitle = (
    service
  ) =>
    isArabic
      ? service.titleAr
      : service.title;

  const getServiceDescription = (
    service
  ) =>
    isArabic
      ? service.descriptionAr
      : service.description;

  const getSpecialty = (
    specialist
  ) =>
    isArabic
      ? specialist.specialtyAr
      : specialist.specialty;

  const bookingService =
    services.find(
      (service) =>
        service.title ===
        booking.service
    );

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
      lang={language}
    >
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <a
          href="#home"
          className="logo"
          onClick={
            closeMenu
          }
        >
          DERMA
          <span>
            FLOW
          </span>
        </a>

        <div
          className={`nav-links ${
            menuOpen
              ? "open"
              : ""
          }`}
        >
          <a
            href="#home"
            onClick={
              closeMenu
            }
          >
            {t.nav.home}
          </a>

          <a
            href="#services"
            onClick={
              closeMenu
            }
          >
            {t.nav.services}
          </a>

          <a
            href="#about"
            onClick={
              closeMenu
            }
          >
            {t.nav.about}
          </a>

          <a
            href="#specialists"
            onClick={
              closeMenu
            }
          >
            {t.nav.specialists}
          </a>

          <a
            href="#booking"
            onClick={
              closeMenu
            }
          >
            {t.nav.booking}
          </a>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="language-btn"
            onClick={
              toggleLanguage
            }
          >
            {language === "en"
              ? "العربية"
              : "English"}
          </button>

          <Link
            to="/login"
            className="client-login-link"
          >
            {t.nav.login}
          </Link>

          <a
            href="#booking"
            className="book-btn"
          >
            {t.nav.book}
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          aria-label="Toggle menu"
          aria-expanded={
            menuOpen
          }
        >
          {menuOpen
            ? "✕"
            : "☰"}
        </button>
      </nav>

      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
      >
        <div className="hero-content">
          <p className="small-title">
            {t.hero.label}
          </p>

          <h1>
            {t.hero.title1}

            <br />

            {t.hero.title2}
          </h1>

          <p className="hero-description">
            {t.hero.description}
          </p>

          <div className="hero-buttons">
            <a
              href="#booking"
              className="primary-btn"
            >
              {t.hero.book}
            </a>

            <a
              href="#services"
              className="secondary-btn"
            >
              {t.hero.explore}
            </a>
          </div>
        </div>
<div className="hero-image">
  <img
    src="/images/Treatment_Room.png"
    alt="DermaFlow treatment room"
    className="hero-clinic-photo"
  />
</div>
      </section>

      {/* ================= SERVICES ================= */}

      <section
        className="services-section"
        id="services"
      >
        <div className="section-heading">
          <p className="section-label">
            {t.services.label}
          </p>

          <h2>
            {t.services.title}
          </h2>

          <p className="section-description">
            {
              t.services
                .description
            }
          </p>
        </div>

      <div className="services-grid">
  {services.map((service) => (
    <div
      className="service-card"
      key={service.id}
    >
      <div className="service-image">
        <img
          src={
            {
              1: "/images/Laser_Hair_Removal.png",
              2: "/images/Hydrafacial.png",
              3: "/images/Skin_Rejuvenation.png",
              4: "/images/Acne_Treatment.png",
              5: "/images/Pigmentation_Treatment.png",
              6: "/images/Deep_Cleansing_Facial.png",
            }[service.id]
          }
          alt={getServiceTitle(service)}
          className="service-photo"
        />
      </div>

      {/* Keep the existing service content below */}

                <div className="service-content">
                  <h3>
                    {getServiceTitle(
                      service
                    )}
                  </h3>

                  <p>
                    {getServiceDescription(
                      service
                    )}
                  </p>

                  <a
                    href="#booking"
                    className="service-link"
                    onClick={() =>
                      startWithService(
                        service.title
                      )
                    }
                  >
                    {
                      t.services
                        .button
                    }

                    <span>
                      →
                    </span>
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= WHY ================= */}

      <section
        className="why-section"
        id="about"
      >
        <div className="why-container">
          <div className="why-text">
            <p className="section-label">
              {t.why.label}
            </p>

            <h2>
              {t.why.title}
            </h2>

            <p>
              {
                t.why
                  .description
              }
            </p>

            <div className="why-points">
              {whyPoints.map(
                (
                  point,
                  index
                ) => (
                  <div
                    className="why-item"
                    key={
                      point.title
                    }
                  >
                    <span>
                      0
                      {index +
                        1}
                    </span>

                    <div>
                      <h3>
                        {isArabic
                          ? point.titleAr
                          : point.title}
                      </h3>

                      <p>
                        {isArabic
                          ? point.textAr
                          : point.text}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="why-image">
            <div className="why-image-placeholder">
              {t.why.image}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIALISTS ================= */}

      <section
        className="specialists-section"
        id="specialists"
      >
        <div className="section-heading">
          <p className="section-label">
            {
              t.specialists
                .label
            }
          </p>

          <h2>
            {
              t.specialists
                .title
            }
          </h2>

          <p className="section-description">
            {
              t.specialists
                .description
            }
          </p>
        </div>

        <div className="specialists-grid">
          {specialists.map(
            (specialist) => (
              <div
                className="specialist-card"
                key={
                  specialist.id
                }
              >
           <div className="specialist-image">
  <img
    src={
      {
        1: "/images/Dr_Lina_Ahmad.png",
        2: "/images/Dr_Sara_Khalil.png",
        3: "/images/Dr_Maya_Ali.png",
      }[specialist.id]
    }
    alt={specialist.name}
    className="specialist-photo"
  />
</div>

                <div className="specialist-info">
                  <h3>
                    {
                      specialist.name
                    }
                  </h3>

                  <p>
                    {getSpecialty(
                      specialist
                    )}
                  </p>

                  <a
                    href="#booking"
                    onClick={() =>
                      startWithSpecialist(
                        specialist.name
                      )
                    }
                  >
                    {
                      t.specialists
                        .bookWith
                    }{" "}
                    {
                      specialist.name
                    }{" "}
                    →
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= BOOKING ================= */}

      <section
        className="booking-section"
        id="booking"
      >
        <div className="section-heading">
          <p className="section-label">
            {
              t.booking
                .label
            }
          </p>

          <h2>
            {
              t.booking
                .title
            }
          </h2>

          <p className="section-description">
            {
              t.booking
                .description
            }
          </p>
        </div>

        <div className="booking-container">
          {!bookingComplete ? (
            <>
              {/* PROGRESS */}

              <div className="booking-progress">
                {[
                  1, 2, 3, 4, 5,
                  6,
                ].map(
                  (step) => (
                    <div
                      key={
                        step
                      }
                      className={`progress-step ${
                        bookingStep >=
                        step
                          ? "active"
                          : ""
                      }`}
                    >
                      {
                        step
                      }
                    </div>
                  )
                )}
              </div>

              {/* ================= STEP 1 ================= */}

              {bookingStep ===
                1 && (
                <div className="booking-step">
                  <h3>
                    {
                      t.booking
                        .chooseTreatment
                    }
                  </h3>

                  <p>
                    {
                      t.booking
                        .chooseTreatmentText
                    }
                  </p>

                  {booking.specialist && (
                    <p className="booking-note">
                      {
                        t.booking
                          .showingTreatments
                      }{" "}

                      <strong>
                        {
                          booking.specialist
                        }
                      </strong>

                      .{" "}

                      <button
                        type="button"
                        className="link-btn"
                        onClick={
                          clearSpecialist
                        }
                      >
                        {
                          t.booking
                            .showAll
                        }
                      </button>
                    </p>
                  )}

                  <div className="booking-options">
                    {availableServices.map(
                      (
                        service
                      ) => (
                        <button
                          key={
                            service.id
                          }
                          type="button"
                          className={`booking-option ${
                            booking.service ===
                            service.title
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            selectService(
                              service.title
                            )
                          }
                        >
                          <span>
                            {getServiceTitle(
                              service
                            )}
                          </span>

                          <small>
                            {getServiceDescription(
                              service
                            )}
                          </small>
                        </button>
                      )
                    )}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="next-btn"
                      disabled={
                        !booking.service
                      }
                      onClick={
                        nextStep
                      }
                    >
                      {
                        t.booking
                          .continue
                      }{" "}
                      →
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 2 ================= */}

              {bookingStep ===
                2 && (
                <div className="booking-step">
                  <h3>
                    {
                      t.booking
                        .chooseSpecialist
                    }
                  </h3>

                  <p>
                    {
                      t.booking
                        .specialistText
                    }{" "}

                    {bookingService
                      ? getServiceTitle(
                          bookingService
                        )
                      : ""}
                    .
                  </p>

                  <div className="booking-options">
                    {filteredSpecialists.map(
                      (
                        specialist
                      ) => (
                        <button
                          key={
                            specialist.id
                          }
                          type="button"
                          className={`booking-option ${
                            booking.specialist ===
                            specialist.name
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            selectSpecialist(
                              specialist.name
                            )
                          }
                        >
                          <span>
                            {
                              specialist.name
                            }
                          </span>

                          <small>
                            {getSpecialty(
                              specialist
                            )}
                          </small>
                        </button>
                      )
                    )}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={
                        previousStep
                      }
                    >
                      ←{" "}
                      {
                        t.booking
                          .back
                      }
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={
                        !booking.specialist
                      }
                      onClick={
                        nextStep
                      }
                    >
                      {
                        t.booking
                          .continue
                      }{" "}
                      →
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3 ================= */}

              {bookingStep ===
                3 && (
                <div className="booking-step">
                  <h3>
                    {
                      t.booking
                        .chooseDate
                    }
                  </h3>

                  <p>
                    {
                      t.booking
                        .dateText
                    }
                  </p>

                  <label
                    htmlFor="booking-date"
                    className="sr-only"
                  >
                    {
                      t.booking
                        .appointmentDate
                    }
                  </label>

                  <input
                    id="booking-date"
                    className="date-input"
                    type="date"
                    value={
                      booking.date
                    }
                    min={getTodayString()}
                    onChange={(
                      event
                    ) =>
                      selectDate(
                        event
                          .target
                          .value
                      )
                    }
                  />

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={
                        previousStep
                      }
                    >
                      ←{" "}
                      {
                        t.booking
                          .back
                      }
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={
                        !booking.date
                      }
                      onClick={
                        nextStep
                      }
                    >
                      {
                        t.booking
                          .continue
                      }{" "}
                      →
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 4 ================= */}

              {bookingStep ===
                4 && (
                <div className="booking-step">
                  <h3>
                    {
                      t.booking
                        .chooseTime
                    }
                  </h3>

                  <p>
                    {
                      t.booking
                        .availableFor
                    }{" "}
                    {
                      booking.date
                    }
                  </p>

                  <div className="time-grid">
                    {availableTimeSlots.length >
                    0 ? (
                      availableTimeSlots.map(
                        (
                          time
                        ) => (
                          <button
                            key={
                              time
                            }
                            type="button"
                            className={`time-slot ${
                              booking.time ===
                              time
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              updateBooking(
                                "time",
                                time
                              )
                            }
                          >
                            {
                              time
                            }
                          </button>
                        )
                      )
                    ) : (
                      <div className="no-appointments">
                        {
                          t.booking
                            .noAppointments
                        }
                      </div>
                    )}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={
                        previousStep
                      }
                    >
                      ←{" "}
                      {
                        t.booking
                          .back
                      }
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={
                        !booking.time
                      }
                      onClick={
                        nextStep
                      }
                    >
                      {
                        t.booking
                          .continue
                      }{" "}
                      →
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 5 ================= */}

              {bookingStep ===
                5 && (
                <div className="booking-step">
                  <h3>
                    {
                      t.booking
                        .yourInfo
                    }
                  </h3>

                  <p>
                    {
                      t.booking
                        .infoText
                    }
                  </p>

                  <div className="patient-form">
                    <div>
                      <label htmlFor="patient-name">
                        {
                          t.booking
                            .fullName
                        }
                      </label>

                      <input
                        id="patient-name"
                        type="text"
                        autoComplete="name"
                        placeholder={
                          t.booking
                            .fullNamePlaceholder
                        }
                        value={
                          booking.name
                        }
                        onChange={(
                          event
                        ) =>
                          updateBooking(
                            "name",
                            event
                              .target
                              .value
                          )
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="patient-phone">
                        {
                          t.booking
                            .phone
                        }
                      </label>

                      <input
                        id="patient-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={
                          t.booking
                            .phonePlaceholder
                        }
                        value={
                          booking.phone
                        }
                        onChange={(
                          event
                        ) =>
                          updateBooking(
                            "phone",
                            event
                              .target
                              .value
                          )
                        }
                      />

                      {booking.phone &&
                        !phoneValid && (
                          <small className="field-error">
                            {
                              t.booking
                                .invalidPhone
                            }
                          </small>
                        )}
                    </div>

                    <div>
                      <label htmlFor="patient-email">
                        {
                          t.booking
                            .email
                        }
                      </label>

                      <input
                        id="patient-email"
                        type="email"
                        autoComplete="email"
                        placeholder={
                          t.booking
                            .emailPlaceholder
                        }
                        value={
                          booking.email
                        }
                        onChange={(
                          event
                        ) =>
                          updateBooking(
                            "email",
                            event
                              .target
                              .value
                          )
                        }
                      />

                      {booking.email &&
                        !emailValid && (
                          <small className="field-error">
                            {
                              t.booking
                                .invalidEmail
                            }
                          </small>
                        )}
                    </div>
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={
                        previousStep
                      }
                    >
                      ←{" "}
                      {
                        t.booking
                          .back
                      }
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={
                        !infoValid
                      }
                      onClick={
                        nextStep
                      }
                    >
                      {
                        t.booking
                          .review
                      }{" "}
                      →
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 6 ================= */}

              {bookingStep ===
                6 && (
                <div className="booking-step">
                  <h3>
                    {
                      t.booking
                        .reviewTitle
                    }
                  </h3>

                  <p>
                    {
                      t.booking
                        .reviewText
                    }
                  </p>

                  <div className="booking-summary">
                    <div>
                      <span>
                        {
                          t.booking
                            .treatment
                        }
                      </span>

                      <strong>
                        {bookingService
                          ? getServiceTitle(
                              bookingService
                            )
                          : ""}
                      </strong>
                    </div>

                    <div>
                      <span>
                        {
                          t.booking
                            .specialist
                        }
                      </span>

                      <strong>
                        {
                          booking.specialist
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        {
                          t.booking
                            .date
                        }
                      </span>

                      <strong>
                        {
                          booking.date
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        {
                          t.booking
                            .time
                        }
                      </span>

                      <strong>
                        {
                          booking.time
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        {
                          t.booking
                            .patient
                        }
                      </span>

                      <strong>
                        {
                          booking.name
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        {
                          t.booking
                            .phoneLabel
                        }
                      </span>

                      <strong>
                        {normalizePhone(
                          booking.phone
                        )}
                      </strong>
                    </div>

                    {booking.email && (
                      <div>
                        <span>
                          {
                            t.booking
                              .emailLabel
                          }
                        </span>

                        <strong>
                          {
                            booking.email
                          }
                        </strong>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <p
                      className="field-error"
                      role="alert"
                    >
                      {
                        submitError
                      }
                    </p>
                  )}

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={
                        previousStep
                      }
                      disabled={
                        submitting
                      }
                    >
                      ←{" "}
                      {
                        t.booking
                          .back
                      }
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      onClick={
                        confirmBooking
                      }
                      disabled={
                        submitting
                      }
                    >
                      {submitting
                        ? t.booking
                            .confirming
                        : t.booking
                            .confirm}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ================= SUCCESS ================= */

            <div className="booking-success">
              <div className="success-icon">
                ✓
              </div>

              <h3>
                {
                  t.booking
                    .successTitle
                }
              </h3>

              <p>
                {
                  t.booking
                    .successStart
                }{" "}
                {booking.name}.{" "}

                {
                  t.booking
                    .successMiddle
                }{" "}

                {
                  booking.specialist
                }{" "}

                {
                  t.booking
                    .successFor
                }{" "}

                {bookingService
                  ? getServiceTitle(
                      bookingService
                    )
                  : booking.service}{" "}

                {
                  t.booking
                    .successEnd
                }
              </p>

              <strong>
                {booking.date} •{" "}
                {booking.time}
              </strong>

              <div className="booking-actions center">
                <button
                  type="button"
                  className="back-btn"
                  onClick={
                    resetBooking
                  }
                >
                  {
                    t.booking
                      .another
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
  {/* =========================================================
    FOOTER
    Contains copyright information and staff access.
========================================================= */}

<footer className="site-footer">

  <div className="footer-logo">
    DERMA<span>FLOW</span>
  </div>

  <p>
    {t.footerRights}
  </p>

  <a
    href="/staff-login"
    className="staff-login-link"
  >
    {t.staffLogin}
  </a>

</footer>
    </div>
  );
}

export default Home;