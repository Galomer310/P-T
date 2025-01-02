import { useSelector, useDispatch } from "react-redux";
import { setCategory, toggleTaskCompletion } from "./state/slice";
import { selectTasksByCategory, selectCompletedTasksCount } from "./state/selectors";

const CategorySelector = () => {
  const dispatch = useDispatch();

  // Get the currently selected category
  const selectedCategory = useSelector((state) => state.tasksReducer.category) || "all";

  // Get filtered tasks based on category
  const filteredTasks = useSelector((state) =>
    selectedCategory === "all"
      ? state.tasksReducer.tasks
      : selectTasksByCategory(state, selectedCategory)
  );

  // Get count of completed tasks
  const completedTasksCount = useSelector(selectCompletedTasksCount);

  return (
    <>
      {/* Dropdown to select category */}
      <select
        onChange={(e) => dispatch(setCategory(e.target.value))}
        value={selectedCategory}>
        <option value="all">All</option>
        <option value="household">Household</option>
        <option value="finance">Finances</option>
        <option value="selfCare">Self-Care</option>
        <option value="social">Social</option>
      </select>

      {/* Display the count of completed tasks */}
      <p>Completed Tasks: {completedTasksCount}</p>

      {/* Render filtered tasks */}
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          onClick={() => dispatch(toggleTaskCompletion(task.id))} // Toggle task completion
          style={{
            textDecoration: task.completed ? "line-through" : "none", // Strikethrough if completed
            color: task.completed ? "#999" : "inherit", // Dim text color if completed
            cursor: "pointer",
            padding: "10px",
            margin: "10px 0",
            border: "2px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h3>{task.name}</h3>
          <p>{task.category}</p>
        </div>
      ))}
    </>
  );
};

export default CategorySelector;
