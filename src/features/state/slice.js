import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  category: "",
  editingTaskId: null, // New state for managing the task being edited
  editedTaskName: "", // New state for the edited task name
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        name: action.payload.name,
        category: action.payload.category,
        completed: false, // New tasks are not completed by default
      });
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    editTask: (state, action) => {
      const { id, name } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.name = name; // Update the task's name
      }
      state.editingTaskId = null; // Clear editing state
      state.editedTaskName = ""; // Clear the edited task name
    },

    setEditingTask: (state, action) => {
      state.editingTaskId = action.payload.id;
      state.editedTaskName = action.payload.name;
    },

    setCategory: (state, action) => {
      state.category = action.payload; // Update the selected category
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed; // Toggle the completed property
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  editTask,
  setEditingTask,
  setCategory,
  toggleTaskCompletion,
} = taskSlice.actions;
export default taskSlice.reducer;
