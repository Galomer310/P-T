import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./state/slice";

const AddTask = () => {
    const inputRef = useRef();
    const categoryRef = useRef();
    const dispatch = useDispatch();

    const addingNewTask = () => {
        const name = inputRef.current?.value;
        const category = categoryRef.current?.value;
        if (name && category) {
            dispatch(addTask({ name, category }));
            inputRef.current.value = "";
            categoryRef.current.value = "";
        }
    };

    return (
        <>
            <input type="text" placeholder="Add Task here ..." ref={inputRef} />
            <select ref={categoryRef}>
                <option value={"household"}>Household</option>
                <option value={"finance"}>Finances</option>
                <option value={"selfCare"}>Self-Care</option>
                <option value={"social"}>Social</option>
            </select>
            <button className="addbtn" onClick={addingNewTask}>Add Task</button>
        </>
    );
};

export default AddTask;
