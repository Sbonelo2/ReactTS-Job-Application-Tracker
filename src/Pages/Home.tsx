import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./Home.css"; 

interface Job {
  id: number;
  title: string;
  company: string;
  dateApplied: string;
  status: "Applied" | "Interview" | "Offered" | "Rejected";
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  const totalJobs = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interviews = jobs.filter((job) => job.status === "Interview").length;
  const offers = jobs.filter((job) => job.status === "Offered").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;

  return (
    <div className="home">
      <h1>Welcome, To Your Diary!</h1>
      <p>Track your job applications easily.</p>

      <h2>Your Stats</h2>
      <ul>
        <li>Total Jobs: {totalJobs}</li>
        <li>Applied: {applied}</li>
        <li>Interviews: {interviews}</li>
        <li>Offers: {offers}</li>
        <li>Rejected: {rejected}</li>
      </ul>

      <h2>Quick Links</h2>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/registration">Register</Link>
        <Link to="/jobs">Jobs Tracker</Link>
      </nav>
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
