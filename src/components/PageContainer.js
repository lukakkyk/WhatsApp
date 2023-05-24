import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
const PageContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default PageContainer;
