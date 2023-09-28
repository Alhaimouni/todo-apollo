import React, { useState, useContext } from "react";
import { Paper, Checkbox, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { DELETE_TODO, UPDATE_TODO_STATUS } from "../../graphQL/mutations";
import { useMutation } from "@apollo/client";
import { TodoContext } from "../../contextAPI/todoContext";

function TodoItem({ title, completed, id }) {
  const { deleteTodoById } = useContext(TodoContext);
  const [updateTodoState, { error: updateStateError }] =useMutation(UPDATE_TODO_STATUS);
  const [updateTodoTitle, { error: updateTitleError }] =useMutation(UPDATE_TODO_STATUS);
  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO);
  const [isEditing, setIsEditing] = useState(false);
  const [todoData, setTodoData] = useState({
    title,
    completed,
    id,
  });

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  async function handleEditStatus() {
    //Switch todo status from graphQL API

    // let todoItem = await updateTodoState({
    //   variables: {
    //     id,
    //     completed: !completed,
    //   },
    // });
    // console.log(todoItem);

    //Switch todo status from Local State
    setTodoData({
      ...todoData,
      id,
      // completed: todoItem.data.updateTodo.completed,
      completed: !todoData.completed,
    });
  }

  async function handleDelete() {
    //Delete todo from graphQL API
    await deleteTodo({
      variables: {
        id: id,
      },
    });
    console.log("item with id " + id + " deleted");
    //Delete todo from Local State
    deleteTodoById(id);
  }

  function titleEdit() {}

  return (
    <Paper
      elevation={1}
      style={{
        padding: "15px",
        display: "flex",
        alignItems: "center",
        borderLeft: `4px solid ${todoData.completed ? "green" : "red"}`,
      }}
      onClick={() => {
        console.log(id);
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
            value={todoData.title}
            onChange={(e) => todoData.title}
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
