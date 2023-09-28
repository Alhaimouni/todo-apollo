import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_TODOS } from "../../graphQL/queries";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import Header from "../../components/Header/Header";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import TodoContainer from "../../components/TodoContainer/TodoContainer";
import Footer from "../../components/Footer/Footer";
import { TodoContext } from "../../contextAPI/todoContext";
import wp from "../../assets/wp.avif";

function HomePage() {
  const { error: todosError, loading, data } = useQuery(LOAD_TODOS);
  const { setTodos } = useContext(TodoContext);
  useEffect(() => {
    if (!loading) setTodos(data.todos.data);
    if (todosError) console.log(todosError);
  }, [data]);

  return (
    <>
      <Header />
      <Paper
        sx={{
          minHeight: "calc(100vh - (63.992px + 52px))",
          padding: "26px",
          backgroundImage: `url(${wp})`,

        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CreateTodoForm />
          <TodoContainer loading={loading} todosError={todosError} />
        </Box>
      </Paper>
      <Footer />
    </>
  );
}

export default HomePage;
