import React, { useState, useContext } from "react";
import {
  DELETE_TODO,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_TITLE,
} from "../../graphQL/mutations";
import { Paper, Checkbox, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { TodoContext } from "../../contextAPI/todoContext";
import { TodoItem_mui as style } from "../../materialUI";
import { AlertContext } from "../../contextAPI/aletContext";

function TodoItem({ title, completed, id }) {
  const { deleteTodoById } = useContext(TodoContext);
  const { setOpen, setsnackbarData } = useContext(AlertContext);
  const [updateState] = useMutation(UPDATE_TODO_STATUS);
  const [updateTitle] = useMutation(UPDATE_TODO_TITLE);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [isEditing, setIsEditing] = useState(false);
  const [todoData, setTodoData] = useState({
    title,
    completed,
    id,
  });

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleEditStatus() {
    updateState({
      variables: {
        id,
        completed: !completed,
      },
    })
      .then((resolve) => {
        setTodoData({
          ...todoData,
          id,
          completed: !todoData.completed,
        });
        setsnackbarData({
          msg: `Item complete state updated successfuly to ${!todoData.completed} `,
          status: "success",
        });
        setOpen(true);
      })
      .catch((reject) => {
        setsnackbarData({
          msg: `Somthing wrong with item update`,
          status: "error",
        });
        setOpen(true);
      });
  }

  function handleDelete() {
    deleteTodo({
      variables: {
        id: id,
      },
    })
      .then(() => {
        setsnackbarData({
          msg: "Item deleted successfuly",
          status: "success",
        });
        deleteTodoById(id);
        setOpen(true);
      })
      .catch(() => {
        setsnackbarData({
          msg: "Error while deleting item",
          status: "error",
        });
        setOpen(true);
      });
  }

  function titleEdit(event) {
    setTodoData({ ...todoData, title: event.target.value });
    setsnackbarData({
      msg: `Item Title updated successfuly `,
      status: "success",
    });
    setOpen(true);
  }

  return (
    <Paper
      elevation={1}
      sx={{
        ...style,
        borderLeft: `4px solid ${todoData.completed ? "green" : "red"}`,
      }}
    >
      <Checkbox
        color="primary"
        checked={todoData.completed}
        onChange={handleEditStatus}
        disabled={isEditing}
      />
      <Typography variant="h6" flex={1}>
        {isEditing ? (
          <input
            type="text"
            defaultValue={todoData.title}
            onChange={titleEdit}
          />
        ) : (
          title
        )}
      </Typography>
      <IconButton onClick={toggleEdit}>
        <Edit color="primary" />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete style={{ color: "rgb(205,51,0)" }} />
      </IconButton>
    </Paper>
  );
}

export default TodoItem;
