import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Typography, Stack, Card, CardContent, Divider } from "@mui/material";

const GET_PURCHASES = gql`
  query GetPurchases {
    purchases {
      key
      address
      date
      items {
        key
        purchasedPrice
        product {
          key
          name
          desc
        }
      }
    }
  }
`;

function PurchaseCardContent({ purchase }) {
  return (
    <CardContent>
      <Typography variant="h6">
        Date: {new Date(purchase.date).toLocaleString()}
      </Typography>
      <Typography variant="body1">Address: {purchase.address}</Typography>
      <Divider sx={{ my: 1 }} />
      <Stack spacing={1} sx={{ maxWidth: "80%", margin: "auto" }}>
        {purchase.items.map((item) => (
          <Stack key={item.key}>
            <Typography variant="body2" color="text.secondary">
              {item.product.name} - ${item.purchasedPrice.toFixed(2)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </CardContent>
  );
}

export default function PurchasesPage() {
  const { loading, error, data, refetch } = useQuery(GET_PURCHASES);

  // definitely better ways to do this
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const purchases = data.purchases;

  if (!purchases.length) {
    return <Typography>No purchases yet.</Typography>;
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Purchase History
      </Typography>

      {purchases
        .slice()
        .reverse()
        .map((purchase) => (
          <Card key={purchase.key}>
            <PurchaseCardContent purchase={purchase} />
          </Card>
        ))}
    </Stack>
  );
}
