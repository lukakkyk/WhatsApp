import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/Bubble";

import { createChat } from "../utils/actions/chatActions";
import { sendTextMessage } from "../utils/actions/chatActions";
const ChatScreen = (props) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(props.route?.params?.chatId);
  const [errorBannerText, setErrorBannerText] = useState("");
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const storedChats = useSelector((state) => state.chats.chatsData);
  const chatMessages = useSelector((state) => {
    if (!chatId) return [];
    const chatMessagesData = state.messages.messagesData[chatId];
    if (!chatMessagesData) return [];

    const messageList = [];
    for (const key in chatMessagesData) {
      const message = chatMessagesData[key];
      // message.key = key;
      messageList.push({
        key,
        ...message,
      });
    }
    return messageList;
  });

  console.log("chatMessages", chatMessages);

  const userData = useSelector((state) => state.auth.userData);

  // console.log("userData", userData);

  const chatData =
    (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

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

  const sendMessage = useCallback(async () => {
    try {
      let id = chatId;
      if (!id) {
        id = await createChat(userData.userId, props.route.params.newChatData);
        setChatId(id);
      }
      await sendTextMessage(chatId, userData.userId, messageText);
      setMessageText("");
    } catch (error) {
      console.log("error", error);
      setErrorBannerText("Message failed to send!");
      setTimeout(() => setErrorBannerText(""), 5000);
    }
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
            {!chatId && (
              <Bubble type="system" text="This is a new Chat say hi!" />
            )}
            {errorBannerText !== "" && (
              <Bubble text={errorBannerText} type="error" />
            )}
            {chatId && (
              <FlatList
                data={chatMessages}
                renderItem={(itemData) => {
                  const message = itemData.item;

                  const isOwnMessage = message.sentBy === userData.userId;

                  const messageType = isOwnMessage
                    ? "myMessage"
                    : "theirMessage";

                  return (
                    <Bubble
                      type={messageType}
                      text={message.text}
                      messageId={message.key}
                      userId={userData.userId}
                      chatId={chatId}
                      date={message.sentAt}
                    />
                  );
                }}
              />
            )}
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
