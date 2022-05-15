import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import store from "./redux";

import OrderBook from "./components/OrderBook";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <OrderBook />
    </Provider>
  );
}
