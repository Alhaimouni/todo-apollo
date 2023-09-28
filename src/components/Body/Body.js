import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_TODOS } from "../../graphQL/queries";
import { TodoContext } from "../../contextAPI/todoContext";
import { Paper } from "@mui/material";
import { Body_mui as style } from "../../materialUI";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import TodoContainer from "../../components/TodoContainer/TodoContainer";
import Box from "@mui/material/Box";

function Body() {
  const { error: todosError, loading, data } = useQuery(LOAD_TODOS);
  const { setTodos } = useContext(TodoContext);

  useEffect(() => {
    if (!loading) setTodos(data.todos.data);
    if (todosError) console.log(todosError);
  }, [data]);

  return (
    <Paper sx={style.paper}>
      <Box sx={style.box}>
        <CreateTodoForm />
        <TodoContainer loading={loading} todosError={todosError} />
      </Box>
    </Paper>
  );
}

export default Body;
