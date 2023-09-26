import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError((gqlError, networkError) => {
  if (gqlError) {
    gqlError.graphQLErrors.map(({ message, location, path }) => {
      alert("GraphQL Error " + message + location);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: process.env.REACT_APP_API /*   https://graphqlzero.almansi.me/api   */,
  }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;