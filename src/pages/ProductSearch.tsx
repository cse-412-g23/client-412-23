import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Card,
  CardActions,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProductCardContent, { AddToCartButton } from "../components/Product";
import SearchIcon from "@mui/icons-material/Search";
import { gql, useLazyQuery } from "@apollo/client";
import { useRoute, Link } from "wouter";

type SearchBarProps = {
  onSearch: (query: string) => void;
  initialValue: string;
};

function SearchBar({ onSearch, initialValue }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <Box display="flex" gap={2}>
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

const PRODUCTS_SEARCH = gql`
  query ProductsSearch($start: Int!, $amnt: Int!, $textLike: String!) {
    productsSearch(start: $start, amnt: $amnt, textLike: $textLike) {
      key
      name
      desc
      price
      qty
      listed
    }
  }
`;
export default function ProductSearch() {
  const [match, params] = useRoute("/search/:txt");
  const [searchText, setSearchText] = useState(params?.txt || "");

  const [searchProducts, { data, loading, error }] =
    useLazyQuery(PRODUCTS_SEARCH);

  useEffect(() => {
    if (params?.txt) {
      searchProducts({
        variables: { start: 0, amnt: 20, textLike: params.txt },
      });
    }
  }, [params, searchProducts]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    window.history.pushState(null, "", `/search/${encodeURIComponent(text)}`);
    searchProducts({ variables: { start: 0, amnt: 20, textLike: text } });
  };

  const items = data?.productsSearch || [];

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: "auto" }}>
      <SearchBar onSearch={handleSearch} initialValue={searchText} />

      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error.message}</Typography>}

      {items.length === 0 && !loading && (
        <Typography>No products found.</Typography>
      )}

      {items.map((item) => (
        <Card>
          <ProductCardContent product={item} />
          <CardActions>
            <Button component={Link} href={`/product/${item.key}`} size="small">
              View
            </Button>
            <Box flexGrow={1} />
            <AddToCartButton productKey={item.key} size="small" />
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}
