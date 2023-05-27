import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";

const SubmitButton = ({ isLoading, ...props }) => {
  const enabledBgColor = props.color || Colors.primary;
  const disabledBgColor = Colors.lightGrey;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      onPress={props.disabled ? () => {} : props.onPress}
      style={{
        ...styles.button,
        ...props.style,
        ...{ backgroundColor: bgColor },
      }}
    >
      <Text style={{ color: props.disabled ? Colors.grey : "white" }}>
        {isLoading ? <ActivityIndicator /> : props.title}
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
