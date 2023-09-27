import { gql } from "@apollo/client";

export const LOAD_TODOS = gql`
  query {
    todos {
      data {
        id
        title
        completed
      }
    }
  }
`;

export const LOAD_TODOS_WITH_USER = gql`
  query {
    todos {
      data {
        id
        title
        completed
        user {
          id
          name
          email
          phone
        }
      }
    }
  }
`;

export const GET_TODO_QUERY = gql`
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      completed
    }
  }
`;