import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import Colors from "../constants/Colors";
import ProfileImage from "./ProfileImage";
const DataItem = (props) => {
  const { title, subTitle, image } = props;
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ProfileImage uri={image} size={40} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomColor: Colors.extraLightGrey,
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 50,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    color: Colors.grey,
  },
  textContainer:{
    marginLeft:14,

  }
});

export default DataItem;
