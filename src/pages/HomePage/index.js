import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_TODOS_WITH_USER } from "../../graphQL/queries";

import Container from "@mui/material/Container";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import Header from "../../components/Header/Header";

function HomePage() {
  const { error: todosError, loading, data } = useQuery(LOAD_TODOS_WITH_USER);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!loading) setTodos(data.todos.data);
    if (todosError) console.log(todosError);
  }, [data]);

  return (
    <>
      <Header />
      <Container>
        <CreateTodoForm />
      </Container>
      {todos.length !== 0 ? (
        <>
          {todos.map((todo, index) => {
            return (
              <div key={index}>
                <p>{todo.title}</p>
                <p>{+todo.completed}</p>
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading Data</p>
      )}
    </>
  );
}

export default HomePage;
