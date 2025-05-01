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

type LoginProps = {
  onLogin: (token: string) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (_e: React.FormEvent) => {
    // todo: auth
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={4}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4">Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
