import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileImage from "./ProfileImage";
const DataItem = (props) => {
  const { title, subTitle, image, type, isChecked } = props;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
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
        {type === "checkbox" && (
          <View style={{...styles.iconContainer, ...isChecked && styles.checkedStyle}}>
            <Ionicons name="checkmark" size={24} color="white" />
          </View>
        )}
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
  textContainer: {
    marginLeft: 14,
    flex: 1,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
  },
  checkedStyle: {
    backgroundColor: Colors.primary,
    borderColor: "transparent",
  },
});

export default DataItem;
