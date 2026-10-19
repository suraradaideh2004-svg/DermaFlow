import { Link } from "react-router-dom";

import "../App.css";
import "../ClientDashboard.css";


/* =========================================================
   CLIENT DASHBOARD TRANSLATIONS
========================================================= */

const translations = {
  en: {
    language: "العربية",

    portalLabel: "MY DERMAFLOW",
    welcome: "Welcome back",
    welcomeText:
      "Your appointments, treatment progress and next recommended visits — all in one place.",

    bookAppointment: "Book Appointment",
    signOut: "Sign Out",

    activePlans: "Active Plans",
    sessionsLogged: "Sessions Logged",
    nextVisit: "Next Suggested Visit",

    upcomingAppointment: "Upcoming Appointment",
    noAppointment: "No upcoming appointment",
    noAppointmentText:
      "You do not have an upcoming appointment yet.",
    specialist: "Specialist",
    date: "Date",
    time: "Time",
    viewAppointment: "View Appointment",

    nextSteps: "Your Next Steps",
    schedulingPreference: "Scheduling Preference",
    preferenceEnabled: "Enabled for laser scheduling",
    preferenceDisabled: "Not enabled",
    laserConflict: "Scheduling preference conflict",
    laserClear: "Suggested laser date is clear",
    recommendedDate: "Recommended Next Visit",
    originalDate: "Original Suggested Date",
    noLaserRecommendation:
      "No laser scheduling recommendation is needed right now.",

    journeyLabel: "YOUR JOURNEY",
    treatmentJourney: "Treatment Journey",
    activeTreatment: "ACTIVE TREATMENT",
    completedTreatment: "COMPLETED",
    sessionsCompleted: "sessions completed",
    lastSession: "Last Session",
    nextSuggested: "Suggested Next Visit",
    treatmentAreas: "Treatment Areas",
    bookNextSession: "Book Next Session",

    recordsLabel: "YOUR RECORDS",
    sessionHistory: "Session History",
    session: "Session",

    ready: "READY FOR YOUR NEXT VISIT?",
    continueJourney:
      "Continue your treatment journey with DermaFlow.",

    noNextVisit: "Not scheduled",
  },

  ar: {
    language: "English",

    portalLabel: "حسابي في ديرما فلو",
    welcome: "أهلًا بعودتك",
    welcomeText:
      "مواعيدك، تقدم خطط العلاج، والزيارات القادمة المقترحة في مكان واحد.",

    bookAppointment: "احجزي موعد",
    signOut: "تسجيل الخروج",

    activePlans: "الخطط النشطة",
    sessionsLogged: "الجلسات المسجلة",
    nextVisit: "الزيارة القادمة المقترحة",

    upcomingAppointment: "الموعد القادم",
    noAppointment: "لا يوجد موعد قادم",
    noAppointmentText:
      "لا يوجد لديك موعد قادم حتى الآن.",
    specialist: "الأخصائية",
    date: "التاريخ",
    time: "الوقت",
    viewAppointment: "عرض الموعد",

    nextSteps: "خطواتك القادمة",
    schedulingPreference: "تفضيلات الجدولة",
    preferenceEnabled: "مفعّلة لجدولة الليزر",
    preferenceDisabled: "غير مفعّلة",
    laserConflict: "يوجد تعارض مع تفضيلات الجدولة",
    laserClear: "موعد الليزر المقترح مناسب",
    recommendedDate: "الزيارة القادمة الأنسب",
    originalDate: "التاريخ المقترح الأساسي",
    noLaserRecommendation:
      "لا يوجد تنبيه خاص بموعد الليزر حاليًا.",

    journeyLabel: "رحلتك العلاجية",
    treatmentJourney: "خطط العلاج",
    activeTreatment: "علاج نشط",
    completedTreatment: "مكتمل",
    sessionsCompleted: "جلسات مكتملة",
    lastSession: "آخر جلسة",
    nextSuggested: "الزيارة القادمة المقترحة",
    treatmentAreas: "مناطق العلاج",
    bookNextSession: "احجزي الجلسة القادمة",

    recordsLabel: "سجلاتك",
    sessionHistory: "سجل الجلسات",
    session: "الجلسة",

    ready: "جاهزة لزيارتك القادمة؟",
    continueJourney:
      "واصلي رحلتك العلاجية مع ديرما فلو.",

    noNextVisit: "غير محدد",
  },
};


