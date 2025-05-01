import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Grid,
  CardActions,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "wouter";

const ProductList: React.FC = () => {
  // Dummy products
  const products = [
    {
      id: "1",
      name: "T-shirt export default Loginexport default Login export default Login",
      price: 19.99,
    },
    { id: "2", name: "Jeans", price: 39.99 },
    { id: "3", name: "Sneakers", price: 59.99 },
  ];

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Stack spacing={3} sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
        {products.map((product) => (
          <Grid xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  href={`/product/${product.id}`}
                  size="small"
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

export default ProductList;
