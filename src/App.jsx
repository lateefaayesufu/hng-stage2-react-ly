import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ToastProvider } from "./components/Toasts";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/Tickets/TicketList";
import TicketForm from "./pages/tickets/TicketForm";

// ==========================
// 🔒 Protected Route Wrapper
// ==========================
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

// ==========================
// 🌐 Public Route Wrapper
// ==========================
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="spinner"
          style={{ width: "40px", height: "40px" }}
        ></span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// ==========================
// Main App Routes
// ==========================
function AppRoutes() {
  return (
    <Routes>
      {/* Routes with Layout (Navbar + Footer) */}
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/new"
          element={
            <ProtectedRoute>
              <TicketForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketForm />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth Routes (No Layout) */}
      <Route
        path="/auth/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* 404 - Catch All */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "24px",
            }}
          >
            <h1 style={{ fontSize: "4rem", color: "var(--text-muted)" }}>
              404
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--text-muted)",
                marginBottom: "24px",
              }}
            >
              Page not found
            </p>
            <a href="/" className="btn btn-primary">
              Go Home
            </a>
          </div>
        }
      />
    </Routes>
  );
}

// ==========================
// Root App Component
// ==========================
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