/* =========================================================
   DEMO CLIENT DATA
   Real client data can be passed through the clientData prop.
========================================================= */

const demoClient = {
  name: "Sura",

  period_tracking_enabled: true,
  last_period_start: "2026-10-01",
  cycle_length_days: 28,
  period_length_days: 5,

  nextAppointment: {
    treatment: "Laser Hair Removal",
    treatmentAr: "إزالة الشعر بالليزر",
    date: "2026-10-28",
    time: "4:00 PM",
    specialist: "Dr. Sara Khalil",
    status: "confirmed",
  },

  treatmentPlans: [
    {
      id: 1,
      treatment: "Laser Hair Removal",
      treatmentAr: "إزالة الشعر بالليزر",
      completedSessions: 3,
      totalSessions: 6,
      lastSession: "2026-10-07",
      nextSuggested: "2026-10-28",
      areas: [
        { en: "Full Legs", ar: "الساقين بالكامل" },
        { en: "Arms", ar: "الذراعين" },
        { en: "Underarms", ar: "تحت الإبط" },
      ],
    },
    {
      id: 2,
      treatment: "Hydrafacial",
      treatmentAr: "هيدرافيشل",
      completedSessions: 2,
      totalSessions: 4,
      lastSession: "2026-09-30",
      nextSuggested: "2026-10-30",
      areas: [{ en: "Face", ar: "الوجه" }],
    },
  ],

  sessionHistory: [
    {
      id: 1,
      date: "2026-10-07",
      treatment: "Laser Hair Removal",
      treatmentAr: "إزالة الشعر بالليزر",
      sessionNumber: 3,
      totalSessions: 6,
      specialist: "Dr. Sara Khalil",
      areas: [
        { en: "Full Legs", ar: "الساقين بالكامل" },
        { en: "Arms", ar: "الذراعين" },
        { en: "Underarms", ar: "تحت الإبط" },
      ],
    },
    {
      id: 2,
      date: "2026-09-30",
      treatment: "Hydrafacial",
      treatmentAr: "هيدرافيشل",
      sessionNumber: 2,
      totalSessions: 4,
      specialist: "Dr. Maya Ali",
      areas: [{ en: "Face", ar: "الوجه" }],
    },
    {
      id: 3,
      date: "2026-09-16",
      treatment: "Laser Hair Removal",
      treatmentAr: "إزالة الشعر بالليزر",
      sessionNumber: 2,
      totalSessions: 6,
      specialist: "Dr. Sara Khalil",
      areas: [
        { en: "Full Legs", ar: "الساقين بالكامل" },
        { en: "Arms", ar: "الذراعين" },
        { en: "Underarms", ar: "تحت الإبط" },
      ],
    },
    {
      id: 4,
      date: "2026-08-26",
      treatment: "Laser Hair Removal",
      treatmentAr: "إزالة الشعر بالليزر",
      sessionNumber: 1,
      totalSessions: 6,
      specialist: "Dr. Sara Khalil",
      areas: [
        { en: "Full Legs", ar: "الساقين بالكامل" },
        { en: "Arms", ar: "الذراعين" },
        { en: "Underarms", ar: "تحت الإبط" },
      ],
    },
  ],
};


/* =========================================================
   CLIENT DASHBOARD
========================================================= */

