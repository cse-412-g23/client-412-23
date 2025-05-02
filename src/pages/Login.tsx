import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "wouter";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });

      const token = data?.loginUser;
      if (token) {
        localStorage.setItem("token412", token);
        setLocation("/"); // redirect to home
      } else {
        setError("Invalid Credentials");
      }
    } catch (_) {
      setError("Internal Error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={4}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4">Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
