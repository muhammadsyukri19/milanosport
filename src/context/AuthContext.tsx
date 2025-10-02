import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: boolean; // true for admin, false for regular user
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored authentication data on app load
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Demo login function for development/testing
export const demoLogin = (isAdmin: boolean = false) => {
  const demoUser: User = {
    id: isAdmin ? "admin123" : "user123",
    name: isAdmin ? "Admin User" : "Demo User",
    email: isAdmin ? "admin@milanosport.com" : "user@example.com",
    role: isAdmin,
  };

  const demoToken = `demo-token-${Date.now()}`;

  localStorage.setItem("authToken", demoToken);
  localStorage.setItem("userData", JSON.stringify(demoUser));

  return { token: demoToken, user: demoUser };
};

export default AuthContext;
