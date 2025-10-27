import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTickets, deleteTicket } from "../../services/storage";
import { useToast } from "../../components/Toasts";
import ModalConfirm from "../../components/ModalConfirm";

export default function TicketView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [ticket, setTicket] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Load ticket on mount
  useEffect(() => {
    const tickets = getTickets();
    const found = tickets.find((t) => t.id === id);

    if (!found) {
      error("Ticket not found");
      navigate("/tickets");
      return;
    }

    setTicket(found);
  }, [id, navigate, error]);

  // Delete handler
  const handleDelete = () => {
    try {
      deleteTicket(id);
      success("Ticket deleted successfully!");
      navigate("/tickets");
    } catch {
      error("Failed to delete ticket. Please try again.");
    }
  };

  // Color tokens
  const statusColors = {
    open: "var(--status-open)",
    in_progress: "var(--status-in-progress)",
    closed: "var(--status-closed)",
  };

  const priorityColors = {
    low: "var(--gray-500)",
    medium: "var(--warning)",
    high: "var(--error)",
  };

  if (!ticket) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--gray-500)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--bg-light)",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "var(--spacing-2xl) var(--spacing-lg)",
        }}
      >
        {/* Breadcrumb */}
        <div style={{ marginBottom: "var(--spacing-lg)" }}>
          <Link
            to="/tickets"
            style={{
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ← Back to Tickets
          </Link>
        </div>

        {/* Ticket Card */}
        <div
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
          }}
        >
          {/* Header with color bar */}
          <div
            style={{
              background: statusColors[ticket.status],
              padding: "var(--spacing-lg)",
              color: "var(--white)",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "var(--spacing-xs)",
              }}
            >
              {ticket.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {ticket.status.replace("_", " ")}
              </span>
              {ticket.priority && (
                <span
                  style={{
                    padding: "4px 12px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  Priority: {ticket.priority}
                </span>
              )}
              {ticket.createdAt && (
                <span
                  style={{
                    fontSize: "0.875rem",
                    opacity: 0.9,
                  }}
                >
                  Created: {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "var(--spacing-xl)" }}>
            <div style={{ marginBottom: "var(--spacing-xl)" }}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "var(--gray-900)",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                Description
              </h3>
              <p
                style={{
                  color: "var(--gray-700)",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                }}
              >
                {ticket.description || "No description provided."}
              </p>
            </div>

            {/* Metadata Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "var(--spacing-lg)",
                padding: "var(--spacing-lg)",
                background: "var(--gray-50)",
                borderRadius: "var(--radius-md)",
                marginBottom: "var(--spacing-xl)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--gray-600)",
                    marginBottom: "4px",
                  }}
                >
                  Status
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: statusColors[ticket.status],
                    textTransform: "capitalize",
                  }}
                >
                  {ticket.status.replace("_", " ")}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--gray-600)",
                    marginBottom: "4px",
                  }}
                >
                  Priority
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: priorityColors[ticket.priority] || "var(--gray-700)",
                    textTransform: "capitalize",
                  }}
                >
                  {ticket.priority || "Not set"}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--gray-600)",
                    marginBottom: "4px",
                  }}
                >
                  Ticket ID
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "var(--gray-700)",
                    fontFamily: "monospace",
                  }}
                >
                  #{ticket.id}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to={`/tickets/${ticket.id}`}
                style={{
                  padding: "12px 24px",
                  background: "var(--primary)",
                  color: "var(--white)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "600",
                  display: "inline-block",
                }}
              >
                Edit Ticket
              </Link>
              <button
                onClick={() => setDeleteConfirm(true)}
                style={{
                  padding: "12px 24px",
                  background: "var(--error)",
                  color: "var(--white)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ModalConfirm
        isOpen={deleteConfirm}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  );
}
