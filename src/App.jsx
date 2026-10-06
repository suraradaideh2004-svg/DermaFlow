import { useState } from "react";
import "./App.css";

/* ================= DATA ================= */

const services = [
  { id: 1, title: "Laser Hair Removal", description: "Advanced laser technology for smooth, long-lasting results." },
  { id: 2, title: "Hydrafacial", description: "Deep cleansing, hydration and rejuvenation for glowing skin." },
  { id: 3, title: "Skin Rejuvenation", description: "Personalized treatments designed to refresh and renew your skin." },
  { id: 4, title: "Acne Treatment", description: "Targeted skin treatments to help reduce acne and improve skin texture." },
  { id: 5, title: "Pigmentation Treatment", description: "Advanced solutions for uneven skin tone and pigmentation concerns." },
  { id: 6, title: "Deep Cleansing Facial", description: "A refreshing facial treatment for cleaner, healthier-looking skin." },
];

// schedule: 0 = Sunday ... 6 = Saturday
const specialists = [
  {
    id: 1,
    name: "Dr. Lina Ahmad",
    specialty: "Dermatology & Skin Care",
    services: [2, 3, 4, 5, 6],
    schedule: {
      0: [],
      1: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
      2: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM"],
      3: ["09:00 AM", "10:00 AM", "01:00 PM", "04:00 PM"],
      4: ["10:00 AM", "11:00 AM", "02:00 PM"],
      5: [],
      6: ["09:00 AM", "11:00 AM", "01:00 PM"],
    },
  },
  {
    id: 2,
    name: "Dr. Sara Khalil",
    specialty: "Laser Specialist",
    services: [1, 3, 5],
    schedule: {
      0: ["10:00 AM", "11:00 AM", "02:00 PM"],
      1: ["09:00 AM", "10:00 AM", "12:00 PM", "03:00 PM"],
      2: [],
      3: ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      4: ["09:00 AM", "12:00 PM", "03:00 PM"],
      5: [],
      6: ["10:00 AM", "01:00 PM", "04:00 PM"],
    },
  },
  {
    id: 3,
    name: "Dr. Maya Ali",
    specialty: "Facial & Skin Treatments",
    services: [2, 3, 4, 6],
    schedule: {
      0: ["11:00 AM", "12:00 PM", "03:00 PM"],
      1: ["10:00 AM", "11:00 AM", "02:00 PM"],
      2: ["09:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
      3: [],
      4: ["10:00 AM", "01:00 PM", "04:00 PM"],
      5: [],
      6: ["09:00 AM", "11:00 AM", "02:00 PM"],
    },
  },
];

const whyPoints = [
  { title: "Advanced Technology", text: "Modern laser and skin treatment technologies." },
  { title: "Personalized Care", text: "Treatment plans tailored to each client's needs." },
  { title: "Professional Specialists", text: "Experienced specialists focused on safe, quality care." },
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#specialists", label: "Specialists" },
  { href: "#booking", label: "Booking" },
];

/* ================= HELPERS ================= */

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
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// يقبل: 0778407622 | +962778407622 | 00962778407622 | 962778407622 | 778407622
function normalizePhone(value) {
  let p = value.replace(/[\s\-()]/g, "");

  if (p.startsWith("+962")) p = "0" + p.slice(4);
  else if (p.startsWith("00962")) p = "0" + p.slice(5);
  else if (p.startsWith("962")) p = "0" + p.slice(3);
  else if (/^7[789]\d{7}$/.test(p)) p = "0" + p;

  return p;
}

// تاريخ اليوم بتوقيت الجهاز (بدون مشكلة UTC)
function getTodayString() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

/* ================= APP ================= */

function App() {
  /* NAVBAR */
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  /* BOOKING STATE */
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState(initialBooking);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /* ================= BOOKING HELPERS ================= */

  const updateBooking = (field, value) =>
    setBooking((prev) => ({ ...prev, [field]: value }));

  // اختيار خدمة: بنحافظ على الأخصائي إذا بيقدم هالخدمة
  const selectService = (serviceTitle) =>
    setBooking((prev) => {
      const svc = services.find((s) => s.title === serviceTitle);
      const sp = specialists.find((s) => s.name === prev.specialist);
      const keepSpecialist = sp && svc && sp.services.includes(svc.id);
      return {
        ...prev,
        service: serviceTitle,
        specialist: keepSpecialist ? prev.specialist : "",
        date: "",
        time: "",
      };
    });

  const selectSpecialist = (specialistName) =>
    setBooking((prev) => ({
      ...prev,
      specialist: specialistName,
      date: "",
      time: "",
    }));

  const selectDate = (date) =>
    setBooking((prev) => ({ ...prev, date, time: "" }));

  // الضغط على كرت خدمة: نختارها وننتقل لخطوة الأخصائي
  const startWithService = (serviceTitle) => {
    setBookingComplete(false);
    setBooking({ ...initialBooking, service: serviceTitle });
    setBookingStep(2);
  };

  // الضغط على كرت أخصائي: نختاره ونرجع لخطوة الخدمات (مفلترة له)
  const startWithSpecialist = (specialistName) => {
    setBookingComplete(false);
    setBooking({ ...initialBooking, specialist: specialistName });
    setBookingStep(1);
  };

  const clearSpecialist = () =>
    setBooking((prev) => ({ ...prev, specialist: "", date: "", time: "" }));

  const nextStep = () => setBookingStep((s) => Math.min(s + 1, 6));
  const previousStep = () => setBookingStep((s) => Math.max(s - 1, 1));

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
      // TODO (مرحلة الباك إند):
      // const res = await fetch("/api/bookings", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...booking, phone: normalizePhone(booking.phone) }),
      // });
      // if (!res.ok) throw new Error();
      await new Promise((resolve) => setTimeout(resolve, 600));
      setBookingComplete(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DERIVED DATA ================= */

  const selectedService = services.find((s) => s.title === booking.service);

  const selectedSpecialist = specialists.find(
    (s) => s.name === booking.specialist
  );

  // إذا في أخصائي مختار بنعرض بس خدماته
  const availableServices = selectedSpecialist
    ? services.filter((s) => selectedSpecialist.services.includes(s.id))
    : services;

  const filteredSpecialists = selectedService
    ? specialists.filter((s) => s.services.includes(selectedService.id))
    : [];

  let availableTimeSlots = [];
  if (booking.date && selectedSpecialist) {
    const dayNumber = new Date(`${booking.date}T00:00:00`).getDay();
    availableTimeSlots = selectedSpecialist.schedule[dayNumber] || [];
  }

  const phoneValid = PHONE_REGEX.test(normalizePhone(booking.phone));
  const emailValid = !booking.email || EMAIL_REGEX.test(booking.email);
  const infoValid = booking.name.trim().length >= 2 && phoneValid && emailValid;

  /* ================= PAGE ================= */

  return (
    <div>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <div className="logo">
          DERMA<span>FLOW</span>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>

        <a href="#booking" className="book-btn">
          Book Appointment
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* ================= HERO ================= */}

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">LASER & SKIN CLINIC</p>

          <h1>
            Your Skin.
            <br />
            Your Confidence.
          </h1>

          <p className="hero-description">
            Advanced laser and skin treatments designed around you.
          </p>

          <div className="hero-buttons">
            <a href="#booking" className="primary-btn">
              Book Appointment
            </a>
            <a href="#services" className="secondary-btn">
              Explore Services
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-placeholder">Clinic Image</div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="services-section" id="services">
        <div className="section-heading">
          <p className="section-label">OUR TREATMENTS</p>
          <h2>Services Designed Around You</h2>
          <p className="section-description">
            Discover personalized laser and skin treatments designed to help
            you look and feel your best.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-image">
                <span>0{service.id}</span>
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <a
                  href="#booking"
                  className="service-link"
                  onClick={() => startWithService(service.title)}
                >
                  Book Treatment
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY DERMAFLOW ================= */}

      <section className="why-section" id="about">
        <div className="why-container">
          <div className="why-text">
            <p className="section-label">WHY DERMAFLOW</p>
            <h2>Beauty Meets Expertise</h2>

            <p>
              At DermaFlow, every treatment is designed around your skin, your
              goals, and your comfort.
            </p>

            <div className="why-points">
              {whyPoints.map((point, index) => (
                <div className="why-item" key={point.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-image">
            <div className="why-image-placeholder">
              Clinic / Treatment Image
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIALISTS ================= */}

      <section className="specialists-section" id="specialists">
        <div className="section-heading">
          <p className="section-label">OUR SPECIALISTS</p>
          <h2>Meet Our Experts</h2>
          <p className="section-description">
            Professional care from specialists dedicated to your skin,
            comfort, and results.
          </p>
        </div>

        <div className="specialists-grid">
          {specialists.map((specialist) => (
            <div className="specialist-card" key={specialist.id}>
              <div className="specialist-image">Specialist Photo</div>

              <div className="specialist-info">
                <h3>{specialist.name}</h3>
                <p>{specialist.specialty}</p>

                <a
                  href="#booking"
                  onClick={() => startWithSpecialist(specialist.name)}
                >
                  Book with {specialist.name} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOOKING ================= */}

      <section className="booking-section" id="booking">
        <div className="section-heading">
          <p className="section-label">BOOK YOUR VISIT</p>
          <h2>Book Your Appointment</h2>
          <p className="section-description">
            Choose your treatment and preferred appointment time in just a few
            simple steps.
          </p>
        </div>

        <div className="booking-container">
          {!bookingComplete ? (
            <>
              {/* PROGRESS */}

              <div className="booking-progress">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`progress-step ${
                      bookingStep >= step ? "active" : ""
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>

              {/* STEP 1: SERVICE */}

              {bookingStep === 1 && (
                <div className="booking-step">
                  <h3>Choose Your Treatment</h3>
                  <p>Select the service you would like to book.</p>

                  {booking.specialist && (
                    <p className="booking-note">
                      Showing treatments by <strong>{booking.specialist}</strong>.{" "}
                      <button
                        type="button"
                        className="link-btn"
                        onClick={clearSpecialist}
                      >
                        Show all treatments
                      </button>
                    </p>
                  )}

                  <div className="booking-options">
                    {availableServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        className={`booking-option ${
                          booking.service === service.title ? "selected" : ""
                        }`}
                        onClick={() => selectService(service.title)}
                      >
                        <span>{service.title}</span>
                        <small>{service.description}</small>
                      </button>
                    ))}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="next-btn"
                      disabled={!booking.service}
                      onClick={nextStep}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SPECIALIST */}

              {bookingStep === 2 && (
                <div className="booking-step">
                  <h3>Choose Your Specialist</h3>
                  <p>Select a specialist available for {booking.service}.</p>

                  <div className="booking-options">
                    {filteredSpecialists.map((specialist) => (
                      <button
                        key={specialist.id}
                        type="button"
                        className={`booking-option ${
                          booking.specialist === specialist.name
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => selectSpecialist(specialist.name)}
                      >
                        <span>{specialist.name}</span>
                        <small>{specialist.specialty}</small>
                      </button>
                    ))}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={previousStep}
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={!booking.specialist}
                      onClick={nextStep}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: DATE */}

              {bookingStep === 3 && (
                <div className="booking-step">
                  <h3>Choose a Date</h3>
                  <p>Select your preferred appointment date.</p>

                  <label htmlFor="booking-date" className="sr-only">
                    Appointment date
                  </label>
                  <input
                    id="booking-date"
                    className="date-input"
                    type="date"
                    value={booking.date}
                    min={getTodayString()}
                    onChange={(event) => selectDate(event.target.value)}
                  />

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={previousStep}
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={!booking.date}
                      onClick={nextStep}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: TIME */}

              {bookingStep === 4 && (
                <div className="booking-step">
                  <h3>Choose a Time</h3>
                  <p>Available appointments for {booking.date}</p>

                  <div className="time-grid">
                    {availableTimeSlots.length > 0 ? (
                      availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`time-slot ${
                            booking.time === time ? "selected" : ""
                          }`}
                          onClick={() => updateBooking("time", time)}
                        >
                          {time}
                        </button>
                      ))
                    ) : (
                      <div className="no-appointments">
                        No appointments available on this day. Please go back
                        and choose another date.
                      </div>
                    )}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={previousStep}
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={!booking.time}
                      onClick={nextStep}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: INFO */}

              {bookingStep === 5 && (
                <div className="booking-step">
                  <h3>Your Information</h3>
                  <p>Enter your details to complete your booking.</p>

                  <div className="patient-form">
                    <div>
                      <label htmlFor="patient-name">Full Name</label>
                      <input
                        id="patient-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={booking.name}
                        onChange={(e) => updateBooking("name", e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="patient-phone">Phone Number</label>
                      <input
                        id="patient-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="07XXXXXXXX or +962..."
                        value={booking.phone}
                        onChange={(e) => updateBooking("phone", e.target.value)}
                      />
                      {booking.phone && !phoneValid && (
                        <small className="field-error">
                          Enter a valid Jordanian mobile number, like
                          0791234567 or +962791234567.
                        </small>
                      )}
                    </div>

                    <div>
                      <label htmlFor="patient-email">Email (optional)</label>
                      <input
                        id="patient-email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@email.com"
                        value={booking.email}
                        onChange={(e) => updateBooking("email", e.target.value)}
                      />
                      {booking.email && !emailValid && (
                        <small className="field-error">
                          Enter a valid email address.
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={previousStep}
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      disabled={!infoValid}
                      onClick={nextStep}
                    >
                      Review Booking →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: REVIEW */}

              {bookingStep === 6 && (
                <div className="booking-step">
                  <h3>Review Your Appointment</h3>
                  <p>Please confirm your appointment details.</p>

                  <div className="booking-summary">
                    <div>
                      <span>Treatment</span>
                      <strong>{booking.service}</strong>
                    </div>
                    <div>
                      <span>Specialist</span>
                      <strong>{booking.specialist}</strong>
                    </div>
                    <div>
                      <span>Date</span>
                      <strong>{booking.date}</strong>
                    </div>
                    <div>
                      <span>Time</span>
                      <strong>{booking.time}</strong>
                    </div>
                    <div>
                      <span>Patient</span>
                      <strong>{booking.name}</strong>
                    </div>
                    <div>
                      <span>Phone</span>
                      <strong>{normalizePhone(booking.phone)}</strong>
                    </div>
                    {booking.email && (
                      <div>
                        <span>Email</span>
                        <strong>{booking.email}</strong>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <p className="field-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <div className="booking-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={previousStep}
                      disabled={submitting}
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      className="next-btn"
                      onClick={confirmBooking}
                      disabled={submitting}
                    >
                      {submitting ? "Confirming..." : "Confirm Appointment"}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* SUCCESS */

            <div className="booking-success">
              <div className="success-icon">✓</div>

              <h3>Appointment Confirmed!</h3>

              <p>
                Thank you, {booking.name}. Your appointment with{" "}
                {booking.specialist} for {booking.service} has been received.
              </p>

              <strong>
                {booking.date} • {booking.time}
              </strong>

              <div className="booking-actions center">
                <button
                  type="button"
                  className="back-btn"
                  onClick={resetBooking}
                >
                  Book another appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;