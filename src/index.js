import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import { connectSocket } from "./socket";
import store from "./redux";

import Home from "./pages/Home";

export default function App() {
  React.useEffect(() => {
    connectSocket();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Home />
    </Provider>
  );
}
