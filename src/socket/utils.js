export const transformAsksPriceData = (obj) =>
  Object.entries(obj)
    .map(([price, amount]) => ({
      price,
      amount: amount.toFixed(2),
    }))
    .filter(({ amount }) => amount > 0)
    .slice(0, 15);

export const transformBidsPriceData = (obj) =>
  transformAsksPriceData(obj).sort((a, b) => b.price - a.price);
