import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logout, registerUser } from "./authService";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await registerUser(userName, email, password);
      const {
        uid,
        email: userEmail,
        displayName,
        photoURL,
      } = userCredential.user;
      return {
        user: {
          uid,
          email: userEmail,
          displayName,
          photoURL,
        },
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await loginUser(email, password);
      const {
        uid,
        email: userEmail,
        displayName,
        photoURL,
      } = userCredential.user;
      return {
        user: {
          uid,
          email: userEmail,
          displayName,
          photoURL,
        },
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (__, { rejectWithValue }) => {
    try {
      await logout();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
