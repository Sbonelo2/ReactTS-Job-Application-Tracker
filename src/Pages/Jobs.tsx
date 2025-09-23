import React, { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  dateApplied: string;
  status: "Applied" | "Interview" | "Offered" | "Rejected";
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Load jobs from localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) setJobs(JSON.parse(storedJobs));
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    const newJob: Job = {
      id: Date.now(),
      title,
      company,
      dateApplied: new Date().toLocaleDateString(),
      status,
    };

    setJobs([...jobs, newJob]);
    setTitle("");
    setCompany("");
    setStatus("Applied");
  };

  const handleDeleteJob = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
  };

  const handleUpdateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    setJobs(jobs.map((job) => (job.id === editingJob.id ? editingJob : job)));
    setEditingJob(null);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Job Application Tracker</h2>

      {/* Add Job Form */}
      <form onSubmit={handleAddJob} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "8px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "8px", width: "200px" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Job["status"])}
          style={{ padding: "8px", marginRight: "8px" }}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add Job
        </button>
      </form>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <p>No jobs tracked yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Company</th>
              <th style={{ padding: "8px", textAlign: "left" }}>
                Date Applied
              </th>
              <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{job.title}</td>
                <td style={{ padding: "8px" }}>{job.company}</td>
                <td style={{ padding: "8px" }}>{job.dateApplied}</td>
                <td style={{ padding: "8px" }}>{job.status}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    onClick={() => handleEditJob(job)}
                    style={{
                      padding: "4px 8px",
                      marginRight: "4px",
                      backgroundColor: "#2196F3",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div
          id="editJobModal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleUpdateJob}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>Edit Job</h3>
            <input
              type="text"
              value={editingJob.title}
              onChange={(e) =>
                setEditingJob({ ...editingJob, title: e.target.value })
              }
              placeholder="Job Title"
              required
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <input
              type="text"
              value={editingJob.company}
              onChange={(e) =>
                setEditingJob({ ...editingJob, company: e.target.value })
              }
              placeholder="Company"
              required
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <select
              value={editingJob.status}
              onChange={(e) =>
                setEditingJob({
                  ...editingJob,
                  status: e.target.value as Job["status"],
                })
              }
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div style={{ textAlign: "right" }}>
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                style={{
                  marginRight: "8px",
                  padding: "6px 12px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

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
