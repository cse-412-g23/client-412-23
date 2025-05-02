import { CardContent, Typography, Button } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

type ProductCardContentProps = {
  product: {
    name: string;
    qty: number;
    price: number;
  };
};

export default function ProductCardContent({
  product,
}: ProductCardContentProps) {
  return (
    <CardContent>
      <Typography variant="h5" gutterBottom>
        {product.name}
      </Typography>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        Stock: {product.qty}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        ${Number(product.price).toFixed(2)}
      </Typography>
    </CardContent>
  );
}

const ADD_TO_CART = gql`
  mutation AddToCart($product: Int!) {
    addToCart(product: $product)
  }
`;

type AddToCartButtonProps = {
  productKey: number;
  size?: "small" | "medium" | "large";
};

export function AddToCartButton({
  productKey,
  size = "large",
}: AddToCartButtonProps) {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART);

  const handleClick = async () => {
    await addToCart({ variables: { product: productKey } });
  };

  return (
    <>
      <Button
        variant="contained"
        size={size}
        onClick={handleClick}
        disabled={loading}
      >
        Add to Cart
      </Button>
    </>
  );
}
