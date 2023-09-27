import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_TODOS } from "../../graphQL/queries";
import Container from "@mui/material/Container";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import Header from "../../components/Header/Header";
import TodosList from "../../components/TodosList/TodosList";
import { Paper } from "@mui/material";

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
        style={{
          minHeight: "calc(100vh - (63.992px + 52px) )",
          padding: "26px",
          background:
            "linear-gradient(45deg, rgba(67,147,224,1) 6%, rgba(255,255,254,1) 6%, rgba(0,212,255,0.13209033613445376) 100%)",
        }}
      >
        <Container>
          <CreateTodoForm />
          <TodosList todos={todos} />
        </Container>
      </Paper>
    </>
  );
}

export default HomePage;
