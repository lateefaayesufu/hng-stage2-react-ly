import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { validateTicket, hasErrors } from "../../services/validators";
import { createTicket, getTicketById, updateTicket } from "../../services/storage";
import { useToast } from "../../components/Toasts";

function TicketForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    status: "open",
    description: "",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      const ticket = getTicketById(id);
      if (ticket) {
        setFormData({
          title: ticket.title,
          status: ticket.status,
          description: ticket.description || "",
          priority: ticket.priority || "medium",
        });
        setLoading(false);
      } else {
        showError("Ticket not found.");
        navigate("/tickets");
      }
    }
  }, [id, isEditMode, navigate, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateTicket(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        if (isEditMode) {
          updateTicket(id, formData);
          success("Ticket updated successfully.");
        } else {
          createTicket(formData);
          success("Ticket created successfully.");
        }
        navigate("/tickets");
      } catch {
        showError("Failed to save ticket. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 300);
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "60px 0", textAlign: "center" }}
      >
        <span
          className="spinner"
          style={{ width: "40px", height: "40px" }}
        ></span>
        <p className="text-muted mt-2">Loading ticket...</p>
      </div>
    );
  }

  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Header */}
        <div className="mb-4">
          <Link
            to="/tickets"
            className="text-muted"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            ← Back to Tickets
          </Link>
          <h1
            style={{ fontSize: "40px", fontWeight: "700", marginBottom: "8px" }}
          >
            {isEditMode ? "Edit Ticket" : "Create New Ticket"}
          </h1>
          <p className="text-muted">
            {isEditMode
              ? "Update ticket details"
              : "Fill in the details to create a new ticket"}
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title <span style={{ color: "var(--tertiary)" }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter ticket title"
              />
              {errors.title && (
                <p className="form-error" role="alert">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status <span style={{ color: "var(--tertiary)" }}>*</span>
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              {errors.status && (
                <p className="form-error" role="alert">
                  {errors.status}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about the ticket"
                rows="6"
              />
              {errors.description && (
                <p className="form-error" role="alert">
                  {errors.description}
                </p>
              )}
              <p
                className="text-muted"
                style={{ fontSize: "14px", marginTop: "4px" }}
              >
                {formData.description.length}/1000 characters
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/tickets" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Saving...
                  </>
                ) : isEditMode ? (
                  "Update Ticket"
                ) : (
                  "Create Ticket"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TicketForm;
