import React, { createContext, useState, useContext } from "react";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  function deleteTodoById(id) {
    setTodos(todos.filter((todo) => todo.id != id));
  }

  function editTodoTitleById(id) {

  }

  return (
    <TodoContext.Provider value={{ todos, setTodos, deleteTodoById ,editTodoTitleById}}>
      {children}
    </TodoContext.Provider>
  );
}
