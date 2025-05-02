import { gql, useQuery } from "@apollo/client";
import { useParams } from "wouter";
import { Stack, Typography, Button } from "@mui/material";
import ProductCardContent, { AddToCartButton } from "../components/Product";

const GET_PRODUCT = gql`
  query GetProduct($key: Int!) {
    product(key: $key) {
      key
      name
      desc
      price
      qty
      listed
    }
  }
`;

export default function ProductPage() {
  const { id } = useParams();
  const key = parseInt(id!);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { key },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.product;

  return (
    <Stack sx={{ maxWidth: 600, margin: "auto" }}>
      <ProductCardContent product={product} />
      <Typography sx={{ padding: "30px" }} variant="body1">
        {product.desc}
      </Typography>
      {product.listed && <AddToCartButton productKey={key} size="large" />}
    </Stack>
  );
}
