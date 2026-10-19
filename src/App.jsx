import {
  useEffect,
  useState,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StaffLogin from "./pages/StaffLogin";
import ClientDashboard from "./pages/ClientDashboard";
import API_BASE_URL from "./config/api";

import AdminDashboard, {
  initialClients,
} from "./pages/AdminDashboard";

import {
  initialSpecialists,
} from "./data/clinicData";


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


function App() {

  const [
    language,
    setLanguage,
  ] = useState(
    localStorage.getItem(
      "dermaflow-language"
    ) || "en"
  );


  const toggleLanguage = () => {
    const newLanguage =
      language === "en"
        ? "ar"
        : "en";

    setLanguage(
      newLanguage
    );

    localStorage.setItem(
      "dermaflow-language",
      newLanguage
    );
  };


  /* SPECIALISTS */

  const [
    specialists,
    setSpecialists,
  ] = useState(
    initialSpecialists
  );


  const activeSpecialists =
    specialists.filter(
      (specialist) =>
        specialist.isActive
    );


  /* APPOINTMENTS */

  const [
    appointments,
    setAppointments,
  ] = useState(() => {
    const savedAppointments =
      localStorage.getItem(
        "dermaflow-appointments"
      );

    if (savedAppointments) {
      try {
        return JSON.parse(
          savedAppointments
        );
      } catch {
        return initialAppointments;
      }
    }

    return initialAppointments;
  });


  useEffect(() => {
    localStorage.setItem(
      "dermaflow-appointments",
      JSON.stringify(
        appointments
      )
    );
  }, [appointments]);


  /* CLIENTS */

  const [
    clients,
    setClients,
  ] = useState(() => {
    const savedClients =
      localStorage.getItem(
        "dermaflow-clients"
      );

    if (savedClients) {
      try {
        return JSON.parse(
          savedClients
        );
      } catch {
        return initialClients;
      }
    }

    return initialClients;
  });


  useEffect(() => {
    localStorage.setItem(
      "dermaflow-clients",
      JSON.stringify(
        clients
      )
    );
  }, [clients]);

/* =========================================================
   LOAD APPOINTMENTS FROM BACKEND
========================================================= */

useEffect(() => {
  const loadAppointments =
    async () => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/appointments`
          );


        const data =
          await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
            "Failed to load appointments."
          );
        }


        setAppointments(
          data.appointments || []
        );

      } catch (error) {

        console.error(
          "Load appointments error:",
          error
        );

      }
    };


  loadAppointments();

}, []);
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Home
            language={
              language
            }

            toggleLanguage={
              toggleLanguage
            }

            specialists={
              activeSpecialists
            }

            appointments={
              appointments
            }

            setAppointments={
              setAppointments
            }

            clients={
              clients
            }

            setClients={
              setClients
            }
          />
        }
      />


      <Route
        path="/login"
        element={
          <Login
            language={
              language
            }

            toggleLanguage={
              toggleLanguage
            }
          />
        }
      />


      <Route
        path="/client"
        element={
          <ClientDashboard
            language={
              language
            }

            toggleLanguage={
              toggleLanguage
            }
          />
        }
      />


      <Route
        path="/staff-login"
        element={
          <StaffLogin
            language={
              language
            }

            toggleLanguage={
              toggleLanguage
            }
          />
        }
      />


      <Route
        path="/admin"
        element={
          <AdminDashboard
            language={
              language
            }

            toggleLanguage={
              toggleLanguage
            }

            specialists={
              specialists
            }

            setSpecialists={
              setSpecialists
            }

            appointments={
              appointments
            }

            setAppointments={
              setAppointments
            }

            clients={
              clients
            }

            setClients={
              setClients
            }
          />
        }
      />

    </Routes>
  );
}


export default App;