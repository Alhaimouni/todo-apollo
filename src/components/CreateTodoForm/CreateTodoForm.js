import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { CREATE_TODO } from "../../graphQL/mutations";
import { useMutation } from "@apollo/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function CreateTodoForm() {
  const [createTodo, { error: createError }] = useMutation(CREATE_TODO);
  const [completed, setCompleted] = useState(false);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarData, setsnackbarData] = useState({
    msg: "",
    status: "",
  });

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

  const handleCheckboxChange = (event) => {
    setCompleted(event.target.checked);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.msg}
        </Alert>
      </Snackbar>
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
    </>
  );
}

export default CreateTodoForm;
