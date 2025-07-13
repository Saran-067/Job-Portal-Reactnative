import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Job type
export interface Job {
    _id: string;
    title: string;
    company: {
        logo: string;
        name: string;
        location: string;
        website?: string;
    };
    location: string;
    jobType: string;
    salary: number;
    experienceLevel: string;
}

// Define the AppliedJob type
export interface AppliedJob {
  _id: string;
  job: {
      _id: string;
      title: string;
  };
  status: string;
  createdAt: string;
}

// Define the shape of the job state
interface JobState {
    allJobs: Job[];
    allAdminJobs: Job[];
    singleJob: Job | null;
    searchJobByText: string;
    allAppliedJobs: AppliedJob[];
    searchedQuery: string;
}

// Define the initial state with types
const initialState: JobState = {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
};

// Create the job slice
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        // Define actions with proper types
        setAllJobs: (state, action: PayloadAction<Job[]>) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action: PayloadAction<Job | null>) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action: PayloadAction<Job[]>) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action: PayloadAction<string>) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action: PayloadAction<AppliedJob[]>) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action: PayloadAction<string>) => {
            state.searchedQuery = action.payload;
        },
    },
});

// Export actions
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
} = jobSlice.actions;

// Export the reducer
export default jobSlice.reducer;