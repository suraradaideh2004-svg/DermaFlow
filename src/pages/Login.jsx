import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const translations = {
  en: {
    language: "العربية",

    brandLabel: "YOUR SKIN JOURNEY",
    brandTitle1: "Your care,",
    brandTitle2: "all in one place.",
    brandText:
      "Access your appointments, treatment plans, session history, and upcoming visits.",

    portal: "CLIENT PORTAL",

    signIn: "Sign In",
    createAccount: "Create Account",

    welcome: "Welcome Back",
    welcomeText: "Sign in to access your DermaFlow account.",

    createTitle: "Create Your Account",
    createText:
      "Create an account to keep track of your appointments and treatment journey.",

    fullName: "Full Name",
    namePlaceholder: "Enter your full name",

    email: "Email Address",
    emailPlaceholder: "name@email.com",

    phone: "Phone Number",
    phonePlaceholder: "07XXXXXXXX",

    password: "Password",
    passwordPlaceholder: "Enter your password",

    confirmPassword: "Confirm Password",
    confirmPlaceholder: "Re-enter your password",

    remember: "Remember me",
    forgot: "Forgot password?",

    signInButton: "Sign In",
    createButton: "Create Account",

    guest: "Continue as Guest",
    guestText:
      "You can still book an appointment without creating an account.",

    back: "Back to Home",

    passwordTitle: "Password must contain:",
    eightCharacters: "At least 8 characters",
    uppercase: "One uppercase letter",
    lowercase: "One lowercase letter",
    number: "One number",
    special: "One special character",

    show: "Show",
    hide: "Hide",

    passwordMismatch: "Passwords do not match.",
    invalidEmail: "Please enter a valid email address.",
    invalidName: "Please enter your full name.",
    invalidPhone: "Please enter a valid phone number.",
    weakPassword: "Please complete all password requirements.",

    accountCreated:
      "Account created successfully. You can now sign in.",

    noAccount: "Don't have an account?",
    alreadyAccount: "Already have an account?",
  },

  ar: {
    language: "English",

    brandLabel: "رحلتك مع العناية بالبشرة",
    brandTitle1: "كل عنايتك،",
    brandTitle2: "في مكان واحد.",
    brandText:
      "تابعي مواعيدك وخطط العلاج وسجل الجلسات والزيارات القادمة بسهولة.",

    portal: "بوابة العميلات",

    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",

    welcome: "أهلًا بعودتك",
    welcomeText: "سجلي الدخول للوصول إلى حسابك في ديرما فلو.",

    createTitle: "أنشئي حسابك",
    createText:
      "أنشئي حسابًا لمتابعة مواعيدك وجلساتك وخطة العلاج الخاصة بك.",

    fullName: "الاسم الكامل",
    namePlaceholder: "أدخلي اسمك الكامل",

    email: "البريد الإلكتروني",
    emailPlaceholder: "name@email.com",

    phone: "رقم الهاتف",
    phonePlaceholder: "07XXXXXXXX",

    password: "كلمة المرور",
    passwordPlaceholder: "أدخلي كلمة المرور",

    confirmPassword: "تأكيد كلمة المرور",
    confirmPlaceholder: "أعيدي إدخال كلمة المرور",

    remember: "تذكرني",
    forgot: "نسيت كلمة المرور؟",

    signInButton: "تسجيل الدخول",
    createButton: "إنشاء الحساب",

    guest: "المتابعة كزائرة",
    guestText:
      "يمكنك حجز موعد بدون إنشاء حساب.",

    back: "العودة للرئيسية",

    passwordTitle: "يجب أن تحتوي كلمة المرور على:",
    eightCharacters: "8 خانات على الأقل",
    uppercase: "حرف إنجليزي كبير",
    lowercase: "حرف إنجليزي صغير",
    number: "رقم واحد على الأقل",
    special: "رمز خاص واحد على الأقل",

    show: "إظهار",
    hide: "إخفاء",

    passwordMismatch: "كلمتا المرور غير متطابقتين.",
    invalidEmail: "أدخلي بريدًا إلكترونيًا صحيحًا.",
    invalidName: "أدخلي الاسم الكامل.",
    invalidPhone: "أدخلي رقم هاتف صحيحًا.",
    weakPassword: "يجب استكمال جميع شروط كلمة المرور.",

    accountCreated:
      "تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.",

    noAccount: "ليس لديك حساب؟",
    alreadyAccount: "لديك حساب بالفعل؟",
  },
};

