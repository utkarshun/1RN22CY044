// src/pages/Home.js
import React, { useEffect, useState } from "react";
import stockApi from "../api/stockApi";
import StockCard from "../components/StockCard";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stockApi
      .get("/stocks") // Replace with the correct endpoint
      .then((res) => {
        setStocks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stock data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        📊 Stock Price Aggregator
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {stocks.map((stock, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StockCard stock={stock} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

// Add PropTypes for better type checking (optional but recommended)

export default Home;

// Optionally, if StockCard expects specific props, you can define PropTypes for it as well.
// Example:
// StockCard.propTypes = {
//   stock: PropTypes.object.isRequired,
// };
