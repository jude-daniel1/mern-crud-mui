import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAction, updateTodoAction } from "../features/todosSlice";
import { Button, Alert, CircularProgress } from "@mui/material";
const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const {
    addTodoStatus,
    addTodoError,
    updateTodoStatus,
    updateTodoError,
    deleteTodoStatus,
    deleteTodoError,
  } = useSelector((state) => state.todosState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo._id) {
      dispatch(updateTodoAction(todo));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      dispatch(createTodoAction(newTodo));
    }
    setTodo({
      task: "",
      isComplete: false,
    });
  };

  return (
    <>
      {addTodoStatus === "rejected" && (
        <Alert severity="error">{addTodoError}</Alert>
      )}

      {addTodoStatus === "success" && (
        <Alert severity="success">Task Added...</Alert>
      )}
      {updateTodoStatus === "rejected" && (
        <Alert severity="error">{updateTodoError}</Alert>
      )}

      {updateTodoStatus === "success" && (
        <Alert severity="success">Task Updated...</Alert>
      )}
      {deleteTodoStatus === "rejected" && (
        <Alert severity="error">{deleteTodoError}</Alert>
      )}

      {deleteTodoStatus === "success" && (
        <Alert severity="success">Task deleted...</Alert>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: "0.9rem 0rem",
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
          {addTodoStatus === "pending" ? (
            <CircularProgress size={24} color="secondary" />
          ) : todo._id ? (
            "Update Task"
          ) : (
            "Add Task"
          )}
        </Button>
      </form>
    </>
  );
};

export default AddTodo;
