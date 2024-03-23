import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/jobs?page=${currentPage}&pageSize=${pageSize}`
        );
        const { jobs: fetchedJobs, totalJobs } = response.data;
        setJobs(fetchedJobs);
        setTotalPages(Math.ceil(totalJobs / pageSize));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [currentPage, pageSize]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {totalPages > 1 && (
        <div>
          <button onClick={prevPage}>Previous</button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage}>Next</button>
        </div>
      )}
    </div>
  );
};

export default JobList;
