import React, { useState, useContext } from "react";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import TodoItem from "../TodoItem/TodoItem";
import { TodoContext } from "../../contextAPI/todoContext";

function TodosList({}) {
  const { todos } = useContext(TodoContext);
  const [currentPage, setCurrentPage] = useState(1);

  const todosPerPage = 5;
  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2} marginTop={5}>
      <Stack spacing={1.8}>
        {currentTodos.map((todo, index) => (
          <TodoItem
            title={todo.title}
            completed={todo.completed}
            id={todo.id}
            key={index}
          />
        ))}
      </Stack>
      <Pagination
        count={Math.ceil(todos.length / todosPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
  );
}

export default TodosList;
