import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import urun1 from "../images/urun1.jpg";
import urun2 from "../images/urun2.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Bird's Nest Fern",
    price: 22.0,
    description:
      "The Bird's Nest Fern is a tropical plant known for its vibrant green, wavy fronds...",
    imageUrl: urun1,
    quantity: 0,
  },
  {
    id: 2,
    name: "Ctenanthe",
    price: 45.0,
    description:
      "The Ctenanthe, also known as the Prayer Plant, is a stunning tropical plant with bold...",
    imageUrl: urun2,
    quantity: 0,
  },
];

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleIncrease = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrease = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      )
    );
  };

  const handleRemove = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      <Grid container spacing={3} flexDirection={{ xs: "column", md: "row" }}>
        <Grid item xs={12} md={8}>
          {products.map((product) => (
            <Card key={product.id} sx={{ mb: 2 }}>
              <Grid
                container
                alignItems="center"
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <Grid
                  item
                  xs={12}
                  sm={3}
                  display="flex"
                  justifyContent="center"
                >
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                      height: { xs: 150, sm: 200 },
                      width: { xs: 150, sm: 200 },
                      objectFit: "cover",
                      borderRadius: 2,
                      mt: { xs: 2, sm: 0 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={9}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: "gray", fontWeight: "bold" }}
                      >
                        Total: ${(product.price * product.quantity).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>

                      <Typography variant="body2" sx={{ textAlign: "left" }}>
                        {product.description}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mt={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDecrease(product.id)}
                      >
                        -
                      </Button>
                      <Typography variant="body2" mx={1}>
                        {product.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleIncrease(product.id)}
                      >
                        +
                      </Button>
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        mt: 1,
                        width: "25%",
                        borderColor: "darkred",
                        backgroundColor: "darkred",
                        color: "white",
                      }}
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove item
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Cart totals
              </Typography>

              <Box display="flex" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: "bold", mr: 1 }}>
                  Subtotal:
                </Typography>
                <Typography variant="body2">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography variant="body2" sx={{ fontWeight: "bold", mr: 1 }}>
                  Total:
                </Typography>
                <Typography variant="body2">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
