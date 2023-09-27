import React from "react";
import TodosList from "../../components/TodosList/TodosList";
import { When } from "react-if";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function TodoContainer({ loading, todos, todosError }) {
  return (
    <>
      <When condition={loading}>
        <LoadingSpinner />
      </When>
      <When condition={!loading && !todosError}>
        <TodosList todos={todos} />
      </When>
      <When condition={!loading && todos.length == 0}>
        <h1>No items </h1>
      </When>
    </>
  );
}

export default TodoContainer;
