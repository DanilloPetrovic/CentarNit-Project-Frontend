import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  title: null,
  description: null,
  participants: [],
  createdAt: null,
  isDone: null,
  deadline: null,
  createdBy: null,
  createdById: null,
  updatedAt: null,
  tasks: [],
  isDeleted: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setData(state, action) {
      const {
        id,
        title,
        description,
        participants,
        createdAt,
        isDone,
        deadline,
        createdBy,
        createdById,
        updatedAt,
        tasks,
        isDeleted,
      } = action.payload || {};

      state.id = id ?? null;
      state.title = title ?? null;
      state.description = description ?? null;
      state.participants = participants ?? [];
      state.createdAt = createdAt ?? null;
      state.isDone = isDone ?? null;
      state.deadline = deadline ?? null;
      state.createdBy = createdBy ?? null;
      state.createdById = createdById ?? null;
      state.updatedAt = updatedAt ?? null;
      state.tasks = tasks ?? [];
      state.isDeleted = isDeleted ?? null;
    },
    clearProject(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setData, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