function ClientDashboard({
  language = "en",
  toggleLanguage,
  clientData = null,
}) {
  const isArabic =
    language === "ar";

  const t =
    translations[language] ||
    translations.en;

  const client =
    clientData || demoClient;

  const treatmentPlans =
    client.treatmentPlans || [];

  const sessionHistory =
    client.sessionHistory || [];

  const nextAppointment =
    client.nextAppointment || null;


  /* =========================================================
     HELPERS
  ========================================================= */

  const formatDate = (dateString) => {
    if (!dateString) {
      return t.noNextVisit;
    }

    const date =
      new Date(
        `${dateString}T00:00:00`
      );

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


  const getTreatmentName = (
    item
  ) => {
    if (!item) {
      return "";
    }

    return isArabic
      ? item.treatmentAr ||
          item.treatment
      : item.treatment ||
          item.treatmentAr;
  };


  const getAreas = (areas = []) => {
    return areas.map((area) =>
      isArabic
        ? area.ar || area.en
        : area.en || area.ar
    );
  };


  const toDateString = (date) => {
    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const isLaserPlan = (plan) => {
    const englishName =
      String(
        plan.treatment || ""
      ).toLowerCase();

    const arabicName =
      String(
        plan.treatmentAr || ""
      );

    return (
      englishName.includes(
        "laser"
      ) ||
      arabicName.includes(
        "ليزر"
      )
    );
  };


  const getLaserRecommendation = (
    plan
  ) => {
    const enabled =
      Boolean(
        client.period_tracking_enabled ??
          client.periodTrackingEnabled
      );

    const lastPeriodStart =
      client.last_period_start ||
      client.lastPeriodStart;

    const targetDate =
      plan.nextSuggested;

    if (
      !enabled ||
      !lastPeriodStart ||
      !targetDate ||
      !isLaserPlan(plan)
    ) {
      return null;
    }

    const cycleLength =
      Number(
        client.cycle_length_days ||
          client.cycleLengthDays ||
          28
      );

    const periodLength =
      Number(
        client.period_length_days ||
          client.periodLengthDays ||
          5
      );

    const target =
      new Date(
        `${targetDate}T00:00:00`
      );

    let upcomingPeriod =
      new Date(
        `${lastPeriodStart}T00:00:00`
      );

    if (
      Number.isNaN(
        target.getTime()
      ) ||
      Number.isNaN(
        upcomingPeriod.getTime()
      )
    ) {
      return null;
    }

    while (
      upcomingPeriod < target
    ) {
      const nextPeriod =
        new Date(
          upcomingPeriod
        );

      nextPeriod.setDate(
        nextPeriod.getDate() +
          cycleLength
      );

      upcomingPeriod =
        nextPeriod;
    }

    const previousPeriod =
      new Date(
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

    for (
      const periodStart
      of candidatePeriods
    ) {
      const blockedStart =
        new Date(
          periodStart
        );

      blockedStart.setDate(
        blockedStart.getDate() - 2
      );

      const blockedEnd =
        new Date(
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
        const recommended =
          new Date(
            blockedEnd
          );

        recommended.setDate(
          recommended.getDate() + 1
        );

        return {
          hasConflict: true,
          originalDate:
            targetDate,
          recommendedDate:
            toDateString(
              recommended
            ),
        };
      }
    }

    return {
      hasConflict: false,
      originalDate:
        targetDate,
      recommendedDate:
        targetDate,
    };
  };


  const activePlans =
    treatmentPlans.filter(
      (plan) =>
        Number(
          plan.completedSessions
        ) <
        Number(
          plan.totalSessions
        )
    );


  const laserPlansWithRecommendations =
    treatmentPlans
      .filter(isLaserPlan)
      .map((plan) => ({
        plan,
        recommendation:
          getLaserRecommendation(
            plan
          ),
      }));


  const laserConflict =
    laserPlansWithRecommendations.find(
      (item) =>
        item.recommendation
          ?.hasConflict
    );


  const laserClear =
    laserPlansWithRecommendations.find(
      (item) =>
        item.recommendation &&
        !item.recommendation
          .hasConflict
    );


  const nextSuggestedDates =
    treatmentPlans
      .map(
        (plan) =>
          plan.nextSuggested
      )
      .filter(Boolean)
      .sort();


  const nextSuggestedVisit =
    nextSuggestedDates[0] ||
    null;


  const periodEnabled =
    Boolean(
      client.period_tracking_enabled ??
        client.periodTrackingEnabled
    );


  return (
    <div
      className="client-dashboard client-portal"
      dir={
        isArabic
          ? "rtl"
          : "ltr"
      }
      lang={language}
    >

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <nav className="client-navbar client-portal-navbar">

        <Link
          to="/"
          className="client-logo"
        >
          DERMA<span>FLOW</span>
        </Link>


        <div className="client-nav-actions">

          <button
            type="button"
            className="language-btn"
            onClick={
              toggleLanguage
            }
          >
            {t.language}
          </button>


          <a
            href="/#booking"
            className="client-book-btn"
          >
            {t.bookAppointment}
          </a>


          <Link
            to="/login"
            className="logout-btn"
          >
            {t.signOut}
          </Link>

        </div>

      </nav>


      <main className="client-portal-main">

        {/* ===================================================
            PROFILE INTRO
        ==================================================== */}

        <section className="client-portal-hero">

          <div className="client-portal-identity">

            <div className="client-portal-avatar">
              {
                String(
                  client.name ||
                  "C"
                )
                  .trim()
                  .charAt(0)
                  .toUpperCase()
              }
            </div>


            <div>

              <p className="client-portal-kicker">
                {t.portalLabel}
              </p>

              <h1>
                {t.welcome},{" "}
                {client.name}.
              </h1>

              <p className="client-portal-subtitle">
                {t.welcomeText}
              </p>

            </div>

          </div>


          <a
            href="/#booking"
            className="client-portal-primary-action"
          >
            + {t.bookAppointment}
          </a>

        </section>


        {/* ===================================================
            QUICK SUMMARY
        ==================================================== */}

        <section className="client-portal-summary">

          <div>
            <span>
              {t.activePlans}
            </span>

            <strong>
              {activePlans.length}
            </strong>
          </div>


          <div>
            <span>
              {t.sessionsLogged}
            </span>

            <strong>
              {sessionHistory.length}
            </strong>
          </div>


          <div>
            <span>
              {t.nextVisit}
            </span>

            <strong>
              {formatDate(
                nextSuggestedVisit
              )}
            </strong>
          </div>

        </section>


        {/* ===================================================
            TOP GRID
        ==================================================== */}

        <section className="client-portal-top-grid">

          {/* UPCOMING APPOINTMENT */}

          <article className="client-portal-card client-portal-appointment">

            <div className="client-portal-card-heading">

              <div>

                <p className="client-portal-kicker">
                  {
                    t.upcomingAppointment
                  }
                </p>

                <h2>
                  {nextAppointment
                    ? getTreatmentName(
                        nextAppointment
                      )
                    : t.noAppointment}
                </h2>

              </div>


              {nextAppointment && (
                <span className="client-portal-status">
                  {
                    nextAppointment.status ===
                    "pending"
                      ? isArabic
                        ? "بانتظار التأكيد"
                        : "Pending"
                      : isArabic
                        ? "مؤكد"
                        : "Confirmed"
                  }
                </span>
              )}

            </div>


            {nextAppointment ? (
              <>

                <p className="client-portal-specialist">
                  {t.specialist}:{" "}
                  <strong>
                    {
                      nextAppointment.specialist
                    }
                  </strong>
                </p>


                <div className="client-portal-appointment-details">

                  <div>
                    <span>
                      {t.date}
                    </span>

                    <strong>
                      {formatDate(
                        nextAppointment.date
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      {t.time}
                    </span>

                    <strong>
                      {
                        nextAppointment.time
                      }
                    </strong>
                  </div>

                </div>


                <button
                  type="button"
                  className="client-portal-outline-btn"
                >
                  {
                    t.viewAppointment
                  }
                </button>

              </>
            ) : (
              <div className="client-portal-empty">

                <p>
                  {
                    t.noAppointmentText
                  }
                </p>

                <a
                  href="/#booking"
                  className="client-portal-outline-btn"
                >
                  {
                    t.bookAppointment
                  }
                </a>

              </div>
            )}

          </article>


          {/* NEXT STEPS */}

          <article className="client-portal-card client-portal-next-steps">

            <div className="client-portal-card-heading">

              <div>

                <p className="client-portal-kicker">
                  {
                    t.schedulingPreference
                  }
                </p>

                <h2>
                  {t.nextSteps}
                </h2>

              </div>


              <span
                className={`client-portal-preference-pill ${
                  periodEnabled
                    ? "enabled"
                    : ""
                }`}
              >
                {periodEnabled
                  ? t.preferenceEnabled
                  : t.preferenceDisabled}
              </span>

            </div>


            {laserConflict ? (
              <div className="client-portal-alert warning">

                <div className="client-portal-alert-icon">
                  !
                </div>

                <div>

                  <strong>
                    {t.laserConflict}
                  </strong>

                  <p>
                    {
                      t.originalDate
                    }
                  </p>

                  <b>
                    {formatDate(
                      laserConflict
                        .recommendation
                        .originalDate
                    )}
                  </b>


                  <p>
                    {
                      t.recommendedDate
                    }
                  </p>

                  <b className="client-portal-recommended-date">
                    {formatDate(
                      laserConflict
                        .recommendation
                        .recommendedDate
                    )}
                  </b>

                </div>

              </div>
            ) : laserClear ? (
              <div className="client-portal-alert success">

                <div className="client-portal-alert-icon">
                  ✓
                </div>

                <div>

                  <strong>
                    {t.laserClear}
                  </strong>

                  <p>
                    {
                      t.nextSuggested
                    }
                  </p>

                  <b>
                    {formatDate(
                      laserClear.plan
                        .nextSuggested
                    )}
                  </b>

                </div>

              </div>
            ) : (
              <p className="client-portal-muted-copy">
                {
                  t.noLaserRecommendation
                }
              </p>
            )}

          </article>

        </section>


        {/* ===================================================
            TREATMENT JOURNEY
        ==================================================== */}

        <section className="client-portal-section">

          <div className="client-portal-section-heading">

            <div>

              <p className="client-portal-kicker">
                {t.journeyLabel}
              </p>

              <h2>
                {
                  t.treatmentJourney
                }
              </h2>

            </div>


            <span className="client-portal-count">
              {
                treatmentPlans.length
              }
            </span>

          </div>


          <div className="client-portal-plan-grid">

            {treatmentPlans.map(
              (plan) => {

                const progress =
                  Math.min(
                    100,
                    Math.max(
                      0,
                      (
                        Number(
                          plan.completedSessions
                        ) /
                        Math.max(
                          Number(
                            plan.totalSessions
                          ),
                          1
                        )
                      ) *
                        100
                    )
                  );

                const isCompleted =
                  Number(
                    plan.completedSessions
                  ) >=
                  Number(
                    plan.totalSessions
                  );

                const recommendation =
                  getLaserRecommendation(
                    plan
                  );


                return (
                  <article
                    className="client-portal-plan-card"
                    key={plan.id}
                  >

                    <div className="client-portal-plan-top">

                      <div>

                        <span
                          className={`client-portal-plan-status ${
                            isCompleted
                              ? "completed"
                              : ""
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

                      </div>


                      <div className="client-portal-session-count">
                        {
                          plan.completedSessions
                        }
                        /
                        {
                          plan.totalSessions
                        }
                      </div>

                    </div>


                    <div className="client-portal-progress-row">

                      <span>
                        {Math.round(
                          progress
                        )}
                        %
                      </span>

                      <div className="client-portal-progress-track">

                        <div
                          className="client-portal-progress-fill"
                          style={{
                            width:
                              `${progress}%`,
                          }}
                        />

                      </div>

                    </div>


                    <div className="client-portal-plan-dates">

                      <div>

                        <span>
                          {t.lastSession}
                        </span>

                        <strong>
                          {formatDate(
                            plan.lastSession
                          )}
                        </strong>

                      </div>


                      <div>

                        <span>
                          {
                            t.nextSuggested
                          }
                        </span>

                        <strong>
                          {formatDate(
                            plan.nextSuggested
                          )}
                        </strong>

                      </div>

                    </div>


                    {recommendation?.hasConflict && (
                      <div className="client-portal-inline-alert">

                        <span>
                          !
                        </span>

                        <div>

                          <strong>
                            {
                              t.laserConflict
                            }
                          </strong>

                          <p>
                            {
                              t.recommendedDate
                            }:{" "}
                            <b>
                              {formatDate(
                                recommendation
                                  .recommendedDate
                              )}
                            </b>
                          </p>

                        </div>

                      </div>
                    )}


                    <div className="client-portal-areas">

                      <span>
                        {
                          t.treatmentAreas
                        }
                      </span>

                      <div>

                        {getAreas(
                          plan.areas
                        ).map(
                          (area) => (
                            <small
                              key={
                                area
                              }
                            >
                              {
                                area
                              }
                            </small>
                          )
                        )}

                      </div>

                    </div>


                    {!isCompleted && (
                      <a
                        href="/#booking"
                        className="client-portal-plan-link"
                      >
                        {
                          t.bookNextSession
                        }{" "}
                        →
                      </a>
                    )}

                  </article>
                );
              }
            )}

          </div>

        </section>


        {/* ===================================================
            SESSION HISTORY
        ==================================================== */}

        <section className="client-portal-section">

          <div className="client-portal-section-heading">

            <div>

              <p className="client-portal-kicker">
                {
                  t.recordsLabel
                }
              </p>

              <h2>
                {
                  t.sessionHistory
                }
              </h2>

            </div>


            <span className="client-portal-count">
              {
                sessionHistory.length
              }
            </span>

          </div>


          <div className="client-portal-history">

            {sessionHistory.map(
              (session) => (

                <article
                  className="client-portal-history-row"
                  key={session.id}
                >

                  <div className="client-portal-history-date">
                    {formatDate(
                      session.date
                    )}
                  </div>


                  <div className="client-portal-history-marker">
                    <span />
                  </div>


                  <div className="client-portal-history-content">

                    <h3>
                      {getTreatmentName(
                        session
                      )}
                    </h3>

                    <p>
                      {getAreas(
                        session.areas
                      ).join(" • ")}
                    </p>

                  </div>


                  <div className="client-portal-history-meta">

                    <strong>
                      {t.session}{" "}
                      {
                        session.sessionNumber
                      }{" "}
                      {isArabic
                        ? "من"
                        : "of"}{" "}
                      {
                        session.totalSessions
                      }
                    </strong>

                    <span>
                      {
                        session.specialist
                      }
                    </span>

                  </div>

                </article>
              )
            )}

          </div>

        </section>


        {/* ===================================================
            BOTTOM ACTION
        ==================================================== */}

        <section className="client-portal-bottom-action">

          <div>

            <p className="client-portal-kicker">
              {t.ready}
            </p>

            <h2>
              {
                t.continueJourney
              }
            </h2>

          </div>


          <a
            href="/#booking"
            className="client-portal-primary-action"
          >
            {
              t.bookAppointment
            }
          </a>

        </section>

      </main>

    </div>
  );
}


export default ClientDashboard;
