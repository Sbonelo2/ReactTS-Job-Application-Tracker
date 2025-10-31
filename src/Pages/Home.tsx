import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobUrl: string;
  contactPerson: string;
  contactEmail: string;
  dateApplied: string;
  status: "Applied" | "Interview" | "Offered" | "Rejected";
  priority: "Low" | "Medium" | "High";
  notes: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      const parsed = JSON.parse(storedJobs);
      setJobs(parsed);
      
      // Get 5 most recent jobs
      const sorted = [...parsed].sort((a, b) => 
        new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
      );
      setRecentJobs(sorted.slice(0, 5));
    }
  }, []);

  const totalJobs = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interviews = jobs.filter((job) => job.status === "Interview").length;
  const offers = jobs.filter((job) => job.status === "Offered").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;
  const highPriority = jobs.filter((job) => job.priority === "High").length;

  const successRate = totalJobs > 0 ? ((offers / totalJobs) * 100).toFixed(1) : 0;
  const interviewRate = totalJobs > 0 ? ((interviews / totalJobs) * 100).toFixed(1) : 0;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Your Job Application Tracker! </h1>
        <p className="hero-subtitle">
          Stay organized and track your job search journey with ease
        </p>
      </div>

      <div className="stats-overview">
        <div className="stat-box total">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{totalJobs}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        
        <div className="stat-box applied">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{applied}</h3>
            <p>Applied</p>
          </div>
        </div>
        
        <div className="stat-box interview">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{interviews}</h3>
            <p>Interviews</p>
          </div>
        </div>
        
        <div className="stat-box offered">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{offers}</h3>
            <p>Offers</p>
          </div>
        </div>
        
        <div className="stat-box rejected">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
        
        <div className="stat-box priority">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>{highPriority}</h3>
            <p>High Priority</p>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <div className="insight-card">
          <h3>Success Rate</h3>
          <div className="progress-circle">
            <span className="percentage">{successRate}%</span>
          </div>
          <p>Offers received from applications</p>
        </div>
        
        <div className="insight-card">
          <h3>Interview Rate</h3>
          <div className="progress-circle">
            <span className="percentage">{interviewRate}%</span>
          </div>
          <p>Applications leading to interviews</p>
        </div>
        
        <div className="insight-card">
          <h3>Active Applications</h3>
          <div className="progress-circle">
            <span className="percentage">{applied + interviews}</span>
          </div>
          <p>Currently in progress</p>
        </div>
      </div>

      {recentJobs.length > 0 && (
        <div className="recent-section">
          <h2>Recent Applications</h2>
          <div className="recent-jobs">
            {recentJobs.map((job) => (
              <div key={job.id} className="recent-job-card">
                <div className="job-header">
                  <h4>{job.title}</h4>
                  <span className={`status-badge status-${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>
                <p className="company-name">{job.company}</p>
                {job.location && <p className="job-location">📍 {job.location}</p>}
                <p className="job-date">Applied: {job.dateApplied}</p>
                {job.priority === "High" && (
                  <span className="priority-indicator"> High Priority</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/jobs" className="action-btn primary">
            <span className="btn-icon"></span>
            <span className="btn-text">
              <strong>View All Jobs</strong>
              <small>Manage your applications</small>
            </span>
          </Link>
          
          <Link to="/jobs" className="action-btn secondary">
            <span className="btn-icon"></span>
            <span className="btn-text">
              <strong>Add New Application</strong>
              <small>Track a new opportunity</small>
            </span>
          </Link>
          
          <Link to="/login" className="action-btn tertiary">
            <span className="btn-icon"></span>
            <span className="btn-text">
              <strong>Login</strong>
              <small>Access your account</small>
            </span>
          </Link>
          
          <Link to="/registration" className="action-btn tertiary">
            <span className="btn-icon"></span>
            <span className="btn-text">
              <strong>Register</strong>
              <small>Create new account</small>
            </span>
          </Link>
        </div>
      </div>

      {totalJobs === 0 && (
        <div className="getting-started">
          <h2>Getting Started </h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Add Your First Application</h3>
              <p>Click on "Jobs Tracker" and add details about your job application</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Track Your Progress</h3>
              <p>Update the status as you move through the application process</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Stay Organized</h3>
              <p>Use filters, search, and export features to manage your job hunt</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import "./Home.css";

// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   dateApplied: string;
//   status: "Applied" | "Interview" | "Offered" | "Rejected";
// }

// export default function Home() {
//   const [jobs, setJobs] = useState<Job[]>([]);

//   // localStorage
//   useEffect(() => {
//     const storedJobs = localStorage.getItem("jobs");
//     if (storedJobs) {
//       setJobs(JSON.parse(storedJobs));
//     }
//   }, []);

//   const totalJobs = jobs.length;
//   const applied = jobs.filter((job) => job.status === "Applied").length;
//   const interviews = jobs.filter((job) => job.status === "Interview").length;
//   const offers = jobs.filter((job) => job.status === "Offered").length;
//   const rejected = jobs.filter((job) => job.status === "Rejected").length;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Welcome, To Your Diary!</h1>
//       <p>Track your job applications easily.</p>

//       <h2>Your Stats</h2>
//       <ul>
//         <li>Total Jobs: {totalJobs}</li>
//         <li>Applied: {applied}</li>
//         <li>Interviews: {interviews}</li>
//         <li>Offers: {offers}</li>
//         <li>Rejected: {rejected}</li>
//       </ul>

//       <h2>Quick Links</h2>
//       <nav style={{ display: "flex", gap: "10px" }}>
//         <Link to="/login">Login</Link>
//         <Link to="/registration">Register</Link>
//         <Link to="/jobs">Jobs Tracker</Link>
//       </nav>
//     </div>
//   );
// }
