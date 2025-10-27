import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/Toasts";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { error } = useToast();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      error("Your session has expired — please log in again.");
    }
  }, [isAuthenticated, loading, error]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <span
          className="spinner"
          style={{ width: "40px", height: "40px" }}
        ></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
