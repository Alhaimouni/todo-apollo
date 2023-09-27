import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_TODOS } from "../../graphQL/queries";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import Header from "../../components/Header/Header";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import TodoContainer from "../../components/TodoContainer/TodoContainer";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const { error: todosError, loading, data } = useQuery(LOAD_TODOS);
  const [todos, setTodos] = useState([]);

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
          background:
            "linear-gradient(45deg, rgba(67, 147, 224, 1) 6%, rgba(255, 255, 254, 1) 6%, rgba(0, 212, 255, 0.13209033613445376) 100%)",
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
          <TodoContainer
            loading={loading}
            todos={todos}
            todosError={todosError}
          />
        </Box>
      </Paper>
      <Footer />
    </>
  );
}

export default HomePage;
