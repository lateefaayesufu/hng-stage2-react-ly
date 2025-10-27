// Validation utilities for ticket management

export function validateTicket(data) {
  const errors = {};

  // Title validation
  if (!data.title || !data.title.trim()) {
    errors.title = "Title is required.";
  }

  // Status validation
  const validStatuses = ["open", "in_progress", "closed"];
  if (!data.status || !validStatuses.includes(data.status)) {
    errors.status =
      "Status is required. Choose one of: open, in_progress, closed.";
  }

  // Description validation (optional but with limits)
  if (data.description && data.description.length > 1000) {
    errors.description = "Description must be less than 1000 characters.";
  }

  // Priority validation (optional)
  if (data.priority && !["low", "medium", "high"].includes(data.priority)) {
    errors.priority = "Priority must be one of: low, medium, high.";
  }

  return errors;
}

export function validateLogin(data) {
  const errors = {};

  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password validation
  if (!data.password || !data.password.trim()) {
    errors.password = "Password is required.";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function validateSignup(data) {
  const errors = validateLogin(data);

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.name = "Name is required.";
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

// Check if there are any errors
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
