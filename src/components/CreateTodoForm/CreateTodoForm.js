import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { CREATE_TODO } from "../../graphQL/mutations";
import { useMutation } from "@apollo/client";

function CreateTodoForm() {
  const [createTodo, { error: createError }] = useMutation(CREATE_TODO);
  const [completed, setCompleted] = useState(false);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);

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
        },
      }).then((todo) => {
        console.log(todo);
      });
    }
    if (createError) console.log(createError);
  }

  const handleCheckboxChange = (event) => {
    setCompleted(event.target.checked);
  };

  return (
    <form onSubmit={submitTodo}>
      <TextField
        name="title"
        label="Title"
        variant="filled"
        fullWidth
        margin="normal"
        helperText={
          isEmptyTitle ? (
            <span style={{ color: "red" }}>Title cannot be empty</span>
          ) : (
            ""
          )
        }
      />

      <FormControlLabel
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

      <Button type="submit" variant="outlined" color="primary" fullWidth>
        + Add
      </Button>
    </form>
  );
}

export default CreateTodoForm;
