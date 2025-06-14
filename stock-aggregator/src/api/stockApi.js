// src/api/stockApi.js
import axios from "axios";

// ✅ CRA syntax for environment variables:
const token = process.env.REACT_APP_API_TOKEN || "your-fallback-token-if-any";

const stockApi = axios.create({
  baseURL: "http://20.244.56.144/evaluation-service",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default stockApi;

export const getStocks = async () => {
  try {
    const response = await stockApi.get("/stocks");
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Unexpected response format from /stocks");
    }
  } catch (error) {
    console.error("Error fetching stocks:", error?.message || error);
    throw error;
  }
};
