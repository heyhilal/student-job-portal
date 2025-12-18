import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobPost from "./pages/JobPost";
import JobList from "./pages/JobList";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadResume from "./pages/UploadResume";
import EmployerApplications from "./pages/EmployerApplications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employer routes */}
        <Route
          path="/job-post"
          element={
            <ProtectedRoute role="employer">
              <JobPost />
            </ProtectedRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute role="student">
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
        path="/upload-resume"
        element={
          <ProtectedRoute role="student">
            <UploadResume />
          </ProtectedRoute>
        }
      />
      <Route
      path="/applications"
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
