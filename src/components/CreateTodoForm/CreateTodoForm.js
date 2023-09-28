import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { CREATE_TODO } from "../../graphQL/mutations";
import { useMutation } from "@apollo/client";
import Snackbar from "@mui/material/Snackbar";
import { CreateTodoForm_mui as style } from "../../materialUI";
import { Typography } from "@mui/material";
import { Alert } from "../Alert/Alert";
import { AlertContext } from "../../contextAPI/aletContext";

function CreateTodoForm() {
  const [createTodo, { error: createError }] = useMutation(CREATE_TODO);
  const [completed, setCompleted] = useState(false);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const { open, handleClose, snackbarData, setOpen, setsnackbarData } =
    useContext(AlertContext);

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
      })
        .then((resolve) => {
          console.log(resolve.data.createTodo);
          setsnackbarData({
            msg: `Todo titled ${resolve.data.createTodo.title} succesfuly created`,
            status: "success",
          });
          setOpen(true);
        })
        .catch((reject) => {
          console.log(reject);
          setsnackbarData({
            msg: "Todo  is not created",
            status: "error",
          });
          setOpen(true);
        });
    }
    if (createError) console.log(createError);
  }

  function handleCheckboxChange(event) {
    setCompleted(event.target.checked);
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.msg}
        </Alert>
      </Snackbar>
      <form onSubmit={submitTodo} style={style.form}>
        <Typography>
          Add a by filling the title and completion status:
        </Typography>
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
    </>
  );
}

export default CreateTodoForm;
