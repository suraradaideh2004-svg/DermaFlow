import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

/* =========================================================
   STAFF LOGIN TRANSLATIONS
   Text used on the staff authentication page.
========================================================= */

const translations = {
  en: {
    language: "العربية",

    brandLabel: "DERMAFLOW TEAM",
    brandTitle1: "Manage the clinic,",
    brandTitle2: "all in one place.",

    brandText:
      "Access appointments, client records, treatment plans, specialists, and daily clinic operations.",

    portal: "STAFF PORTAL",

    title: "Staff Sign In",

    subtitle:
      "Sign in with your staff account to access the clinic dashboard.",

    email: "Staff Email",
    emailPlaceholder: "staff@dermaflow.com",

    password: "Password",
    passwordPlaceholder: "Enter your password",

    remember: "Remember me",

    forgot: "Forgot password?",

    signIn: "Sign In",

    back: "Back to Website",

    show: "Show",
    hide: "Hide",

    invalidEmail:
      "Please enter a valid email address.",

    passwordRequired:
      "Please enter your password.",
  },

  ar: {
    language: "English",

    brandLabel: "فريق ديرما فلو",
    brandTitle1: "إدارة العيادة،",
    brandTitle2: "كلها في مكان واحد.",

    brandText:
      "الوصول إلى المواعيد وملفات العميلات وخطط العلاج والأخصائيات وإدارة العمليات اليومية للعيادة.",

    portal: "بوابة الموظفات",

    title: "تسجيل دخول الموظفات",

    subtitle:
      "سجلي الدخول باستخدام حساب الموظفة للوصول إلى لوحة إدارة العيادة.",

    email: "البريد الإلكتروني للموظفة",
    emailPlaceholder: "staff@dermaflow.com",

    password: "كلمة المرور",
    passwordPlaceholder: "أدخلي كلمة المرور",

    remember: "تذكرني",

    forgot: "نسيت كلمة المرور؟",

    signIn: "تسجيل الدخول",

    back: "العودة إلى الموقع",

    show: "إظهار",
    hide: "إخفاء",

    invalidEmail:
      "أدخلي بريدًا إلكترونيًا صحيحًا.",

    passwordRequired:
      "أدخلي كلمة المرور.",
  },
};


/* =========================================================
   STAFF LOGIN COMPONENT

   This is currently a front-end demo.
   Real staff authentication will be connected to the backend later.
========================================================= */

function StaffLogin({
  language = "en",
  toggleLanguage,
}) {
  const navigate = useNavigate();

  const isArabic =
    language === "ar";

  const t =
    translations[language] ||
    translations.en;


  /* Stores the staff login form values. */

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  /* Controls Show / Hide password. */

  const [showPassword, setShowPassword] =
    useState(false);


  /* Stores validation error messages. */

  const [error, setError] =
    useState("");


  /* Checks if the email format is valid. */

  const emailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );


  /* Updates the form when the user types. */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };


  /* Handles staff sign in. */

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");


    /* Validate email. */

    if (!emailValid(formData.email)) {
      setError(t.invalidEmail);

      return;
    }


    /* Validate password. */

    if (!formData.password) {
      setError(t.passwordRequired);

      return;
    }


    /*
      TEMPORARY FRONT-END LOGIN

      For now:
      Any valid email + any password
      will open the Admin Dashboard.

      Later the backend will verify:
      - Email
      - Hashed password
      - Staff role
      - Account status
    */

    navigate("/admin");
  };


  return (
    <div
      className="login-page"
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
      lang={language}
    >

      {/* =====================================================
          LEFT BRAND SIDE
      ====================================================== */}

      <div className="login-brand-side">

        <div className="login-top">

          {/* Logo returns to the public website. */}

          <Link
            to="/"
            className="login-logo"
          >
            DERMA<span>FLOW</span>
          </Link>


          {/* Language switch. */}

          <button
            type="button"
            className="login-language-btn"
            onClick={toggleLanguage}
          >
            {t.language}
          </button>

        </div>


        <div className="login-brand-content">

          <p className="section-label">
            {t.brandLabel}
          </p>

          <h1>
            {t.brandTitle1}
            <br />
            {t.brandTitle2}
          </h1>

          <p>
            {t.brandText}
          </p>

        </div>

      </div>


      {/* =====================================================
          STAFF LOGIN FORM
      ====================================================== */}

      <div className="login-form-side">

        <div className="login-form-container">

          <p className="section-label">
            {t.portal}
          </p>


          <h2>
            {t.title}
          </h2>


          <p className="login-subtitle">
            {t.subtitle}
          </p>


          {/* Validation error. */}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* STAFF EMAIL */}

            <div className="login-field">

              <label htmlFor="staff-email">
                {t.email}
              </label>

              <input
                id="staff-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={
                  t.emailPlaceholder
                }
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            {/* PASSWORD */}

            <div className="login-field">

              <label htmlFor="staff-password">
                {t.password}
              </label>


              <div className="password-input-wrapper">

                <input
                  id="staff-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  autoComplete="current-password"
                  placeholder={
                    t.passwordPlaceholder
                  }
                  value={
                    formData.password
                  }
                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showPassword
                    ? t.hide
                    : t.show}
                </button>

              </div>

            </div>


            {/* REMEMBER / FORGOT PASSWORD */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                />

                {t.remember}

              </label>


              <button
                type="button"
                className="forgot-password"
              >
                {t.forgot}
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              {t.signIn}
            </button>

          </form>


          {/* RETURN TO PUBLIC WEBSITE */}

          <div className="login-divider">
            <span>•</span>
          </div>


          <Link
            to="/"
            className="back-home"
          >
            ← {t.back}
          </Link>

        </div>

      </div>

    </div>
  );
}


export default StaffLogin;