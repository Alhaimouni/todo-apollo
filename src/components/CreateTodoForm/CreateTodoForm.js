import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { CREATE_TODO } from "../../graphQL/mutations";
import { useMutation } from "@apollo/client";
import { CreateTodoForm_mui as style } from "../../materialUI";
import { Typography } from "@mui/material";
import { AlertContext } from "../../contextAPI/aletContext";

function CreateTodoForm() {
  const [createTodo, { error: createError }] = useMutation(CREATE_TODO);
  const [completed, setCompleted] = useState(false);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const {afterFinishAlert} = useContext(AlertContext);

  function submitTodo(event) {
    event.preventDefault();
    const { value: title } = event.target.title;
    if (!title) {
      setIsEmptyTitle(true);
    } else {
      setIsEmptyTitle(false);
      createTodo({
        variables: {
          title,
          completed,
        }
      })
        .then((resolve) => {
          console.log(resolve.data.createTodo);
          afterFinishAlert(`Todo titled ${resolve.data.createTodo.title} succesfuly created`,`success`);
        })
        .catch((reject) => {
          console.log(reject);
          afterFinishAlert(`Todo is not created`,`error`);
        });
    }
    if (createError) console.log(createError);
  }

  function handleCheckboxChange(event) {
    setCompleted(event.target.checked);
  }

  return (
    <form onSubmit={submitTodo} style={style.form}>
      <Typography textAlign='center'>Add new task by writing the title and status</Typography>
      <TextField
        name="title"
        label="Title"
        variant="filled"
        fullWidth
        margin="normal"
        helperText={isEmptyTitle ? <span style={{ color: "red" }}>Title cannot be empty</span>: <></>}
      />
      <FormControlLabel
        xs={style.control}
        control={
          <Checkbox
            name="completed"
            color="primary"
            checked={completed}
            onChange={handleCheckboxChange}
          />
        }
        label="Completed"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add
      </Button>
    </form>
  );
}

export default CreateTodoForm;
