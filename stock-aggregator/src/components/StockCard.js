// src/components/StockCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StockCard = ({ stock }) => {
  if (!stock) {
    return null;
  }

  return (
    <Card sx={{ minWidth: 275, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {stock.companyName || stock.symbol || "N/A"}
        </Typography>
        <Typography>Symbol: {stock.symbol || "N/A"}</Typography>
        <Typography>
          Price: {stock.price !== undefined ? `₹${stock.price}` : "N/A"}
        </Typography>
        <Typography>Exchange: {stock.exchange || "NSE"}</Typography>
      </CardContent>
    </Card>
  );
};

export default StockCard;
//       ))}
//         </Grid>
