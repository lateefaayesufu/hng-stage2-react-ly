import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useToast } from "../../components/Toasts";
import { useAuth } from "../../hooks/useAuth";

function Signup() {
  const navigate = useNavigate();
  const { success } = useToast();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Simulate async operation
    setTimeout(async () => {
      try {
        await signup(
          formData.name,
          formData.email,
          formData.password,
          formData.confirmPassword
        );

        success("Account created successfully! Welcome to Ticketrak.");
        navigate("/dashboard");
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }, 500);
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card card">
          <h1 className="auth-title">Create Account</h1>

          {errors.general && (
            <p
              className="form-error"
              style={{ marginBottom: "16px", textAlign: "center" }}
              role="alert"
            >
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                aria-describedby={errors.name ? "error-name" : undefined}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p id="error-name" className="form-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "error-email" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p id="error-email" className="form-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                aria-describedby={
                  errors.password ? "error-password" : undefined
                }
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p id="error-password" className="form-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-describedby={
                  errors.confirmPassword ? "error-confirmPassword" : undefined
                }
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && (
                <p
                  id="error-confirmPassword"
                  className="form-error"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/auth/login">Login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
