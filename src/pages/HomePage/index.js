import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_TODOS_WITH_USER } from "../../graphQL/queries";
import { CREATE_TODO } from "../../graphQL/mutations";

function HomePage() {
  const { error: todosError, loading, data } = useQuery(LOAD_TODOS_WITH_USER);
  const [createTodo, { error: createError }] = useMutation(CREATE_TODO);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!loading) setTodos(data.todos.data);
    if (todosError) console.log(todosError);
  }, [data]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.title.value, e.target.complete.value);
          createTodo({
            variables: {
              title: e.target.title.value,
              completed: false,
            },
          }).then((x)=>{console.log(x);});
          if (createError) console.log(createError);
        }}
      >
        <input type="text" name="title" placeholder="Title"></input>
        <input type="text" placeholder="Complete" name="complete"></input>
        <button type="submit">add</button>
      </form>
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
