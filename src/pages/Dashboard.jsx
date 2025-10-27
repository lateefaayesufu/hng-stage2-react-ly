import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getTicketStats, initializeDemoData } from "../services/storage";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    // Initialize demo data if needed
    initializeDemoData();

    // Load stats
    const ticketStats = getTicketStats();
    setStats(ticketStats);
  }, []);

  return (
    <>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-4">
            <h1
              style={{
                fontSize: "40px",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Welcome back, {user?.name || "User"}! 👋
            </h1>
            <p className="text-muted" style={{ fontSize: "18px" }}>
              Here's what's happening with your tickets today
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tickets</div>
            </div>

            <div className="stat-card">
              <div
                className="stat-value"
                style={{
                  background:
                    "linear-gradient(135deg, var(--status-open), var(--secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stats.open}
              </div>
              <div className="stat-label">Open Tickets</div>
            </div>

            <div className="stat-card">
              <div
                className="stat-value"
                style={{
                  background:
                    "linear-gradient(135deg, var(--status-in-progress), var(--tertiary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stats.inProgress}
              </div>
              <div className="stat-label">In Progress</div>
            </div>

            <div className="stat-card">
              <div
                className="stat-value"
                style={{
                  background:
                    "linear-gradient(135deg, var(--status-closed), var(--text-muted))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stats.closed}
              </div>
              <div className="stat-label">Resolved Tickets</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4">
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "24px",
              }}
            >
              Quick Actions
            </h2>

            <div className="grid grid-2">
              <Link
                to="/tickets/new"
                className="card"
                style={{ textDecoration: "none" }}
              >
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>➕</div>
                <h3 className="card-title">Create New Ticket</h3>
                <p className="card-description">
                  Report a new issue or request and start tracking it
                  immediately
                </p>
              </Link>

              <Link
                to="/tickets"
                className="card"
                style={{ textDecoration: "none" }}
              >
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
                <h3 className="card-title">View All Tickets</h3>
                <p className="card-description">
                  Browse, search, and manage all your tickets in one place
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
  
    </>
  );
}

export default Dashboard;
