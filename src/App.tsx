import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Enrollment from "./pages/Enrollment";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import Learn from "./pages/Learn";
import Lesson from "./pages/Lesson";
import Test from "./pages/Test";
import Results from "./pages/Results";
import Progress from "./pages/Progress";
import Support from "./pages/Support";
import SupportRequests from "./pages/SupportRequests";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <Routes>
      {/* =========================
          Authentication
      ========================== */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* =========================
          Dashboard
      ========================== */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* =========================
          Courses
      ========================== */}

      <Route
        path="/courses"
        element={<Courses />}
      />

      {/* Course Details */}
      <Route
        path="/courses/:courseId"
        element={<CourseDetails />}
      />

      {/* Course Enrollment / Purchase */}
      <Route
        path="/enrollment/:courseId"
        element={<Enrollment />}
      />
      <Route
  path="/enroll/:courseId"
  element={<Enrollment />}
/>

      {/* My Courses */}
      <Route
        path="/my-courses"
        element={<MyCourses />}
      />

      {/* =========================
          Learning
      ========================== */}

      <Route
        path="/learn/:courseId"
        element={<Learn />}
      />

      <Route
        path="/lesson/:lessonId"
        element={<Lesson />}
      />

      {/* =========================
          Tests
      ========================== */}

      <Route
        path="/tests/:courseId"
        element={<Test />}
      />

      <Route
        path="/results"
        element={<Results />}
      />

      {/* =========================
          Progress
      ========================== */}

      <Route
        path="/progress"
        element={<Progress />}
      />

      {/* =========================
          Profile
      ========================== */}

      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* =========================
          Support
      ========================== */}

      <Route
        path="/support"
        element={<Support />}
      />

      <Route
        path="/support-requests"
        element={<SupportRequests />}
      />

      {/* =========================
          Legal
      ========================== */}

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />

      {/* =========================
          Unknown Route
      ========================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}