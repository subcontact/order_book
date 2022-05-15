import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLOR } from "../../../constants";

export function Header({ onChangePrecision, precision }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerOuterContainer}>
        <View style={styles.headerInnerContainer}>
          <Ionicons name="chevron-down-sharp" size={18} color={COLOR.while} />
          <Text style={styles.headerText}>TRADING BOOK</Text>
        </View>
        <View style={styles.headerInnerContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => onChangePrecision(-1)}
          >
            <Ionicons
              name="remove-sharp"
              size={20}
              color={precision <= 0 ? COLOR.disable : COLOR.while}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => onChangePrecision(1)}
          >
            <Ionicons
              name="md-add-sharp"
              size={20}
              color={precision >= 4 ? COLOR.disable : COLOR.while}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleOuterContainer}>
        <View style={styles.titleInnerContainer}>
          <Text style={styles.title}>TOTAL</Text>
          <Text style={[styles.title, { marginRight: 16 }]}>PRICE</Text>
        </View>
        <View style={styles.titleInnerContainer}>
          <Text style={[styles.title, { marginLeft: 16 }]}>PRICE</Text>
          <Text style={styles.title}>TOTAL</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
  },
  headerOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 6,
  },
  headerInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: COLOR.while,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 6,
  },
  headerButton: {
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  titleOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderColor: COLOR.disable,
    borderTopWidth: 1,
  },
  titleInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    color: COLOR.while,
  },
});
