import api from "../services/api";

// Student & Employer görebilir
export const getAllJobs = () => {
   return api.get("/jobs");
};

// Employer
export const createJob = (jobData) => {
  return api.get("/jobs", jobData);
};

// Employer
export const deleteJob = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};
