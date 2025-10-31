import React, { useState, useEffect } from "react";
import "./Jobs.css";

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

type SortField = "title" | "company" | "dateApplied" | "status" | "priority";
type SortOrder = "asc" | "desc";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [priority, setPriority] = useState<Job["priority"]>("Medium");
  const [notes, setNotes] = useState("");

  // UI state
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [sortField, setSortField] = useState<SortField>("dateApplied");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [darkMode, setDarkMode] = useState(false);

  // Load jobs from localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      const parsed = JSON.parse(storedJobs);
      setJobs(parsed);
    }

    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) setDarkMode(JSON.parse(storedDarkMode));
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Filter and sort jobs
  useEffect(() => {
    let result = [...jobs];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "All") {
      result = result.filter((job) => job.status === filterStatus);
    }

    // Priority filter
    if (filterPriority !== "All") {
      result = result.filter((job) => job.priority === filterPriority);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === "dateApplied") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredJobs(result);
  }, [jobs, searchTerm, filterStatus, filterPriority, sortField, sortOrder]);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    const newJob: Job = {
      id: Date.now(),
      title,
      company,
      location,
      salary,
      jobUrl,
      contactPerson,
      contactEmail,
      dateApplied: new Date().toISOString().split("T")[0],
      status,
      priority,
      notes,
    };

    setJobs([...jobs, newJob]);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setSalary("");
    setJobUrl("");
    setContactPerson("");
    setContactEmail("");
    setStatus("Applied");
    setPriority("Medium");
    setNotes("");
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

  // Export and import functionality removed

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getStats = () => {
    return {
      total: jobs.length,
      applied: jobs.filter((j) => j.status === "Applied").length,
      interview: jobs.filter((j) => j.status === "Interview").length,
      offered: jobs.filter((j) => j.status === "Offered").length,
      rejected: jobs.filter((j) => j.status === "Rejected").length,
      highPriority: jobs.filter((j) => j.priority === "High").length,
    };
  };

  const stats = getStats();

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Job Application Tracker</h1>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Statistics Dashboard */}
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>{stats.total}</h3>
          <p>Total Applications</p>
        </div>
        <div className="stat-card applied">
          <h3>{stats.applied}</h3>
          <p>Applied</p>
        </div>
        <div className="stat-card interview">
          <h3>{stats.interview}</h3>
          <p>Interviews</p>
        </div>
        <div className="stat-card offered">
          <h3>{stats.offered}</h3>
          <p>Offers</p>
        </div>
        <div className="stat-card rejected">
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
        <div className="stat-card priority">
          <h3>{stats.highPriority}</h3>
          <p>High Priority</p>
        </div>
      </div>

      {/* Add Job Form */}
      <div className="form-section">
        <h2>Add New Application</h2>
        <form onSubmit={handleAddJob} className="job-form">
          <div className="form-grid">
            <input
              type="text"
              placeholder="Job Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Company *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Salary Range"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <input
              type="url"
              placeholder="Job URL"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
            <input
              type="email"
              placeholder="Contact Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Job["status"])}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Job["priority"])}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
          <button type="submit" className="btn-primary">
            Add Application
          </button>
        </form>
      </div>

      {/* Filters and Search */}
      <div className="controls-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder=" Search by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        {/* Export/Import buttons removed */}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="empty-state">
          <p>
            No jobs found.{" "}
            {searchTerm || filterStatus !== "All" || filterPriority !== "All"
              ? "Try adjusting your filters."
              : "Add your first application above!"}
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("title")} className="sortable">
                  Title{" "}
                  {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("company")} className="sortable">
                  Company{" "}
                  {sortField === "company" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Location</th>
                <th
                  onClick={() => handleSort("dateApplied")}
                  className="sortable"
                >
                  Date{" "}
                  {sortField === "dateApplied" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("status")} className="sortable">
                  Status{" "}
                  {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("priority")} className="sortable">
                  Priority{" "}
                  {sortField === "priority" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location || "-"}</td>
                  <td>{job.dateApplied}</td>
                  <td>
                    <span
                      className={`status-badge status-${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`priority-badge priority-${job.priority.toLowerCase()}`}
                    >
                      {job.priority}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => setViewingJob(job)}
                      className="btn-view"
                      title="View Details"
                    >
                      
                    </button>
                    <button
                      onClick={() => handleEditJob(job)}
                      className="btn-edit"
                      title="Edit"
                    >
                      
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="btn-delete"
                      title="Delete"
                    >
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Job Modal */}
      {viewingJob && (
        <div className="modal-overlay" onClick={() => setViewingJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{viewingJob.title}</h2>
              <button onClick={() => setViewingJob(null)} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Company:</strong> {viewingJob.company}
              </div>
              <div className="detail-row">
                <strong>Location:</strong> {viewingJob.location || "N/A"}
              </div>
              <div className="detail-row">
                <strong>Salary:</strong> {viewingJob.salary || "N/A"}
              </div>
              <div className="detail-row">
                <strong>Date Applied:</strong> {viewingJob.dateApplied}
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span
                  className={`status-badge status-${viewingJob.status.toLowerCase()}`}
                >
                  {viewingJob.status}
                </span>
              </div>
              <div className="detail-row">
                <strong>Priority:</strong>
                <span
                  className={`priority-badge priority-${viewingJob.priority.toLowerCase()}`}
                >
                  {viewingJob.priority}
                </span>
              </div>
              {viewingJob.jobUrl && (
                <div className="detail-row">
                  <strong>Job URL:</strong>
                  <a
                    href={viewingJob.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Posting
                  </a>
                </div>
              )}
              {viewingJob.contactPerson && (
                <div className="detail-row">
                  <strong>Contact Person:</strong> {viewingJob.contactPerson}
                </div>
              )}
              {viewingJob.contactEmail && (
                <div className="detail-row">
                  <strong>Contact Email:</strong>
                  <a href={`mailto:${viewingJob.contactEmail}`}>
                    {viewingJob.contactEmail}
                  </a>
                </div>
              )}
              {viewingJob.notes && (
                <div className="detail-row">
                  <strong>Notes:</strong>
                  <p className="notes-text">{viewingJob.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="modal-overlay" onClick={() => setEditingJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Application</h2>
              <button onClick={() => setEditingJob(null)} className="close-btn">
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateJob} className="modal-form">
              <input
                type="text"
                value={editingJob.title}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, title: e.target.value })
                }
                placeholder="Job Title"
                required
              />
              <input
                type="text"
                value={editingJob.company}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, company: e.target.value })
                }
                placeholder="Company"
                required
              />
              <input
                type="text"
                value={editingJob.location}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, location: e.target.value })
                }
                placeholder="Location"
              />
              <input
                type="text"
                value={editingJob.salary}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, salary: e.target.value })
                }
                placeholder="Salary Range"
              />
              <input
                type="url"
                value={editingJob.jobUrl}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, jobUrl: e.target.value })
                }
                placeholder="Job URL"
              />
              <input
                type="text"
                value={editingJob.contactPerson}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    contactPerson: e.target.value,
                  })
                }
                placeholder="Contact Person"
              />
              <input
                type="email"
                value={editingJob.contactEmail}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, contactEmail: e.target.value })
                }
                placeholder="Contact Email"
              />
              <select
                value={editingJob.status}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    status: e.target.value as Job["status"],
                  })
                }
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={editingJob.priority}
                onChange={(e) =>
                  setEditingJob({
                    ...editingJob,
                    priority: e.target.value as Job["priority"],
                  })
                }
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <textarea
                value={editingJob.notes}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, notes: e.target.value })
                }
                placeholder="Notes"
                rows={4}
              />
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
