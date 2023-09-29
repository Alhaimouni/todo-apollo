import React, { useState, useContext } from "react";
import { DELETE_TODO,UPDATE_TODO_STATUS,UPDATE_TODO_TITLE } from "../../graphQL/mutations";
import { Paper, Checkbox, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { TodoContext } from "../../contextAPI/todoContext";
import { TodoItem_mui as style } from "../../materialUI";
import { AlertContext } from "../../contextAPI/aletContext";
import { Input } from "@mui/material";
import { When } from "react-if";
import Button from '@mui/material/Button';

function TodoItem({ title, completed, id }) {

  const [updateState] = useMutation(UPDATE_TODO_STATUS);
  const [updateTitle] = useMutation(UPDATE_TODO_TITLE);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const { deleteTodoById } = useContext(TodoContext);
  const { afterFinishAlert } = useContext(AlertContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [todoData, setTodoData] = useState({title,completed,id});

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
        console.log(resolve);
        setTodoData({
          ...todoData,
          id,
          completed: !todoData.completed,
        });
        afterFinishAlert(`Item complete state updated successfuly to ${!todoData.completed} `,`success`)
      })
      .catch((reject) => {
        console.log(reject);
        afterFinishAlert(`Somthing wrong with item update`,`error`)
      });
  }

  function handleDelete() {
    deleteTodo({
      variables: {id},
    })
      .then((resolve) => {
        console.log(resolve);
        afterFinishAlert(`Item deleted successfuly`,`success`);
        deleteTodoById(id);
      })
      .catch(() => {
        afterFinishAlert(`Error while deleting item`,`error`);
      });
  }

  function handleTitleEdit() {
    updateTitle({variables:{
      id,
      title:editingTitle
    }}).then(resolve=>{
      console.log(resolve);
      setIsEditing(false);
      afterFinishAlert(`Item title updated successfuly`,`success`);
    }).catch(reject=>{
      afterFinishAlert(`Error while updating item title`,`error`);
    })
  }

  function updatedText(e){
    setEditingTitle(e.target.value)
  }
  
  return (
    <Paper
      elevation={1}
      sx={{
        ...style,
        borderLeft: `4px solid ${todoData.completed ? "green" : "red"}`,
      }}
    >
      <Checkbox color="primary" checked={todoData.completed} onChange={handleEditStatus}disabled={isEditing}/>
      <Typography variant="h6" flex={1}>
          <When condition={isEditing}>
            <Input defaultValue={todoData.title} onChange={updatedText} placeholder="Enter updated text"></Input>
            <Button variant="outlined" color="primary"  onClick={handleTitleEdit} style={{marginLeft:'10px'}}>Edit</Button>
            <Button variant="outlined" color="primary"  onClick={toggleEdit} style={{marginLeft:'10px'}}>Undo</Button>
          </When>
          <When condition={!isEditing}>
            {title}
          </When>
      </Typography>
      <When condition={!isEditing}>
        <IconButton onClick={toggleEdit}>
          <Edit color="primary" />
        </IconButton>
      </When>
      <IconButton onClick={handleDelete}>
        <Delete style={{ color: "rgb(205,51,0)" }} />
      </IconButton>
    </Paper>
  );
}

export default TodoItem;
