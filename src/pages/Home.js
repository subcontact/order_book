import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import BookItem from "./components/BookItem";
import { findMaxAmount } from "./utils";

export default function Home() {
  const { bids, asks } = useSelector((state) => state.book);

  const maxAmount = findMaxAmount(bids, asks);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {bids.map(({ price, amount }) => (
          <BookItem
            type="bids"
            price={price}
            amount={amount}
            maxAmount={maxAmount}
          />
        ))}
      </View>
      <View style={styles.wrapper}>
        {asks.map(({ price, amount }) => (
          <BookItem
            type="asks"
            price={price}
            amount={amount}
            maxAmount={maxAmount}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
  },
});
