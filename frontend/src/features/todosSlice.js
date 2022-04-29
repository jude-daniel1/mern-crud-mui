import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "./../services/todosServices";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await getTodo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodosAction = createAsyncThunk(
  "todos/deleteTodos",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteTodo(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTodoAction = createAsyncThunk(
  "todos/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTodo(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodoAction = createAsyncThunk(
  "todos/updateTodoAction",
  async (todo, { rejectWithValue }) => {
    const { _id, task, isComplete, date } = todo;
    try {
      const response = await updateTodo(_id, { task, isComplete, date });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  todos: [],
  addTodoStatus: "",
  addTodoError: "",

  getTodoStatus: "",
  getTodoError: "",

  updateTodoStatus: "",
  updateTodoError: "",

  deleteTodoStatus: "",
  deleteTodoError: "",
};
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createTodoAction.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "pending",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [createTodoAction.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        addTodoStatus: "success",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [createTodoAction.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "rejected",
        addTodoError: action.payload,

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },
    [getTodos.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "pending",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [getTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "success",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [getTodos.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "rejected",
        getTodoError: action.payload,

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    // update
    [updateTodoAction.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "pending",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [updateTodoAction.fulfilled]: (state, action) => {
      // let newTodos = [];
      // for (var i = 0; i < state.todos.length; i++) {
      //   if (state.todos[i]._id === action.payload._id) {
      //     state.todos[i].task = action.payload.task;
      //     state.todos[i].date = action.payload.date;
      //     state.todos[i].isComplete = action.payload.isComplete;
      //   }
      //   newTodos.push(state.todos[i]);
      // }

      const updatedTodo = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      return {
        ...state,
        todos: updatedTodo,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "success",
        updateTodoError: "",

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [updateTodoAction.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "rejected",
        updateTodoError: action.payload,

        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    //delete todo
    [deleteTodosAction.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "pending",
        deleteTodoError: "",
      };
    },

    [deleteTodosAction.fulfilled]: (state, action) => {
      const deletedTodo = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
      return {
        ...state,
        todos: deletedTodo,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "success",
        deleteTodoError: "",
      };
    },

    [deleteTodosAction.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",

        getTodoStatus: "",
        getTodoError: "",

        updateTodoStatus: "",
        updateTodoError: "",

        deleteTodoStatus: "rejected",
        deleteTodoError: action.payload,
      };
    },
  },
});

export default todosSlice.reducer;