function Login({
  language = "en",
  toggleLanguage,
}) {
  const navigate = useNavigate();

  const isArabic = language === "ar";
  const t = translations[language] || translations.en;

  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  /* ================= PASSWORD RULES ================= */

  const passwordChecks = {
    length: registerData.password.length >= 8,

    uppercase: /[A-Z]/.test(registerData.password),

    lowercase: /[a-z]/.test(registerData.password),

    number: /\d/.test(registerData.password),

    special: /[^A-Za-z0-9]/.test(registerData.password),
  };

  const passwordValid = Object.values(passwordChecks).every(
    Boolean
  );

  /* ================= HELPERS ================= */

  const emailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const phoneValid = (phone) => {
    const cleaned = phone.replace(/[\s\-()]/g, "");

    return (
      /^07[789]\d{7}$/.test(cleaned) ||
      /^\+9627[789]\d{7}$/.test(cleaned)
    );
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccessMessage("");
  };

  /* ================= LOGIN ================= */

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (!emailValid(loginData.email)) {
      setError(t.invalidEmail);
      return;
    }

    if (!loginData.password) {
      setError(t.passwordPlaceholder);
      return;
    }

    /*
      FRONT-END ONLY FOR NOW

      Later:
      POST /api/auth/login
      email + password
      backend checks database
      backend returns token/user
    */

    navigate("/client");
  };

  /* ================= REGISTER ================= */

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (registerData.name.trim().length < 2) {
      setError(t.invalidName);
      return;
    }

    if (!emailValid(registerData.email)) {
      setError(t.invalidEmail);
      return;
    }

    if (!phoneValid(registerData.phone)) {
      setError(t.invalidPhone);
      return;
    }

    if (!passwordValid) {
      setError(t.weakPassword);
      return;
    }

    if (
      registerData.password !== registerData.confirmPassword
    ) {
      setError(t.passwordMismatch);
      return;
    }

    /*
      FRONT-END ONLY FOR NOW

      Later:
      POST /api/auth/register

      {
        name,
        email,
        phone,
        password
      }
    */

    setLoginData({
      email: registerData.email,
      password: "",
    });

    setRegisterData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setMode("login");

    setSuccessMessage(t.accountCreated);
  };

  return (
    <div
      className="login-page"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {/* ================= BRAND SIDE ================= */}

      <div className="login-brand-side">
        <div className="login-top">
          <Link to="/" className="login-logo">
            DERMA<span>FLOW</span>
          </Link>

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

          <p>{t.brandText}</p>
        </div>
      </div>

      {/* ================= FORM SIDE ================= */}

      <div className="login-form-side">
        <div className="login-form-container">
          <p className="section-label">
            {t.portal}
          </p>

          {/* TABS */}

          <div className="auth-tabs">
            <button
              type="button"
              className={
                mode === "login" ? "active" : ""
              }
              onClick={() => switchMode("login")}
            >
              {t.signIn}
            </button>

            <button
              type="button"
              className={
                mode === "register" ? "active" : ""
              }
              onClick={() => switchMode("register")}
            >
              {t.createAccount}
            </button>
          </div>

          {/* ================= LOGIN FORM ================= */}

          {mode === "login" && (
            <>
              <h2>{t.welcome}</h2>

              <p className="login-subtitle">
                {t.welcomeText}
              </p>

              {successMessage && (
                <div className="auth-success">
                  ✓ {successMessage}
                </div>
              )}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="login-field">
                  <label htmlFor="login-email">
                    {t.email}
                  </label>

                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t.emailPlaceholder}
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="login-password">
                    {t.password}
                  </label>

                  <div className="password-input-wrapper">
                    <input
                      id="login-password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      name="password"
                      autoComplete="current-password"
                      placeholder={t.passwordPlaceholder}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? t.hide : t.show}
                    </button>
                  </div>
                </div>

                <div className="login-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    {t.remember}
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                  >
                    {t.forgot}
                  </button>
                </div>

                <button
                  type="submit"
                  className="login-button"
                >
                  {t.signInButton}
                </button>
              </form>

              <p className="auth-switch-text">
                {t.noAccount}{" "}
                <button
                  type="button"
                  onClick={() =>
                    switchMode("register")
                  }
                >
                  {t.createAccount}
                </button>
              </p>
            </>
          )}

          {/* ================= REGISTER FORM ================= */}

          {mode === "register" && (
            <>
              <h2>{t.createTitle}</h2>

              <p className="login-subtitle">
                {t.createText}
              </p>

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister}>
                <div className="login-field">
                  <label htmlFor="register-name">
                    {t.fullName}
                  </label>

                  <input
                    id="register-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t.namePlaceholder}
                    value={registerData.name}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="register-email">
                    {t.email}
                  </label>

                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t.emailPlaceholder}
                    value={registerData.email}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="register-phone">
                    {t.phone}
                  </label>

                  <input
                    id="register-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder={t.phonePlaceholder}
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="register-password">
                    {t.password}
                  </label>

                  <div className="password-input-wrapper">
                    <input
                      id="register-password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      name="password"
                      autoComplete="new-password"
                      placeholder={t.passwordPlaceholder}
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? t.hide : t.show}
                    </button>
                  </div>
                </div>

                {/* PASSWORD CHECKLIST */}

                <div className="password-rules">
                  <p>{t.passwordTitle}</p>

                  <PasswordRule
                    passed={passwordChecks.length}
                    text={t.eightCharacters}
                  />

                  <PasswordRule
                    passed={passwordChecks.uppercase}
                    text={t.uppercase}
                  />

                  <PasswordRule
                    passed={passwordChecks.lowercase}
                    text={t.lowercase}
                  />

                  <PasswordRule
                    passed={passwordChecks.number}
                    text={t.number}
                  />

                  <PasswordRule
                    passed={passwordChecks.special}
                    text={t.special}
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="confirm-password">
                    {t.confirmPassword}
                  </label>

                  <div className="password-input-wrapper">
                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder={t.confirmPlaceholder}
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                    >
                      {showConfirmPassword
                        ? t.hide
                        : t.show}
                    </button>
                  </div>

                  {registerData.confirmPassword &&
                    registerData.password !==
                      registerData.confirmPassword && (
                      <small className="field-error">
                        {t.passwordMismatch}
                      </small>
                    )}
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={
                    !passwordValid ||
                    !registerData.name ||
                    !registerData.email ||
                    !registerData.phone ||
                    !registerData.confirmPassword
                  }
                >
                  {t.createButton}
                </button>
              </form>

              <p className="auth-switch-text">
                {t.alreadyAccount}{" "}
                <button
                  type="button"
                  onClick={() =>
                    switchMode("login")
                  }
                >
                  {t.signIn}
                </button>
              </p>
            </>
          )}

          {/* ================= GUEST ================= */}

          <div className="login-divider">
            <span>or</span>
          </div>

          <Link
            to="/#booking"
            className="guest-button"
          >
            {t.guest}
          </Link>

          <p className="login-help">
            {t.guestText}
          </p>

          <Link to="/" className="back-home">
            ← {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function PasswordRule({ passed, text }) {
  return (
    <div
      className={`password-rule ${
        passed ? "passed" : ""
      }`}
    >
      <span>{passed ? "✓" : "○"}</span>

      <span>{text}</span>
    </div>
  );
}

export default Login;