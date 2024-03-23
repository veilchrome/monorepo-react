import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.name}</h3>
      <p>{job.description}</p>
      <span>Salary: {job.salary}</span>
    </div>
  );
};

export default JobCard;
