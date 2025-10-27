import { useState, useEffect, createContext, useContext } from "react";
import * as storage from "../services/storage";
import { validateSignup, hasErrors } from "../services/validators";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const session = storage.getSession();
    if (session) {
      setUser(session.user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Find user by email
    const user = storage.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check password
    if (user.password !== password) {
      throw new Error("Invalid email or password");
    }

    // Generate token and create session
    const token = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    storage.setSession(token, userData);
    setUser(userData);

    return userData;
  };

  const signup = async (name, email, password, confirmPassword) => {
    // Validate signup data
    const validationErrors = validateSignup({
      name,
      email,
      password,
      confirmPassword,
    });

    if (hasErrors(validationErrors)) {
      const firstError = Object.values(validationErrors)[0];
      throw new Error(firstError);
    }

    // Check if user already exists
    const existingUser = storage.findUserByEmail(email);
    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    storage.addUser(newUser);

    // Generate token and create session
    const token = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    storage.setSession(token, userData);
    setUser(userData);

    return userData;
  };

  const logout = () => {
    storage.clearSession();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
