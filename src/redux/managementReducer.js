import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  loggedIn: false,
  tasks: [],
};

export const managementSlice = createSlice({
  name: "taskManagement",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
    },
    setTasks: (state, action) => {
      state.tasks = [...state.tasks, ...action.payload.tasks];
    },
    setTasksEmpty: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setUpdateTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.id) {
          return {
            ...task,
            title: action.payload.title,
            description: action.payload.description,
            dueDate: action.payload.dueDate,
            status: action.payload.status,
            priority: action.payload.priority,
          };
        }
        return task;
      });
    },
    setDeleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload.id
      );
    },
    setAddTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload.task];
    },
  },
});

export const {
  setToken,
  setUser,
  setLoggedIn,
  setTasks,
  setTasksEmpty,
  setUpdateTask,
  setDeleteTask,
  setAddTask,
} = managementSlice.actions;
export default managementSlice.reducer;
