import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseAPI } from "./backendAPI";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Signing up user with email: ", email);
      const response = await fetch(`${baseAPI}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      console.log("signup response data: ", data);
      if (!response.ok) {
        console.log("Signup failed with message: ", data);
        return rejectWithValue(data || "Failed to sign in.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseAPI}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      console.log("login response data: ", data);

      if (!response.ok) {
        return rejectWithValue(data || "Login unsuccessful.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user in slice: ", action.payload);
      state.user = action.payload;
      console.log("User after setting in slice: ", state.user);
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup User
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.email;
        state.message = action.payload.message;
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.message = null;
        state.loading = false;
        state.user = null;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.email;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.message = null;
        state.user = null;
      });
  },
});

export const {
  setUser,
  setMessage,
  clearMessage,
  setError,
  clearError,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
