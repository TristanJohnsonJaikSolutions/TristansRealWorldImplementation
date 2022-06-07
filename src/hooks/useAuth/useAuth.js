import { useContext, createContext, useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import axios from "axios";

export const AuthContext = createContext({
  isLoggedIn: false,
  isInitialized: true,
  userData: null,
});

/**
 * Provides the auth context to children.
 */
export function AuthProvider({ children }) {
  // Store the user data in localStorage.
  const [userData, setUserData] = useLocalStorage("realworld-user");

  /**
   * Registers a new user and returns the user's details.
   */
  async function register(username, email, password) {
    try {
      const res = await axios("/api/users", {
        method: "post",
        data: {
          user: { username, email, password },
        },
      });

      return {
        success: true,
        errors: [],
        user: res.data,
      };
    } catch (err) {
      const data = err.response.data.errors;

      // Format validation errors from API.
      const errors = Object.keys(data).map((key) => {
        return key + " " + data[key];
      });

      return {
        success: false,
        errors: errors,
        user: null,
      };
    }
  }

  /**
   * Signs in as an existing user.
   */
  async function signIn(email, password) {
    try {
      // Uses base URL from domain config so you can swap it to localhost for local dev if you want.
      const res = await axios("/api/users/login", {
        method: "post",
        data: {
          user: { email, password },
        },
      });

      setUserData(res.data.user);

      return {
        success: true,
        errors: [],
        user: res.data,
      };
    } catch (err) {
      const data = err.response.data.errors;

      // Format validation errors from API.
      const errors = Object.keys(data).map((key) => {
        return key + " " + data[key];
      });

      return {
        success: false,
        errors: errors,
        user: null,
      };
    }
  }

  /**
   * Signs out the current user.
   */
  async function signOut() {
    setUserData(null);
  }

  const value = {
    isLoggedIn: userData != null,
    userData,
    authToken: userData?.token,
    register,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Returns the auth context.
 *
 * @example
 * const { register, signIn, signOut } = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}
