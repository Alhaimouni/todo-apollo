import React, { useContext } from "react";
import TodosList from "../../components/TodosList/TodosList";
import { When } from "react-if";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { TodoContext } from "../../contextAPI/todoContext";

function TodoContainer({ loading, todosError }) {
  const { todos } = useContext(TodoContext);
  return (
    <>
      <When condition={loading}>
        <LoadingSpinner />
      </When>
      <When condition={!loading && !todosError}>
        <TodosList />
      </When>
      <When condition={!loading && todos.length == 0}>
        <h1>No items</h1>
      </When>
    </>
  );
}

export default TodoContainer;
