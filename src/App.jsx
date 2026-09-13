import { useMemo, useState } from "react";
import "./App.css";
import hireflowLogo from "./assets/hireflow-logo.png";

const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"];

const initialCandidates = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    role: "Frontend Developer",
    experience: "2 years",
    skills: ["React", "JavaScript", "CSS"],
    status: "Screening",
    match: 94,
    applied: "Sep 13, 2026",
    notes: "Strong frontend fundamentals. Good communication skills.",
    interview: null,
  },
  {
    id: 2,
    name: "Meera Kapoor",
    email: "meera.kapoor@email.com",
    role: "Product Designer",
    experience: "3 years",
    skills: ["Figma", "UX Research", "Prototyping"],
    status: "Interview",
    match: 91,
    applied: "Sep 12, 2026",
    notes: "Excellent portfolio with strong product thinking.",
    interview: {
      date: "2026-09-15",
      time: "11:00",
      type: "Video Interview",
    },
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan.verma@email.com",
    role: "Backend Developer",
    experience: "4 years",
    skills: ["Node.js", "MongoDB", "Express"],
    status: "Applied",
    match: 86,
    applied: "Sep 11, 2026",
    notes: "Needs technical screening before moving forward.",
    interview: null,
  },
  {
    id: 4,
    name: "Ananya Singh",
    email: "ananya.singh@email.com",
    role: "HR Executive",
    experience: "2 years",
    skills: ["Recruitment", "Onboarding", "HRMS"],
    status: "Offer",
    match: 89,
    applied: "Sep 10, 2026",
    notes: "Good stakeholder management and recruitment experience.",
    interview: null,
  },
  {
    id: 5,
    name: "Kabir Malhotra",
    email: "kabir.malhotra@email.com",
    role: "Full Stack Developer",
    experience: "5 years",
    skills: ["React", "Node.js", "PostgreSQL"],
    status: "Hired",
    match: 97,
    applied: "Sep 09, 2026",
    notes: "Excellent technical profile. Strong ownership mindset.",
    interview: null,
  },
  {
    id: 6,
    name: "Ishita Nair",
    email: "ishita.nair@email.com",
    role: "Data Analyst",
    experience: "1 year",
    skills: ["SQL", "Excel", "Power BI"],
    status: "Screening",
    match: 82,
    applied: "Sep 08, 2026",
    notes: "Good analytical foundation. Verify dashboard experience.",
    interview: null,
  },
  {
    id: 7,
    name: "Aditya Mehta",
    email: "aditya.mehta@email.com",
    role: "Frontend Developer",
    experience: "3 years",
    skills: ["React", "TypeScript", "Tailwind"],
    status: "Interview",
    match: 93,
    applied: "Sep 07, 2026",
    notes: "Strong React experience and good UI implementation skills.",
    interview: null,
  },
  {
    id: 8,
    name: "Diya Joshi",
    email: "diya.joshi@email.com",
    role: "Talent Acquisition Specialist",
    experience: "4 years",
    skills: ["Sourcing", "ATS", "Interviewing"],
    status: "Applied",
    match: 88,
    applied: "Sep 06, 2026",
    notes: "Good recruitment exposure. Review sourcing metrics.",
    interview: null,
  },
  {
    id: 9,
    name: "Vivaan Gupta",
    email: "vivaan.gupta@email.com",
    role: "Backend Developer",
    experience: "3 years",
    skills: ["Java", "Spring Boot", "MySQL"],
    status: "Screening",
    match: 90,
    applied: "Sep 05, 2026",
    notes: "Strong Java profile. Schedule technical screening.",
    interview: null,
  },
  {
    id: 10,
    name: "Sara Khan",
    email: "sara.khan@email.com",
    role: "Product Manager",
    experience: "5 years",
    skills: ["Product Strategy", "Agile", "Roadmapping"],
    status: "Interview",
    match: 95,
    applied: "Sep 04, 2026",
    notes: "Strong product leadership and cross-functional experience.",
    interview: null,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [jobs, setJobs] = useState([
  {
    id: 1,
    title: "Frontend React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    openings: 2,
    status: "Open",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Bangalore",
    type: "Full-time",
    openings: 1,
    status: "Open",
  },
  {
    id: 3,
    title: "Talent Acquisition Intern",
    department: "Human Resources",
    location: "Hybrid",
    type: "Internship",
    openings: 3,
    status: "Paused",
  },
]);

const [showJobModal, setShowJobModal] = useState(false);

const [newJob, setNewJob] = useState({
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  openings: 1,
});

const [settings, setSettings] = useState({
  recruiterName: "Kundan Kumar",
  companyName: "HireFlow Technologies",
  emailNotifications: true,
  compactMode: false,
});
  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState("");

  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    skills: "",
  });

  const [interviewForm, setInterviewForm] = useState({
    date: "",
    time: "",
    type: "Video Interview",
  });

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [candidates, searchTerm, statusFilter]);

  const activeCandidates = candidates.filter(
    (candidate) => candidate.status !== "Hired"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  const hiredCount = candidates.filter(
    (candidate) => candidate.status === "Hired"
  ).length;

  const scheduledInterviews = candidates.filter(
    (candidate) => candidate.interview !== null
  );

  const openCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setEditedNotes(candidate.notes);
    setEditingNotes(false);
  };

  const closeCandidate = () => {
    setSelectedCandidate(null);
    setEditingNotes(false);
    setShowScheduleModal(false);
  };

  const updateCandidateStatus = (newStatus) => {
    if (!selectedCandidate) return;

    const updatedCandidate = {
      ...selectedCandidate,
      status: newStatus,
    };

    setCandidates((previousCandidates) =>
      previousCandidates.map((candidate) =>
        candidate.id === selectedCandidate.id ? updatedCandidate : candidate
      )
    );

    setSelectedCandidate(updatedCandidate);
  };

  const saveNotes = () => {
    if (!selectedCandidate) return;

    const updatedCandidate = {
      ...selectedCandidate,
      notes: editedNotes,
    };

    setCandidates((previousCandidates) =>
      previousCandidates.map((candidate) =>
        candidate.id === selectedCandidate.id ? updatedCandidate : candidate
      )
    );

    setSelectedCandidate(updatedCandidate);
    setEditingNotes(false);
  };

  const saveInterview = (event) => {
    event.preventDefault();

    if (!selectedCandidate) return;

    const updatedCandidate = {
      ...selectedCandidate,
      interview: {
        date: interviewForm.date,
        time: interviewForm.time,
        type: interviewForm.type,
      },
      status: "Interview",
    };

    setCandidates((previousCandidates) =>
      previousCandidates.map((candidate) =>
        candidate.id === selectedCandidate.id ? updatedCandidate : candidate
      )
    );

    setSelectedCandidate(updatedCandidate);
    setShowScheduleModal(false);
    setInterviewForm({
      date: "",
      time: "",
      type: "Video Interview",
    });
  };

  const addCandidate = (event) => {
    event.preventDefault();

    const candidateToAdd = {
      id: Date.now(),
      name: newCandidate.name,
      email: newCandidate.email,
      role: newCandidate.role,
      experience: newCandidate.experience,
      skills: newCandidate.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      status: "Applied",
      match: 78,
      applied: "Sep 13, 2026",
      notes: "New candidate. Recruiter review required.",
      interview: null,
    };

    setCandidates((previousCandidates) => [
      candidateToAdd,
      ...previousCandidates,
    ]);

    setNewCandidate({
      name: "",
      email: "",
      role: "",
      experience: "",
      skills: "",
    });

    setShowAddModal(false);
    setActivePage("Candidates");
  };

  const addJob = () => {
  if (
    !newJob.title.trim() ||
    !newJob.department.trim() ||
    !newJob.location.trim()
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const job = {
    id: Date.now(),
    ...newJob,
    openings: Number(newJob.openings),
    status: "Open",
  };

  setJobs((prevJobs) => [...prevJobs, job]);

  setNewJob({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    openings: 1,
  });

  setShowJobModal(false);
};

  const getFitLabel = (match) => {
    if (match >= 90) return "Excellent fit";
    if (match >= 80) return "Good fit";
    return "Needs review";
  };

  const getFitClass = (match) => {
    if (match >= 90) return "excellent";
    if (match >= 80) return "good";
    return "review";
  };

  const getStagePercentage = (stage) => {
    if (candidates.length === 0) return 0;

    return Math.round(
      (candidates.filter((candidate) => candidate.status === stage).length /
        candidates.length) *
        100
    );
  };

  const formatInterviewDate = (date) => {
    if (!date) return "Not selected";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderDashboard = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Recruitment overview</p>
          <h1>Good morning, Kundan 👋</h1>
          <p className="page-description">
            Here’s what’s happening across your hiring pipeline.
          </p>
        </div>

        <button className="primary-button" onClick={() => setShowAddModal(true)}>
          + Add candidate
        </button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon blue">◈</div>
          <div>
            <p>Active candidates</p>
            <h2>{String(activeCandidates).padStart(2, "0")}</h2>
            <span className="positive-text">↗ 12.5% this month</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon purple">▦</div>
          <div>
            <p>Open positions</p>
            <h2>08</h2>
            <span className="muted-text">Across 4 departments</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon orange">◷</div>
          <div>
            <p>Interviews</p>
            <h2>{String(interviewCount).padStart(2, "0")}</h2>
            <span className="muted-text">Candidates in interview</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon green">✓</div>
          <div>
            <p>Hires this month</p>
            <h2>{String(hiredCount).padStart(2, "0")}</h2>
            <span className="positive-text">Strong hiring momentum</span>
          </div>
        </div>
      </div>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2>Hiring pipeline</h2>
            <p>Track candidates as they move through the hiring process.</p>
          </div>

          <button
            className="text-button"
            onClick={() => setActivePage("Candidates")}
          >
            View all candidates →
          </button>
        </div>

        <div className="pipeline">
          {stages.map((stage) => {
            const stageCandidates = candidates.filter(
              (candidate) => candidate.status === stage
            );

            return (
              <div className="pipeline-column" key={stage}>
                <div className="pipeline-column-header">
                  <span>{stage}</span>
                  <strong>{stageCandidates.length}</strong>
                </div>

                <div className="pipeline-cards">
                  {stageCandidates.slice(0, 3).map((candidate) => (
                    <button
                      className="pipeline-candidate"
                      key={candidate.id}
                      onClick={() => openCandidate(candidate)}
                    >
                      <div className="candidate-avatar">
                        {candidate.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div className="pipeline-candidate-info">
                        <strong>{candidate.name}</strong>
                        <span>{candidate.role}</span>
                      </div>

                      <span className="mini-score">{candidate.match}%</span>
                    </button>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="empty-stage">No candidates</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2>Top candidate matches</h2>
            <p>High-potential candidates based on profile alignment.</p>
          </div>
        </div>

        <div className="top-candidate-list">
          {candidates
            .slice()
            .sort((a, b) => b.match - a.match)
            .slice(0, 4)
            .map((candidate) => (
              <button
                className="top-candidate-row"
                key={candidate.id}
                onClick={() => openCandidate(candidate)}
              >
                <div className="candidate-avatar large">
                  {candidate.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div className="candidate-main-info">
                  <strong>{candidate.name}</strong>
                  <span>{candidate.role}</span>
                </div>

                <span className={`fit-pill ${getFitClass(candidate.match)}`}>
                  {getFitLabel(candidate.match)}
                </span>

                <strong className="top-score">{candidate.match}%</strong>
              </button>
            ))}
        </div>
      </section>
    </>
  );

  const renderCandidates = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Talent pool</p>
          <h1>Candidate directory</h1>
          <p className="page-description">
            Search, review, and manage your candidate pipeline.
          </p>
        </div>

        <button className="primary-button" onClick={() => setShowAddModal(true)}>
          + Add candidate
        </button>
      </div>

      <section className="section-card">
        <div className="candidate-toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by candidate name or role..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All statuses</option>
            {stages.map((stage) => (
              <option value={stage} key={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div className="candidate-table">
          <div className="candidate-table-header">
            <span>Candidate</span>
            <span>Role</span>
            <span>Experience</span>
            <span>Match</span>
            <span>Status</span>
          </div>

          {filteredCandidates.map((candidate) => (
            <button
              className="candidate-table-row"
              key={candidate.id}
              onClick={() => openCandidate(candidate)}
            >
              <div className="table-candidate">
                <div className="candidate-avatar">
                  {candidate.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.email}</span>
                </div>
              </div>

              <span>{candidate.role}</span>
              <span>{candidate.experience}</span>
              <strong className="table-score">{candidate.match}%</strong>
              <span className={`status-badge ${candidate.status.toLowerCase()}`}>
                {candidate.status}
              </span>
            </button>
          ))}

          {filteredCandidates.length === 0 && (
            <div className="no-results">No candidates found.</div>
          )}
        </div>
      </section>
    </>
  );

  const renderInterviews = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Interview center</p>
          <h1>Upcoming interviews</h1>
          <p className="page-description">
            Manage your scheduled candidate conversations.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setActivePage("Candidates")}
        >
          Find candidate
        </button>
      </div>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2>Interview schedule</h2>
            <p>
              {scheduledInterviews.length} scheduled interview
              {scheduledInterviews.length === 1 ? "" : "s"} in your workspace.
            </p>
          </div>
        </div>

        {scheduledInterviews.length > 0 ? (
          <div className="interview-list">
            {scheduledInterviews.map((candidate) => (
              <button
                className="interview-row"
                key={candidate.id}
                onClick={() => openCandidate(candidate)}
              >
                <div className="interview-date">
                  <strong>
                    {new Date(
                      `${candidate.interview.date}T00:00:00`
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                    })}
                  </strong>
                  <span>
                    {new Date(
                      `${candidate.interview.date}T00:00:00`
                    ).toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>
                </div>

                <div className="interview-details">
                  <strong>{candidate.name}</strong>
                  <span>{candidate.role}</span>
                  <small>
                    {candidate.interview.type} · {candidate.interview.time}
                  </small>
                </div>

                <span className="status-badge interview">Scheduled</span>
                <span className="interview-arrow">→</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-interviews">
            <div className="placeholder-icon">◷</div>
            <h3>No interviews scheduled</h3>
            <p>
              Open a candidate profile and schedule your first interview.
            </p>
            <button
              className="primary-button"
              onClick={() => setActivePage("Candidates")}
            >
              Browse candidates
            </button>
          </div>
        )}
      </section>
    </>
  );

  const renderAnalytics = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Recruitment intelligence</p>
          <h1>Hiring analytics</h1>
          <p className="page-description">
            Understand the health of your candidate pipeline.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <section className="section-card">
          <div className="section-header">
            <div>
              <h2>Pipeline distribution</h2>
              <p>Candidate volume across every hiring stage.</p>
            </div>
          </div>

          <div className="analytics-stage-list">
            {stages.map((stage) => {
              const count = candidates.filter(
                (candidate) => candidate.status === stage
              ).length;
if (showWelcome) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <img
          src={hireflowLogo}
          alt="HireFlow logo"
          className="welcome-logo"
        />

        <p className="welcome-label">TALENT INTELLIGENCE</p>

        <h1>Welcome to HireFlow</h1>

        <p className="welcome-description">
          Discover smarter hiring, manage talent effortlessly,
          and build the future of your team.
        </p>

        <button
          className="welcome-button"
          onClick={() => setShowWelcome(false)}
        >
          Enter Dashboard →
        </button>
      </div>
    </div>
  );
}
              return (
                <div className="analytics-stage" key={stage}>
                  <div className="analytics-stage-top">
                    <span>{stage}</span>
                    <strong>
                      {count} candidate{count === 1 ? "" : "s"}
                    </strong>
                  </div>

                  <div className="analytics-bar">
                    <div
                      className={`analytics-bar-fill ${stage.toLowerCase()}`}
                      style={{ width: `${getStagePercentage(stage)}%` }}
                    ></div>
                  </div>

                  <small>{getStagePercentage(stage)}% of total pipeline</small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section-card">
          <div className="section-header">
            <div>
              <h2>Recruitment snapshot</h2>
              <p>Quick performance indicators.</p>
            </div>
          </div>

          <div className="analytics-metric-list">
            <div className="analytics-metric">
              <span>Total candidates</span>
              <strong>{candidates.length}</strong>
            </div>

            <div className="analytics-metric">
              <span>Interview rate</span>
              <strong>
                {candidates.length
                  ? Math.round((interviewCount / candidates.length) * 100)
                  : 0}
                %
              </strong>
            </div>

            <div className="analytics-metric">
              <span>Hire rate</span>
              <strong>
                {candidates.length
                  ? Math.round((hiredCount / candidates.length) * 100)
                  : 0}
                %
              </strong>
            </div>

            <div className="analytics-metric">
              <span>Average match score</span>
              <strong>
                {candidates.length
                  ? Math.round(
                      candidates.reduce(
                        (total, candidate) => total + candidate.match,
                        0
                      ) / candidates.length
                    )
                  : 0}
                %
              </strong>
            </div>
          </div>
        </section>
      </div>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h2>Recruiter insights</h2>
            <p>Suggested actions based on your current pipeline.</p>
          </div>
        </div>

        <div className="insight-grid">
          <div className="insight-card">
            <span className="insight-icon">✦</span>
            <strong>Prioritize high-fit candidates</strong>
            <p>
              Review candidates with match scores above 90% before your next
              hiring meeting.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-icon">◷</span>
            <strong>Keep interviews moving</strong>
            <p>
              Schedule interviews for candidates currently waiting in the
              screening stage.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-icon">✓</span>
            <strong>Track conversion quality</strong>
            <p>
              Compare the number of candidates entering the pipeline with the
              number reaching the hired stage.
            </p>
          </div>
        </div>
      </section>
    </>
  );


  const renderJobs = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Recruitment workspace</p>
          <h1>Job openings</h1>
          <p className="page-description">
            Manage active roles and hiring requirements.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowJobModal(true)}
        >
          + Add job
        </button>
      </div>

      <div className="job-stats-grid">
        <div className="kpi-card">
          <div className="kpi-icon blue">▤</div>
          <div>
            <p>Total roles</p>
            <h2>{jobs.length}</h2>
            <span className="muted-text">Across your workspace</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon green">✓</div>
          <div>
            <p>Open roles</p>
            <h2>{jobs.filter((job) => job.status === "Open").length}</h2>
            <span className="muted-text">Currently hiring</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon purple">◈</div>
          <div>
            <p>Total positions</p>
            <h2>{jobs.reduce((total, job) => total + job.openings, 0)}</h2>
            <span className="muted-text">Planned openings</span>
          </div>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <article className="job-card" key={job.id}>
            <div className="job-card-top">
              <div className="job-icon">⌘</div>
              <span
                className={`status-badge ${
                  job.status === "Open" ? "status-open" : "status-paused"
                }`}
              >
                {job.status}
              </span>
            </div>

            <h3>{job.title}</h3>
            <p className="job-department">{job.department}</p>

            <div className="job-details">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>👥 {job.openings} opening(s)</span>
            </div>

            <button
              className="secondary-button job-status-button"
              onClick={() =>
                setJobs((previousJobs) =>
                  previousJobs.map((item) =>
                    item.id === job.id
                      ? {
                          ...item,
                          status: item.status === "Open" ? "Paused" : "Open",
                        }
                      : item
                  )
                )
              }
            >
              {job.status === "Open" ? "Pause hiring" : "Resume hiring"}
            </button>
          </article>
        ))}
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace preferences</p>
          <h1>Settings</h1>
          <p className="page-description">
            Personalize your HireFlow workspace.
          </p>
        </div>
      </div>

      <section className="settings-panel">
        <div className="settings-section">
          <h3>Recruiter profile</h3>

          <label>
            Recruiter name
            <input
              className="form-input"
              value={settings.recruiterName}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  recruiterName: event.target.value,
                })
              }
            />
          </label>

          <label>
            Company name
            <input
              className="form-input"
              value={settings.companyName}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  companyName: event.target.value,
                })
              }
            />
          </label>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>

          <label className="setting-toggle-row">
            <span>
              <strong>Email notifications</strong>
              <small>Receive updates about interviews and candidates.</small>
            </span>

            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  emailNotifications: event.target.checked,
                })
              }
            />
          </label>
        </div>

        <div className="settings-section">
          <h3>Interface</h3>

          <label className="setting-toggle-row">
            <span>
              <strong>Compact mode</strong>
              <small>Use tighter spacing across the dashboard.</small>
            </span>

            <input
              type="checkbox"
              checked={settings.compactMode}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  compactMode: event.target.checked,
                })
              }
            />
          </label>
        </div>

        <button
          className="primary-button"
          onClick={() => alert("Settings saved successfully.")}
        >
          Save settings
        </button>
      </section>
    </>
  );

  const renderPlaceholder = () => (
    <div className="placeholder-page">
      <div className="placeholder-icon">✦</div>
      <h1>{activePage}</h1>
      <p>
        This section is ready for the next HireFlow development step.
      </p>
      <button
        className="primary-button"
        onClick={() => setActivePage("Dashboard")}
      >
        Return to dashboard
      </button>
    </div>
  );

  if (showWelcome) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
         <img
    src={hireflowLogo}
    alt="HireFlow logo"
    className="welcome-logo"
  />
        <h1>Welcome to HireFlow</h1>

        <p className="welcome-label">
          THE FUTURE OF HIRING
        </p>

        <p className="welcome-description">
          Discover smarter hiring, manage talent effortlessly,
          and build the future of your team.
        </p>

        <button
          className="welcome-button"
          onClick={() => setShowWelcome(false)}
        >
          Enter Dashboard →
        </button>
      </div>
    </div>
  );
}
  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">H</div>
          <div>
            <strong>HireFlow</strong>
            <span>Talent intelligence</span>
          </div>
        </div>

        <div className="sidebar-label">Workspace</div>

        <nav className="sidebar-nav">
          {[
            ["⌂", "Dashboard"],
            ["♙", "Candidates"],
            ["▤", "Job openings"],
            ["◷", "Interviews"],
            ["⌁", "Analytics"],
            ["⚙", "Settings"],
          ].map(([icon, label]) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => setActivePage(label)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="workspace-card">
            <div className="workspace-card-icon">✦</div>
            <div>
              <strong>Hiring workspace</strong>
              <span>Premium demo mode</span>
            </div>
          </div>

          <div className="profile-mini">
            <div className="profile-avatar">KK</div>
            <div>
              <strong>Kundan Kumar</strong>
              <span>Recruiter</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>

          <div className="topbar-actions">
            <button
              className="icon-button"
              onClick={() => setDarkMode((previous) => !previous)}
              title="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <div className="notification-wrapper">
  <button
    className="notification-button"
    title="Notifications"
    onClick={() => setShowNotifications((previous) => !previous)}
  >
    ♧
    <span></span>
  </button>

  {showNotifications && (
    <div className="notification-popup">
      <div className="notification-popup-header">
        <strong>Notifications</strong>

        <button
          className="notification-close"
          onClick={() => setShowNotifications(false)}
        >
          ×
        </button>
      </div>

      <div className="notification-item">
        <span className="notification-dot blue-dot"></span>

        <div>
          <strong>New candidate added</strong>
          <p>A new candidate is waiting for review.</p>
          <small>Just now</small>
        </div>
      </div>

      <div className="notification-item">
        <span className="notification-dot purple-dot"></span>

        <div>
          <strong>Interview scheduled</strong>
          <p>Your interview calendar has been updated.</p>
          <small>5 minutes ago</small>
        </div>
      </div>

      <div className="notification-item">
        <span className="notification-dot green-dot"></span>

        <div>
          <strong>Hiring progress update</strong>
          <p>Your recruitment pipeline is moving forward.</p>
          <small>Today</small>
        </div>
      </div>
    </div>
  )}
</div>

            <div className="topbar-avatar">KK</div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Dashboard" && renderDashboard()}
          {activePage === "Candidates" && renderCandidates()}
          {activePage === "Interviews" && renderInterviews()}
          {activePage === "Analytics" && renderAnalytics()}
          {activePage === "Job openings" && renderJobs()}
          {activePage === "Settings" && renderSettings()}
          
          {![
            "Dashboard",
            "Candidates",
            "Interviews",
            "Analytics",
            "Job openings",
            "Settings",
          ].includes(activePage) && renderPlaceholder()}
        </div>
      </main>

      {selectedCandidate && (
        <div className="modal-backdrop" onClick={closeCandidate}>
          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profile-modal-header">
              <div className="profile-identity">
                <div className="candidate-avatar profile-avatar-large">
                  {selectedCandidate.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <p className="eyebrow">Candidate profile</p>
                  <h2>{selectedCandidate.name}</h2>
                  <p>{selectedCandidate.role}</p>
                </div>
              </div>

              <button className="close-button" onClick={closeCandidate}>
                ×
              </button>
            </div>

            <div className="profile-contact-row">
              <span>✉ {selectedCandidate.email}</span>
              <span>◷ Applied {selectedCandidate.applied}</span>
            </div>

            <div className="profile-status-row">
              <label>
                Hiring stage
                <select
                  value={selectedCandidate.status}
                  onChange={(event) =>
                    updateCandidateStatus(event.target.value)
                  }
                >
                  {stages.map((stage) => (
                    <option value={stage} key={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="field-label">Experience</span>
                <strong>{selectedCandidate.experience}</strong>
              </div>
            </div>

            <div className="fit-snapshot">
              <div className="section-header compact">
                <div>
                  <h3>Candidate Fit Snapshot</h3>
                  <p>Estimated alignment with the selected role.</p>
                </div>

                <div className={`fit-score ${getFitClass(selectedCandidate.match)}`}>
                  {selectedCandidate.match}%
                </div>
              </div>

              <div className="fit-progress">
                <div
                  className={`fit-progress-fill ${getFitClass(
                    selectedCandidate.match
                  )}`}
                  style={{ width: `${selectedCandidate.match}%` }}
                ></div>
              </div>

              <div className="fit-breakdown">
                <div>
                  <span>Skill alignment</span>
                  <strong>
                    {Math.min(99, selectedCandidate.match + 1)}%
                  </strong>
                </div>

                <div>
                  <span>Experience fit</span>
                  <strong>
                    {Math.max(70, selectedCandidate.match - 4)}%
                  </strong>
                </div>

                <div>
                  <span>Role fit</span>
                  <strong>
                    {Math.max(72, selectedCandidate.match - 2)}%
                  </strong>
                </div>
              </div>

              <div className={`fit-recommendation ${getFitClass(selectedCandidate.match)}`}>
                <strong>{getFitLabel(selectedCandidate.match)}</strong>
                <span>
                  {selectedCandidate.match >= 90
                    ? "Prioritize this candidate for the next hiring step."
                    : selectedCandidate.match >= 80
                    ? "Proceed with screening and validate key skills."
                    : "Review the profile carefully before advancing."}
                </span>
              </div>
            </div>

            <div className="profile-two-column">
              <div className="profile-section">
                <div className="section-header compact">
                  <h3>Skills</h3>
                </div>

                <div className="skill-list">
                  {selectedCandidate.skills.map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <div className="section-header compact">
                  <h3>Interview</h3>
                </div>

                {selectedCandidate.interview ? (
                  <div className="interview-summary">
                    <strong>{selectedCandidate.interview.type}</strong>
                    <span>
                      {formatInterviewDate(selectedCandidate.interview.date)} at{" "}
                      {selectedCandidate.interview.time}
                    </span>
                    <button
                      className="small-button"
                      onClick={() => setShowScheduleModal(true)}
                    >
                      Reschedule
                    </button>
                  </div>
                ) : (
                  <div className="interview-empty">
                    <span>No interview scheduled.</span>
                    <button
                      className="small-button"
                      onClick={() => setShowScheduleModal(true)}
                    >
                      + Schedule
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-section notes-section">
              <div className="section-header compact">
                <h3>Recruiter notes</h3>

                {!editingNotes ? (
                  <button
                    className="text-button"
                    onClick={() => setEditingNotes(true)}
                  >
                    Edit notes
                  </button>
                ) : (
                  <button className="text-button" onClick={saveNotes}>
                    Save notes
                  </button>
                )}
              </div>

              {editingNotes ? (
                <textarea
                  className="notes-editor"
                  value={editedNotes}
                  onChange={(event) => setEditedNotes(event.target.value)}
                  placeholder="Add recruiter notes..."
                />
              ) : (
                <p className="notes-text">
                  {selectedCandidate.notes || "No recruiter notes added yet."}
                </p>
              )}
            </div>

            <div className="profile-modal-footer">
              <button className="secondary-button" onClick={closeCandidate}>
                Close profile
              </button>

              <button
                className="primary-button"
                onClick={() => setShowScheduleModal(true)}
              >
                {selectedCandidate.interview
                  ? "Manage interview"
                  : "Schedule interview"}
              </button>
            </div>
          </div>
        </div>
      )}


      {showJobModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowJobModal(false)}
        >
          <form
            className="form-modal job-modal"
            onSubmit={(event) => {
              event.preventDefault();
              addJob();
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-title-row">
              <div>
                <p className="eyebrow">New position</p>
                <h2>Add job opening</h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() => setShowJobModal(false)}
              >
                ×
              </button>
            </div>

            <label>
              Job title
              <input
                required
                className="form-input"
                value={newJob.title}
                onChange={(event) =>
                  setNewJob({ ...newJob, title: event.target.value })
                }
                placeholder="Backend Developer"
              />
            </label>

            <label>
              Department
              <input
                required
                className="form-input"
                value={newJob.department}
                onChange={(event) =>
                  setNewJob({ ...newJob, department: event.target.value })
                }
                placeholder="Engineering"
              />
            </label>

            <label>
              Location
              <input
                required
                className="form-input"
                value={newJob.location}
                onChange={(event) =>
                  setNewJob({ ...newJob, location: event.target.value })
                }
                placeholder="Remote"
              />
            </label>

            <label>
              Employment type
              <select
                className="form-input"
                value={newJob.type}
                onChange={(event) =>
                  setNewJob({ ...newJob, type: event.target.value })
                }
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </label>

            <label>
              Number of openings
              <input
                required
                min="1"
                type="number"
                className="form-input"
                value={newJob.openings}
                onChange={(event) =>
                  setNewJob({ ...newJob, openings: event.target.value })
                }
              />
            </label>

            <button className="primary-button full-width" type="submit">
              Create job
            </button>
          </form>
        </div>
      )}

      {showAddModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowAddModal(false)}
        >
          <form
            className="form-modal"
            onSubmit={addCandidate}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-title-row">
              <div>
                <p className="eyebrow">Talent pool</p>
                <h2>Add candidate</h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <label>
              Full name
              <input
                required
                value={newCandidate.name}
                onChange={(event) =>
                  setNewCandidate({
                    ...newCandidate,
                    name: event.target.value,
                  })
                }
                placeholder="Candidate name"
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                value={newCandidate.email}
                onChange={(event) =>
                  setNewCandidate({
                    ...newCandidate,
                    email: event.target.value,
                  })
                }
                placeholder="candidate@email.com"
              />
            </label>

            <label>
              Role
              <input
                required
                value={newCandidate.role}
                onChange={(event) =>
                  setNewCandidate({
                    ...newCandidate,
                    role: event.target.value,
                  })
                }
                placeholder="Frontend Developer"
              />
            </label>

            <label>
              Experience
              <input
                required
                value={newCandidate.experience}
                onChange={(event) =>
                  setNewCandidate({
                    ...newCandidate,
                    experience: event.target.value,
                  })
                }
                placeholder="2 years"
              />
            </label>

            <label>
              Skills
              <input
                required
                value={newCandidate.skills}
                onChange={(event) =>
                  setNewCandidate({
                    ...newCandidate,
                    skills: event.target.value,
                  })
                }
                placeholder="React, JavaScript, CSS"
              />
            </label>

            <button className="primary-button full-width" type="submit">
              Add candidate
            </button>
          </form>
        </div>
      )}

      {showScheduleModal && selectedCandidate && (
        <div
          className="modal-backdrop nested-backdrop"
          onClick={() => setShowScheduleModal(false)}
        >
          <form
            className="form-modal schedule-modal"
            onSubmit={saveInterview}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-title-row">
              <div>
                <p className="eyebrow">Interview planning</p>
                <h2>Schedule interview</h2>
                <p className="modal-description">
                  {selectedCandidate.name}
                </p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() => setShowScheduleModal(false)}
              >
                ×
              </button>
            </div>

            <label>
              Interview date
              <input
                required
                type="date"
                value={interviewForm.date}
                onChange={(event) =>
                  setInterviewForm({
                    ...interviewForm,
                    date: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Interview time
              <input
                required
                type="time"
                value={interviewForm.time}
                onChange={(event) =>
                  setInterviewForm({
                    ...interviewForm,
                    time: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Interview type
              <select
                value={interviewForm.type}
                onChange={(event) =>
                  setInterviewForm({
                    ...interviewForm,
                    type: event.target.value,
                  })
                }
              >
                <option>Video Interview</option>
                <option>Phone Interview</option>
                <option>Technical Interview</option>
                <option>HR Interview</option>
                <option>Final Interview</option>
              </select>
            </label>

            <button className="primary-button full-width" type="submit">
              Save interview
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;