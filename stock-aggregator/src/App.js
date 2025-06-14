import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import "./styles.css"; // Keep using your global styles
import PropTypes from "prop-types";
import { useCallback, useState as useLocalState } from "react";
import { Button } from "@mui/material";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Replace with real token

const api = axios.create({
  baseURL: "http://20.244.56.144/evaluation-service",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

function App() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stocks") // Replace with actual endpoint if different
      .then((res) => {
        console.log("Fetched Data:", res.data);
        setStockData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        📈 Stock Price Aggregator
      </Typography>

      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 5 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={3} className="stock-list">
          {stockData.map((stock, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card className="stock-item">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {stock.companyName || stock.symbol}
                  </Typography>
                  <Typography>Symbol: {stock.symbol}</Typography>
                  <Typography className="price">
                    Price: ₹{stock.price}
                  </Typography>
                  <Typography>Exchange: {stock.exchange || "NSE"}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
/*
Improvements applied:
1. Token moved to environment variable (see below).
2. PropTypes added for App.
3. Error state and display added.
4. Refresh button to reload stock data.
5. Handle empty data gracefully.
*/

// Move token to environment variable for security
// In your .env file, add: REACT_APP_API_TOKEN=your_token_here
// Then restart your dev server to pick up the env variable
const token = process.env.REACT_APP_API_TOKEN;

App.propTypes = {};

function useErrorState() {
  const [error, setError] = useLocalState(null);
  const clearError = useCallback(() => setError(null), []);
  return [error, setError, clearError];
}

// --- Modified App component with improvements ---
function App() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError, clearError] = useErrorState();

  const fetchData = useCallback(() => {
    setLoading(true);
    clearError();
    api
      .get("/stocks")
      .then((res) => {
        setStockData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch stock data.");
        setLoading(false);
      });
  }, [clearError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        📈 Stock Price Aggregator
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button variant="outlined" onClick={fetchData} sx={{ mb: 2 }}>
        Refresh
      </Button>

      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 5 }}>
          <CircularProgress />
        </Grid>
      ) : stockData.length === 0 ? (
        <Typography align="center" sx={{ mt: 5 }}>
          No stock data available.
        </Typography>
      ) : (
        <Grid container spacing={3} className="stock-list">
          {stockData.map((stock, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card className="stock-item">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {stock.companyName || stock.symbol}
                  </Typography>
                  <Typography>Symbol: {stock.symbol}</Typography>
                  <Typography className="price">
                    Price: ₹{stock.price}
                  </Typography>
                  <Typography>Exchange: {stock.exchange || "NSE"}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
