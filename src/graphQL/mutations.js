import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation createTodo($title: String!, $completed: Boolean!) {
    createTodo(input: { title: $title, completed: $completed }) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, input: { title: $title, completed: $completed }) {
      id
      title
    }
  }
`;

export const UPDATE_TODO_STATUS = gql`
  mutation updateTodo($id: ID! $completed: Boolean!) {
    updateTodo(id: $id, input: {completed: $completed }) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO_TITLE = gql`
  mutation updateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, input: { title: $title}) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
