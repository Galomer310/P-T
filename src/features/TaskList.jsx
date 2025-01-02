
import { removeTask, editTask, setEditingTask } from "./state/slice";
import { useSelector, useDispatch } from "react-redux";

import AddTask from "./AddTask";
import CategorySelector from "./CategorySelector";

const TaskList = () => {

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasksReducer.tasks) || [];
    const editingTaskId = useSelector((state) => state.tasksReducer.editingTaskId);
    const editedTaskName = useSelector((state) => state.tasksReducer.editedTaskName);
    const category = useSelector((state) => state.tasksReducer.category) || "";

    const handleEdit = (task) => {
        if (editingTaskId === task.id) {
            // Save the changes when clicked again
            dispatch(editTask({ id: task.id, name: editedTaskName }));
        } else {
            // Enter edit mode
            dispatch(setEditingTask({ id: task.id, name: task.name }));
        }
    };

    const handleDelete = (taskId) => {
        dispatch(removeTask(taskId));
    };

    const handleChange = (e) => {
        dispatch(setEditingTask({ id: editingTaskId, name: e.target.value }));
    };

    return (
        <>
            <AddTask />

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span className="category">
                            <strong>{task.category || category} : </strong>
                        </span>
                        
                        {editingTaskId === task.id ? (
                            // Show input field if the task is being edited
                            <input
                                type="text"
                                value={editedTaskName}
                                onChange={handleChange}
                                onBlur={() => dispatch(editTask({ id: task.id, name: editedTaskName }))}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        dispatch(editTask({ id: task.id, name: editedTaskName }));
                                    }
                                }}
                            />
                        ) : (
                            task.name // Otherwise, display the task name
                        )}

                        <button onClick={() => handleEdit(task)}>
                            {editingTaskId === task.id ? "Save" : "Edit"}
                        </button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        
                    </li>
                ))}
            </ul>

            <CategorySelector />
        </>
    );
};

export default TaskList;
