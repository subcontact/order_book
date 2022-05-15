import React from "react";
import { View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import store from "./redux";
import OrderBook from "./components/OrderBook";
import { closeSocket, connectSocket } from "./socket";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <OrderBook />
        {/* control section */}
        <Button title="Disconnect" onPress={closeSocket} />
        <Button title="Connect" onPress={() => connectSocket()} />
      </View>
    </Provider>
  );
}
