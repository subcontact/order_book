import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLOR } from "../../../constants";

export function BookItem({ type, price, amount, maxAmount }) {
  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.bar,
          type === "bids" ? styles.bidsBar : styles.asksBar,
          {
            width: `${(amount / maxAmount) * 100}%`,
          },
        ]}
      />
      <View
        style={[
          styles.innerContainer,
          {
            paddingRight: type === "bids" ? 16 : 4,
            paddingLeft: type === "asks" ? 16 : 4,
          },
        ]}
      >
        {type === "bids" && <Text style={styles.text}>{amount}</Text>}
        <Text style={styles.text}>{price}</Text>
        {type === "asks" && <Text style={styles.text}>{amount}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLOR.background,
    borderColor: COLOR.line,
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  text: {
    color: COLOR.while,
  },
  bar: {
    position: "absolute",
    height: "100%",
    width: 10,
  },
  bidsBar: {
    backgroundColor: COLOR.bidsColor,
    right: 0,
  },
  asksBar: {
    backgroundColor: COLOR.asksColor,
  },
});
