import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/Bubble";
import ReplyTo from "../components/ReplyTo";
import { createChat } from "../utils/actions/chatActions";
import { sendTextMessage, sendImage } from "../utils/actions/chatActions";
import {
  launchImagePicker,
  openCamera,
  uploadImageAsync,
} from "../utils/imagePickerHelper";
import AwesomeAlert from "react-native-awesome-alerts";
const ChatScreen = (props) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [chatId, setChatId] = useState(props.route?.params?.chatId);
  const [errorBannerText, setErrorBannerText] = useState("");
  const [tempImageUri, setTempImageUri] = useState("");
  const [replyingTo, setReplyingTo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const flatlist = useRef();
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const storedChats = useSelector((state) => state.chats.chatsData);
  const chatMessages = useSelector((state) => {
    if (!chatId) return [];
    const chatMessagesData = state.messages.messagesData[chatId];
    if (!chatMessagesData) return [];

    const messageList = [];
    for (const key in chatMessagesData) {
      const message = chatMessagesData[key];
      messageList.push({
        key,
        ...message,
      });
    }
    return messageList;
  });

  const userData = useSelector((state) => state.auth.userData);

  const chatData =
    (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find((uid) => uid !== userData.userId);
    const otherUserData = storedUsers[otherUserId];

    return (
      otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`
    );
  };

  const title = chatData.chatName ?? getChatTitleFromName();

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: title
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
      await sendTextMessage(
        id,
        userData.userId,
        messageText,
        replyingTo && replyingTo.key
      );

      setMessageText("");
      setReplyingTo(null);
    } catch (error) {
      console.log("error", error);
      setErrorBannerText("Message failed to send!");
      setTimeout(() => setErrorBannerText(""), 5000);
    }
  }, [messageText, chatId]);

  const pickImage = useCallback(async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;
      setTempImageUri(tempUri);
    } catch (error) {
      console.log("error", error);
    }
  }, [tempImageUri]);

  const takePhoto = useCallback(async () => {
    try {
      const tempUri = await openCamera();
      if (!tempUri) return;
      setTempImageUri(tempUri);
    } catch (error) {
      console.log("error", error);
    }
  }, [tempImageUri]);

  const uploadImage = useCallback(async () => {
    setIsLoading(true);
    try {
      let id = chatId;
      if (!id) {
        id = await createChat(userData.userId, props.route.params.newChatData);
        setChatId(id);
      }
      const uploadUrl = await uploadImageAsync(tempImageUri, true);
      setIsLoading(false);

      // send image

      await sendImage(
        id,
        userData.userId,
        uploadUrl,
        replyingTo && replyingTo.key
      );
      setReplyingTo(null);
      setTempImageUri("");
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  }, [isLoading, tempImageUri, chatId]);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
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
              ref={(ref) => (flatlist.current = ref)}
              onContentSizeChange={() =>
                flatlist.current.scrollToEnd({ animated: false })
              }
              onLayout={() => flatlist.current.scrollToEnd({ animated: false })}
              data={chatMessages}
              renderItem={(itemData) => {
                const message = itemData.item;

                const isOwnMessage = message.sentBy === userData.userId;

                const messageType = isOwnMessage ? "myMessage" : "theirMessage";

                const sender = message.sentBy && storedUsers[message.sentBy];
                const name = sender && `${sender.firstName} ${sender.lastName}`;

                return (
                  <Bubble
                    type={messageType}
                    text={message.text}
                    messageId={message.key}
                    userId={userData.userId}
                    chatId={chatId}
                    name={
                      !chatData.isGroupChat || isOwnMessage ? undefined : name
                    }
                    date={message.sentAt}
                    imageUrl={message.imageUrl}
                    setReply={() => setReplyingTo(message)}
                    replyingTo={
                      message.replyTo &&
                      chatMessages.find((i) => i.key === message.replyTo)
                    }
                  />
                );
              }}
            />
          )}
        </PageContainer>
        {replyingTo && (
          <ReplyTo
            text={replyingTo.text}
            user={storedUsers[replyingTo.sentBy]}
            onCancel={() => setReplyingTo(null)}
          />
        )}
      </ImageBackground>
      <View style={styles.inputContainer}>
        <Pressable style={styles.icons} onPress={pickImage}>
          <Feather name="plus" size={24} color={Colors.blue} />
        </Pressable>
        <TextInput
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
          style={styles.inputStyle}
          onSubmitEditing={sendMessage}
        />
        {messageText === "" && (
          <Pressable onPress={takePhoto} style={styles.icons}>
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
        <AwesomeAlert
          show={tempImageUri !== ""}
          title="Send Image?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Send image"
          confirmButtonColor={Colors.primary}
          cancelButtonColor={Colors.red}
          titleStyle={styles.popupTitleStyle}
          onCancelPressed={() => setTempImageUri("")}
          onConfirmPressed={uploadImage}
          onDismiss={() => setTempImageUri("")}
          customView={
            <View>
              {isLoading && (
                <ActivityIndicator size="small" color={Colors.primary} />
              )}
              {!isLoading && tempImageUri !== "" && (
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{
                    uri: tempImageUri,
                  }}
                />
              )}
            </View>
          }
        />
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
  popupTitleStyle: {
    fontFamily: "medium",
    letterSpacing: 0.3,
    color: Colors.textColor,
  },
});

export default ChatScreen;
