import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import JobPost from "./pages/employer/JobPost";
import EmployerApplications from "./pages/employer/EmployerApplications";

import StudentDashboard from "./pages/student/StudentDashboard";
import UploadResume from "./pages/student/UploadResume";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import EmployerDashboard from "./pages/employer/EmployerDashboard";


export default function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR ROUTES DIŞINDA OLUR */}
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/upload-resume"
          element={
            <ProtectedRoute role="student">
              <UploadResume />
            </ProtectedRoute>
          }
        />

        {/* Employer */}
        <Route
          path="/employer/job-post"
          element={
            <ProtectedRoute role="employer">
              <JobPost />
            </ProtectedRoute>
          }
        />

        <Route
        path="/employer"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

        <Route
          path="/employer/applications"
          element={
            <ProtectedRoute role="employer">
              <EmployerApplications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
