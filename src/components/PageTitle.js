import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
const PageTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: Colors.textColor,
    fontFamily:'bold',
    letterSpacing:0.3
  },
});

export default PageTitle;
