import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App.tsx";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:7123/",
});

// Create the auth link to inject headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token412");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>,
);
