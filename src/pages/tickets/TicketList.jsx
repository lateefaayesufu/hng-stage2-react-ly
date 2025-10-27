import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalConfirm from "../../components/ModalConfirm";
import { getTickets, deleteTicket, updateTicket } from "../../services/storage";
import { useToast } from "../../components/Toasts";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    ticketId: null,
  });
  const { success, error: showError } = useToast();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    try {
      const allTickets = getTickets();
      setTickets(allTickets);
    } catch  {
      showError("Failed to load tickets. Please retry.");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const handleDelete = (ticketId) => {
    setDeleteModal({ isOpen: true, ticketId });
  };

  const confirmDelete = () => {
    try {
      deleteTicket(deleteModal.ticketId);
      loadTickets();
      success("Ticket deleted successfully.");
      setDeleteModal({ isOpen: false, ticketId: null });
    } catch  {
      showError("Failed to delete ticket. Please try again.");
    }
  };

  const handleStatusChange = (ticketId, newStatus) => {
    try {
      updateTicket(ticketId, { status: newStatus });
      loadTickets();
      success("Ticket status updated.");
    } catch  {
      showError("Failed to update ticket status.");
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section style={{ padding: "60px 0", minHeight: "calc(100vh - 200px)" }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "40px",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Tickets
            </h1>
            <p className="text-muted" style={{ fontSize: "18px" }}>
              Manage and track all your tickets
            </p>
          </div>
          <Link to="/tickets/new" className="btn btn-primary">
            + Create Ticket
          </Link>
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            className={`btn ${
              filter === "all" ? "btn-primary" : "btn-secondary"
            } btn-small`}
          >
            All ({tickets.length})
          </button>
          <button
            onClick={() => setFilter("open")}
            className={`btn ${
              filter === "open" ? "btn-primary" : "btn-secondary"
            } btn-small`}
          >
            Open ({tickets.filter((t) => t.status === "open").length})
          </button>
          <button
            onClick={() => setFilter("in_progress")}
            className={`btn ${
              filter === "in_progress" ? "btn-primary" : "btn-secondary"
            } btn-small`}
          >
            In Progress (
            {tickets.filter((t) => t.status === "in_progress").length})
          </button>
          <button
            onClick={() => setFilter("closed")}
            className={`btn ${
              filter === "closed" ? "btn-primary" : "btn-secondary"
            } btn-small`}
          >
            Closed ({tickets.filter((t) => t.status === "closed").length})
          </button>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="card text-center" style={{ padding: "80px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>📋</div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              No tickets found
            </h3>
            <p className="text-muted mb-3" style={{ fontSize: "18px" }}>
              {filter === "all"
                ? "Create your first ticket to get started"
                : `No tickets with status "${filter.replace("_", " ")}"`}
            </p>
            {filter === "all" && (
              <Link to="/tickets/new" className="btn btn-primary">
                Create Your First Ticket
              </Link>
            )}
          </div>
        ) : (
          <div className="ticket-list">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-info">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <span className={`status-badge status-${ticket.status}`}>
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>

                  {ticket.description && (
                    <p
                      className="text-muted"
                      style={{
                        fontSize: "15px",
                        marginBottom: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      {ticket.description.length > 150
                        ? ticket.description.substring(0, 150) + "..."
                        : ticket.description}
                    </p>
                  )}

                  <div className="ticket-meta">
                    <span>📅 {formatDate(ticket.createdAt)}</span>
                    {ticket.priority && (
                      <span
                        style={{
                          textTransform: "capitalize",
                          color:
                            ticket.priority === "high"
                              ? "var(--tertiary)"
                              : ticket.priority === "medium"
                              ? "var(--status-in-progress)"
                              : "var(--text-muted)",
                        }}
                      >
                        🎯 {ticket.priority}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="ticket-actions"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket.id, e.target.value)
                    }
                    className="form-select"
                    style={{
                      width: "150px",
                      padding: "8px 12px",
                      fontSize: "14px",
                    }}
                    aria-label={`Change status for ${ticket.title}`}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>

                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="btn btn-secondary btn-small"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="btn btn-danger btn-small"
                    aria-label={`Delete ${ticket.title}`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ModalConfirm
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, ticketId: null })}
        onConfirm={confirmDelete}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </section>
  );
}

export default TicketList;
