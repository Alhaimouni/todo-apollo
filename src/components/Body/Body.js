import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_TODOS } from "../../graphQL/queries";
import { TodoContext } from "../../contextAPI/todoContext";
import { Paper } from "@mui/material";
import { Body_mui as style } from "../../materialUI";
import { Alert } from "../Alert/Alert";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import { AlertContext } from "../../contextAPI/aletContext";
import TodoContainer from "../../components/TodoContainer/TodoContainer";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

function Body() {
  const { error: todosError, loading, data } = useQuery(LOAD_TODOS);
  const { setTodos } = useContext(TodoContext);
  const { open, handleClose, snackbarData } = useContext(AlertContext);

  useEffect(() => {
    if (!loading) setTodos(data.todos.data);
    if (todosError) console.log(todosError);
  }, [data]);

  return (
    <Paper sx={style.paper}>
      <Box sx={style.box}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackbarData.status}
            sx={{ width: "100%" }}
          >
            {snackbarData.msg}
          </Alert>
        </Snackbar>
        <CreateTodoForm />
        <TodoContainer loading={loading} todosError={todosError} />
      </Box>
    </Paper>
  );
}

export default Body;
