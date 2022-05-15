import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { connectSocket } from "../../socket";
import { Header, BookItem } from "./components";
import { findMaxAmount } from "./utils";

export default function OrderBook() {
  const [precision, setPrecision] = useState(0);

  useEffect(() => {
    connectSocket(precision);
  }, [precision]);

  const { bids, asks } = useSelector((state) => state.book);
  const maxAmount = findMaxAmount(bids, asks);

  const onChangePrecision = (value) => {
    setPrecision(Math.min(4, Math.max(0, precision + value)));
  };

  return (
    <View style={styles.outerContainer}>
      <Header precision={precision} onChangePrecision={onChangePrecision} />
      <View style={styles.innerContainer}>
        <View style={styles.wrapper}>
          {bids.map(({ price, amount }) => (
            <BookItem
              key={String(price)}
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
              key={String(price)}
              type="asks"
              price={price}
              amount={amount}
              maxAmount={maxAmount}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
  },
});
