export const findMaxAmount = (bids, asks) => {
  let max = 0;

  bids.forEach(({ amount }) => (max = Math.max(max, amount)));
  asks.forEach(({ amount }) => (max = Math.max(max, amount)));

  return max;
};
