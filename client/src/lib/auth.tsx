import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "./queryClient";

interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
  totalLikes: number;
  totalViews: number;
  artworksCount: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/user", {
        headers: {
          "x-user-id": storedUserId,
        },
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
      } else {
        localStorage.removeItem("userId");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("userId");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        localStorage.setItem("userId", user.id);
        return { success: true };
      } else {
        const { error } = await response.json();
        return { success: false, error };
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        localStorage.setItem("userId", user.id);
        return { success: true };
      } else {
        const { error } = await response.json();
        return { success: false, error };
      }
    } catch (error) {
      return { success: false, error: "Registration failed. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper function to get auth headers for API requests
export function getAuthHeaders() {
  const userId = localStorage.getItem("userId");
  return userId ? { "x-user-id": userId } : {};
}