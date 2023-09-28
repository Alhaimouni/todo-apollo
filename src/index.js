import React from "react";
import ReactDOM from "react-dom/client";
import TodoProvider from "./contextAPI/todoContext";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { router } from "./router";
import client from "./apollo";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </ApolloProvider>
);
