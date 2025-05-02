import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Stack,
  Typography,
  Button,
  Card,
  CardActions,
  Box,
  TextField,
} from "@mui/material";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import ProductCardContent from "../components/Product";

const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems {
      key
      product {
        key
        name
        price
        qty
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartItem: Int!) {
    removeFromCart(cartItem: $cartItem)
  }
`;

const PLACE_ORDER = gql`
  mutation PlaceOrder($address: String!) {
    placeOrder(address: $address)
  }
`;

export default function CartPage() {
  const [, setLocation] = useLocation();

  const { data, loading, error, refetch } = useQuery(GET_CART_ITEMS);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART_ITEMS }],
  });
  const [placeOrder] = useMutation(PLACE_ORDER, {
    refetchQueries: [{ query: GET_CART_ITEMS }],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [address, setAddress] = useState("");

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const items = data.cartItems;
  const total = items.reduce((sum, item) => sum + item.product.price, 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) return;
    try {
      // not handling failures
      await placeOrder({ variables: { address } });
      setAddress(""); // clear address after order
      setLocation("/");
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4">Total: ${total.toFixed(2)}</Typography>

      <TextField
        label="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        disabled={!items.length || !address.trim()}
        onClick={handlePlaceOrder}
      >
        Checkout
      </Button>

      {items.map((item) => (
        <Card key={item.key}>
          <ProductCardContent product={item.product} />
          <CardActions>
            <Button
              component={Link}
              href={`/product/${item.product.key}`}
              size="small"
            >
              View
            </Button>
            <Box flexGrow={1} />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() =>
                removeFromCart({ variables: { cartItem: item.key } })
              }
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}
