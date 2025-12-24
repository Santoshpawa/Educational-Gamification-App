import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VITE_API_URL } from "./backendAPI";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Signing up user with email: ", email);
      const response = await fetch(`${VITE_API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        console.log("Signup failed with message: ", data);
        return rejectWithValue(data || "Failed to sign in.");
      }
      let data = await response.json();
      console.log("signup response data: ", data);
      let { token, user, picture } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("picture", picture);
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
      const response = await fetch(`${VITE_API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return rejectWithValue(data || "Login unsuccessful.");
      }
      let data = await response.json();
      console.log("login response data: ", data);
      let { token, user, picture } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("picture", picture);
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
    picture: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user in slice: ", action.payload);
      state.user = action.payload.user;
      state.picture = action.payload.picture;
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
      state.picture = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("picture");
    },
  },
  extraReducers: (builder) => {
    builder
      // signup User
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.loading = false;
        state.picture = action.payload.picture;
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
        state.user = action.payload.user;
        state.picture = action.payload.picture;
        state.message = action.payload.message;
        state.error = null;
        console.log("User after login fulfilled: ", state.user);
        
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
