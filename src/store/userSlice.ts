import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  email: null,
  tasks: [],
  comments: [],
  replies: [],
  projects: [],
  createdProjects: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData(state, action) {
      const {
        id = null,
        username = null,
        email = null,
        tasks = [],
        comments = [],
        replies = [],
        projects = [],
        createdProjects = [],
      } = action.payload || {};

      state.id = id;
      state.username = username;
      state.email = email;
      state.tasks = tasks;
      state.comments = comments;
      state.replies = replies;
      state.projects = projects;
      state.createdProjects = createdProjects;
    },
    logout(state) {
      return { ...initialState };
    },
  },
});

export const { setData, logout } = userSlice.actions;
export default userSlice.reducer;
