import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";

const SubmitButton = (props) => {
  const enabledBgColor = props.color || Colors.primary;
  const disabledBgColor = Colors.lightGrey;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
    onPress={props.disabled ? () => {} : props.onPress}
      style={{ ...styles.button, ...props.style, ...{ backgroundColor: bgColor } }}
    >
      <Text style={{ color: props.disabled ? Colors.grey : "white" }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SubmitButton;
