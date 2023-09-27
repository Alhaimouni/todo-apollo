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
    <form
      onSubmit={submitTodo}
      style={{
        maxWidth: "600px",
        margin: "0px auto",
        border: "2px solid grey",
        borderRadius: "6px",
        padding: "15px 75px",
        boxShadow: "1px 1px 7px grey",
      }}
    >
      <h4 style={{ marginBottom: "5px" }}>
        Add Todo by filling the title and completion status:
      </h4>
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
        style={{ margin: "5px 0px 5px 0px" }}
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
