import React from "react";
import { useState } from "react";
import { useRoute, Route, Link, Switch } from "wouter";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Login from "./Login";
import ProductList from "./Products";

// Dummy products
const products = [
  {
    id: "1",
    name: "T-shirt export default Login export default Login",
    price: 19.99,
  },
  { id: "2", name: "Jeans", price: 39.99 },
  { id: "3", name: "Sneakers", price: 59.99 },
];

function ProductDetail({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return <Typography>Product not found</Typography>;
  return (
    <Container>
      <Typography variant="h5">{product.name}</Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Add to Cart
      </Button>
    </Container>
  );
}

function Cart() {
  return (
    <Container>
      <Typography variant="h4">Cart</Typography>
      <Typography>Your cart is empty.</Typography>
    </Container>
  );
}

type SearchBarProps = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <Box display="flex" gap={1}>
      <TextField
        variant="outlined"
        placeholder="Search…"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

function Home() {}

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
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} href="/cart">
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4 }}>
        <Switch>
          <Route path="/" component={ProductList} />
          <Route path="/login" component={Login} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route>Default page</Route>
        </Switch>
      </Box>
    </Box>
  );
}
