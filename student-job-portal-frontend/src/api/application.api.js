import api from "../services/api";

export const applyToJob = (jobId) =>
  api.post("/applications", { jobId });

export const getEmployerApplications = () =>
  api.get("/applications/employer");

export const updateApplicationStatus = (id, status) =>
  api.patch(`/applications/${id}`, { status });

export const getStudentApplications = () =>
  api.get("/applications/student");
