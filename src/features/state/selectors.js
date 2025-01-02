import { createSelector } from "reselect";

// Base selector to access the tasks state
const selectTasksState = (state) => state.tasksReducer;

// Selector: Get all tasks
export const selectTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.tasks
);

// Selector: Get tasks by category
export const selectTasksByCategory = createSelector(
  [selectTasks, (state, category) => category],
  (tasks, category) => tasks.filter((task) => task.category === category)
);

// Selector: Count of completed tasks
export const selectCompletedTasksCount = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.completed).length
);

// Selector: Get category details by ID
export const selectCategoryById = createSelector(
  [selectTasks, (state, categoryId) => categoryId],
  (tasks, categoryId) => tasks.find((task) => task.category === categoryId)
);
