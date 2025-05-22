import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  logout,
  observeAuthState,
  registerUser,
  signWithGoogle,
} from "./authService";
import { setUser } from "./authSlice";

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

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signWithGoogle();
      if (!result || !result.user) {
        throw new Error("googleLoginThunk | giriş başarısız");
      }
      const user = result.user;
      const { uid, email, displayName, photoURL } = user;

      return {
        user: {
          uid,
          email,
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

export const observeAuthThunk = () => (dispatch) => {
  observeAuthState((user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      dispatch(
        setUser({
          uid,
          email,
          displayName,
          photoURL,
        })
      );
    } else {
      dispatch(setUser(null));
    }
  });
};
