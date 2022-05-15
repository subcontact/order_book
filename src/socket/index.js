import store from "../redux";
import { updateChannelId, updatePrice } from "../redux/book/actions";

let connectStatus = "idle"; // idle | connecting | connected

let bids = {};
let asks = {};

export function connectSocket() {
  if (connectStatus !== "idle") return;

  connectStatus = "connecting";

  const wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

  wss.onopen = () => {
    connectStatus = "connected";

    let subscribeMessage = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
    });
    wss.send(subscribeMessage);
  };

  wss.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);

      // first event
      if (data?.event === "subscribed") {
        bids = {};
        asks = {};
        return store.dispatch(updateChannelId(data.chanId));
      }

      // filter out un-known event
      if (data?.event) return;

      const channelId = data?.[0];

      // event with the price list
      if (data?.[1]?.length > 3) {
        const bookList = data?.[1];

        bookList.forEach((book) => {
          const [price, count, amount] = book;

          if (amount > 0) {
            bids[price] = (bids[price] || 0) + count * amount;
          } else {
            asks[price] = (asks[price] || 0) + count * -amount;
          }
        });

        return store.dispatch(
          updatePrice(channelId, {
            bids: transformBidsPriceData(bids),
            asks: transformAsksPriceData(asks),
          })
        );
      }

      const book = data?.[1];
      const [price, count, amount] = book;

      // filter out un-known event
      if (typeof price !== "number") return;

      const newPrice = amount > 0 ? bids : asks;

      if (Object.keys(newPrice).length === 0) return state;

      if (count === 0) {
        newPrice[price] = 0;
      } else {
        newPrice[price] = (newPrice[price] || 0) + count * Math.abs(amount);
      }

      return store.dispatch(
        updatePrice(channelId, {
          bids: transformBidsPriceData(amount > 0 ? newPrice : bids),
          asks: transformAsksPriceData(amount < 0 ? newPrice : asks),
        })
      );
    } catch {}
  };
}

const transformAsksPriceData = (obj) =>
  Object.entries(obj)
    .map(([price, amount]) => ({
      price,
      amount: amount.toFixed(2),
    }))
    .filter(({ amount }) => amount > 0)
    .slice(0, 15);

const transformBidsPriceData = (obj) =>
  transformAsksPriceData(obj).sort((a, b) => b.price - a.price);
