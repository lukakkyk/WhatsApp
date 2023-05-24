import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

const ChatScreen = ({ navigation }) => {
  const [textMessage, setTextMessage] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/images/droplet.jpeg")}
      ></ImageBackground>
      <View style={styles.inputContainer}>
        <Pressable style={styles.icons}>
          <Feather name="plus" size={24} color={Colors.blue} />
        </Pressable>
        <TextInput
          value={textMessage}
          onChangeText={(text) => setTextMessage(text)}
          style={styles.inputStyle}
        />
        {textMessage === "" && (
          <Pressable style={styles.icons}>
            <Feather name="camera" size={24} color={Colors.blue} />
          </Pressable>
        )}
        {textMessage !== "" && (
          <Pressable style={styles.icons}>
            <Feather name="send" size={24} color={Colors.blue} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  imageBackground: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 50,
    marginHorizontal: 15,
    paddingHorizontal:5
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
});

export default ChatScreen;
