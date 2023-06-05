import React, { useState, useCallback, useEffect } from "react";
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
import Colors from '../constants/Colors';
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/Bubble";
import { createChat } from "../utils/actions/chatActions";
const ChatScreen = (props) => {
  const [messageText, setMessageText] = useState("");
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const userData = useSelector((state) => state.auth.userData);
  const [chatId, setChatId] = useState(props.route?.params?.chatId);
  console.log("userData", userData);
  const chatData = props.route?.params?.newChatData;
  // console.log("chatData", chatData);

  const [chatUsers, setChatUsers] = useState([]);

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find((uid) => uid !== userData.userId);
    const otherUserData = storedUsers[otherUserId];

    return (
      otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`
    );
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: getChatTitleFromName(),
    });
    setChatUsers(chatData.users);
  }, [chatUsers]);

  const sendMessage = useCallback(async() => {

    try {
      let id = chatId;
      if(!id) {
        id = await createChat(userData.userId, props.route.params.newChatData);
        setChatId(id)
      }
    } catch (error) {
      
    }

    setMessageText("");
  }, [messageText, chatId]);

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
        >
          <PageContainer style={{ backgroundColor: "transparent" }}>
            {!chatId && <Bubble type='system' text='This is a new Chat say hi!' />}
          </PageContainer>
        </ImageBackground>
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
