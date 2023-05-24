import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

const ChatScreen = ({ navigation }) => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    setMessageText("");
  }, [messageText]);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.screen}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../assets/images/droplet.jpeg")}
        ></ImageBackground>
        <View style={styles.inputContainer}>
          <Pressable style={styles.icons}>
            <Feather name="plus" size={24} color={Colors.blue} />
          </Pressable>
          <TextInput
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            style={styles.inputStyle}
            onSubmitEditing={sendMessage}
          />
          {messageText === "" && (
            <Pressable style={styles.icons}>
              <Feather name="camera" size={24} color={Colors.blue} />
            </Pressable>
          )}
          {messageText !== "" && (
            <Pressable
              onPress={sendMessage}
              style={{ ...styles.icons, ...styles.sendButton }}
            >
              <Feather name="send" size={20} color={Colors.white} />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  screen: {
    flex: 1,
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
    paddingHorizontal: 5,
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: Colors.blue,
    borderRadius: 50,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
