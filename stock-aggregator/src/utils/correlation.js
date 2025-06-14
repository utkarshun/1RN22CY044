export function calculateCorrelationMatrix(dataMap) {
  const tickers = Object.keys(dataMap);
  const matrix = [];

  tickers.forEach((t1, i) => {
    matrix[i] = [];
    tickers.forEach((t2, j) => {
      if (i === j) {
        matrix[i][j] = 1;
      } else {
        const x = dataMap[t1].map((d) => d.price);
        const y = dataMap[t2].map((d) => d.price);
        matrix[i][j] = pearsonCorrelation(x, y);
      }
    });
  });

  return { matrix, tickers };
}

function pearsonCorrelation(x, y) {
  if (
    !Array.isArray(x) ||
    !Array.isArray(y) ||
    x.length !== y.length ||
    x.length === 0
  ) {
    return 0;
  }
  const meanX = x.reduce((a, b) => a + b, 0) / x.length;
  const meanY = y.reduce((a, b) => a + b, 0) / y.length;
  const numerator = x.reduce(
    (sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY),
    0
  );
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) *
      y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0)
  );
  if (denominator === 0) {
    return 0;
  }
  return numerator / denominator;
}
