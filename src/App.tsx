import React from "react";
import { useState } from "react";
import { useRoute, useParams, Route, Link, Switch } from "wouter";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Box,
  Stack,
} from "@mui/material";

import Login from "./Login";
import SearchBar from "./components/SearchBar";

const PRODUCTS = [
  {
    id: 0,
    name: "purple compact snack",
    description:
      "unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
    price: 222.58,
    qty: 69,
    listed: true,
    seller: "fish",
  },
  {
    id: 1,
    name: "yellow reliable smartphone",
    description:
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id",
    price: 85.03,
    qty: 30,
    listed: true,
    seller: "Dogs",
  },
  {
    id: 2,
    name: "pink eco-friendly planner",
    description:
      "a dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat",
    price: 2.04,
    qty: 2,
    listed: true,
    seller: "Ipsum",
  },
];

const CART_ITEMS = [
  {
    cart_qty: 2,
    product: {
      id: 2,
      name: "pink eco-friendly planner",
      description:
        "a dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat",
      price: 2.04,
      qty: 2,
      listed: true,
      seller: "Ipsum",
    },
  },
  {
    cart_qty: 5,
    product: {
      id: 0,
      name: "purple compact snack",
      description:
        "unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
      price: 222.58,
      qty: 69,
      listed: true,
      seller: "fish",
    },
  },
];

// throwing it all in one file and organizing it later- makes it easier to change the types/field names

function ProductCardContent({ product }) {
  return (
    <CardContent>
      <Typography variant="h5" gutterBottom>
        {product.name}
      </Typography>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        Seller: {product.seller}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        ${product.price}
      </Typography>
    </CardContent>
  );
}

function ProductPage() {
  const { id } = useParams();

  const product = PRODUCTS[parseInt(id!)];

  return (
    <Stack sx={{ maxWidth: 600, margin: "auto" }}>
      <ProductCardContent product={product} />
      <Typography sx={{ padding: "30px" }} variant="body1">
        {product.description}
      </Typography>
      {product.listed && (
        <Button variant="contained" size="large">
          Add to Cart
        </Button>
      )}
    </Stack>
  );
}

function CartPage() {
  const items = CART_ITEMS;

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4">Total: TODO</Typography>
      <Button variant="contained" size="large">
        Checkout
      </Button>
      {/* this needs to be ripped out into its own thing but thats for after splitting files*/}
      {items.map((item) => (
        <Card>
          <ProductCardContent product={item.product} />
          <CardActions>
            <Button
              component={Link}
              href={`/product/${item.product.id}`}
              size="small"
            >
              View
            </Button>
            <Box flexGrow={1} />
            <Typography variant="body1">Qty: TODO</Typography>
            <Button variant="contained">Remove All</Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}

function SearchPage() {
  const items = PRODUCTS;

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <SearchBar onSearch={(s) => {}} />
      {items.map((item) => (
        <Card>
          <ProductCardContent product={item} />
          <CardActions>
            <Button component={Link} href={`/product/${item.id}`} size="small">
              View
            </Button>
            <Box flexGrow={1} />
            <Button variant="contained" size="small">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}

function Home() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <Button component={Link} href={`/login`} variant="outlined" size="large">
        Login
      </Button>
      <Button component={Link} href={`/cart`} variant="outlined" size="large">
        Cart
      </Button>
      <Button component={Link} href={`/search`} variant="outlined" size="large">
        Search
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
          <Route path="/login">
            <Login onLogin={(_) => {}}></Login>
          </Route>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/cart" component={CartPage} />
          <Route>404 - Page not found</Route>
        </Switch>
      </Box>
    </Box>
  );
}
