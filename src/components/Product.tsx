import { CardContent, Typography } from "@mui/material";

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
