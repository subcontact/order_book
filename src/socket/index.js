import store from "../redux";
import { updateChannelId, updateInitialPrice } from "../redux/book/actions";

let connectStatus = "idle"; // idle | connecting | connected

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

      if (data?.event === "subscribed") {
        return store.dispatch(updateChannelId(data.chanId));
      }

      const channelId = data?.[0];
      const bookList = data?.[1];

      const bids = {};
      const asks = {};

      if (bookList.length > 3) {
        bookList.forEach((book) => {
          const [price, count, amount] = book;

          if (amount > 0) {
            bids[price] = (bids[price] || 0) + count * amount;
          } else {
            asks[price] = (asks[price] || 0) + count * -amount;
          }
        });

        return store.dispatch(updateInitialPrice(channelId, { bids, asks }));
      }
    } catch {}
  };

  //   wss.onclose(() => {
  //     connectStatus = "idle";
  //   });
}
