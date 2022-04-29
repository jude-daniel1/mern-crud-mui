import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "./../features/todosSlice";
import { Card, CircularProgress, Button, Stack } from "@mui/material";
import moment from "moment";
import { deleteTodosAction } from "./../features/todosSlice";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const { todos } = todosState;

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className="todos">
      <h2> You have {todos && todos.length} tasks </h2>
      <div>
        {todosState.getTodoState === "pending" ? <CircularProgress /> : null}
        {todos.map((todo) => (
          <Card
            key={todo._id}
            variant="outlined"
            sx={{ padding: "0.7rem", marginBottom: "2rem" }}
          >
            <h3>{todo.task}</h3>
            <p>Added: {moment(todo.date).fromNow()}</p>
            <Stack direction="row" justifyContent="space-around">
              <Button
                type="submit"
                onClick={() => setTodo(todo)}
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ fontFamily: "'Abel', 'sansSerif'", marginLeft: "0.7rem" }}
              >
                Update
              </Button>
              <Button
                onClick={() => dispatch(deleteTodosAction(todo._id))}
                color="error"
                variant="outlined"
                size="small"
                sx={{ fontFamily: "'Abel', 'sansSerif'" }}
              >
                Delete
              </Button>
            </Stack>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListTodos;
