import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobPost from "./pages/JobPost";
import JobList from "./pages/JobList";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-post" element={<JobPost />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job-post" element={ <ProtectedRoute > <JobPost /> </ProtectedRoute >}/>
      </Routes>
    </BrowserRouter>
  );
}
