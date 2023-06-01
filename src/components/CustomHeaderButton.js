import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { HeaderButton } from "react-navigation-header-buttons";
const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color && Colors.blue}
    />
  );
};

export default CustomHeaderButton;
