import React from "react";
import { useState } from "react";
import { useRoute, useParams, Route, Link, Switch } from "wouter";
import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";

import Login from "./pages/Login";
import ProductSearch from "./pages/ProductSearch";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import PurchasesPage from "./pages/PurchasesPage";

function Home() {
  let msg = "Not logged in";
  const token = localStorage.getItem("token412");
  if (token) {
    msg = "logged in";
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography>{msg}</Typography>
      <Button component={Link} href={`/login`} variant="outlined" size="large">
        Login
      </Button>
      <Button component={Link} href={`/cart`} variant="outlined" size="large">
        Cart
      </Button>
      <Button component={Link} href={`/search`} variant="outlined" size="large">
        Search
      </Button>
      <Button
        component={Link}
        href={`/purchases`}
        variant="outlined"
        size="large"
      >
        Purchases
      </Button>
    </Stack>
  );
}

export default function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Home
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4 }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />

          <Route path="/product/:id" component={ProductPage} />

          <Route path="/search" component={ProductSearch} />
          <Route path="/search/:txt" component={ProductSearch} />

          <Route path="/cart" component={CartPage} />
          <Route path="/purchases" component={PurchasesPage} />
          <Route>404 - Page not found</Route>
        </Switch>
      </Box>
    </Box>
  );
}
