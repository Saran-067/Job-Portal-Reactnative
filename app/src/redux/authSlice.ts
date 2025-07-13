import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface separately for reusability
interface UserProfile {
  profilePhoto: string;
  bio?: string;
  skills?: string[];
  resume?: string;
  resumeOriginalName?: string;
}

interface User {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: string;
  profile: UserProfile;
}

// Define the AuthState interface
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set the user
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null; // Clear any previous errors
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Set error message
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Logout the user
    logout: (state) => {
      state.user = null;
      state.error = null; // Clear any previous errors
    },
  },
});

// Export actions
export const { setUser, setLoading, setError, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;