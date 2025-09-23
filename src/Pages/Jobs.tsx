




























// import React, { useState, useEffect } from "react";


// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
//   description: string;
// }


// const JobCard: React.FC<{ job: Job }> = ({ job }) => {
//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         padding: "16px",
//         marginBottom: "16px",
//         boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
//         transition: "transform 0.2s",
//       }}
//       className="job-card"
//     >
//       <h3 style={{ marginBottom: "8px" }}>{job.title}</h3>
//       <p style={{ margin: "4px 0", fontWeight: "bold" }}>{job.company}</p>
//       <p style={{ margin: "4px 0", color: "#555" }}>{job.location}</p>
//       <p style={{ margin: "8px 0" }}>{job.description}</p>
//       <button
//         style={{
//           backgroundColor: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           padding: "8px 12px",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Apply
//       </button>
//     </div>
//   );
// };

// export default function Jobs() {
//   const [jobs, setJobs] = useState<Job[]>([]);

  
//   useEffect(() => {
//     const fetchJobs = async () => {
      
//       const sampleJobs: Job[] = [
//         {
//           id: 1,
//           title: "Frontend Developer",
//           company: "Tech Solutions",
//           location: "Pietermaritzburg",
//           description:
//             "Build responsive web applications using React and JavaScript.",
//         },
//         {
//           id: 2,
//           title: "Business Analyst Intern",
//           company: "Innovative Systems",
//           location: "Durban",
//           description: "Analyze business requirements and design IT solutions.",
//         },
//         {
//           id: 3,
//           title: "IT Support Technician",
//           company: "Global Tech",
//           location: "Johannesburg",
//           description: "Provide IT support and troubleshoot technical issues.",
//         },
//       ];

//       setJobs(sampleJobs);
//     };

//     fetchJobs();
//   }, []);

//   return (
//     <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
//       <h2 style={{ marginBottom: "1.5rem" }}>Available Jobs</h2>
//       {jobs.length === 0 ? (
//         <p>Loading jobs...</p>
//       ) : (
//         jobs.map((job) => <JobCard key={job.id} job={job} />)
//       )}
//     </div>
//   );
// }
