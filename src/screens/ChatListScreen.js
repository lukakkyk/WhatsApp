import React, { useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";
import DataItem from "../components/DataItem";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import Colors from "../constants/Colors";
const ChatListScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const selectedUser = props.route?.params?.selectedUserId;
  const selectedUserList = props.route?.params?.selectedUsers;
  const chatName = props.route?.params?.chatName;

  const storedUsers = useSelector((state) => state.users.storedUsers);


  
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updateAt) - new Date(a.updateAt);
    });
  });

  useEffect(() => {
    if (!selectedUser && !selectedUserList) {
      return;
    }

    let chatData;
    let navigationProps;

    if (selectedUser) {
      chatData = userChats.find(
        (cd) => !cd.isGroupChat && cd.users.includes(selectedUser)
      );
    }

    if (chatData) {
      navigationProps = { chatId: chatData.key };
    } else {
      const chatUsers = selectedUserList || [selectedUser];
      if (!chatUsers.includes(userData.userId)) {
        chatUsers.push(userData.userId);
      }

      navigationProps = {
        newChatData: {
          users: chatUsers,
          isGroupChat: selectedUserList !== undefined,
          chatName:chatName
        },
      };
    }

  

    props.navigation.navigate("ChatScreen", navigationProps);
  }, [props.route?.params]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="new Chat"
              iconName="camera-outline"
              // onPress={() =>navigation.navigate('NewChat')}
            />
            <Item
              title="new Chat"
              iconName="create-outline"
              onPress={() => props.navigation.navigate("NewChat")}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  return (
    <PageContainer>
      <PageTitle title="Chats" />
      <View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("NewChat", { isGroupChat: true })
          }
        >
          <Text style={styles.newGroupText}>New Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const isGroupChat = chatData.isGroupChat;
          let title = "";
          const subTitle = chatData.latestMessageText || "New Chat";
          let image = "";

          if (isGroupChat) {
            title = chatData.chatName;
          } else {
            const otherUserId = chatData.users.find(
              (uid) => uid !== userData.userId
            );
            const otherUser = storedUsers[otherUserId];

            if (!otherUser) return;
            title = `${otherUser.firstName} ${otherUser.lastName}`;
            image = otherUser.profilePicture;
          }

          return (
            <DataItem
              onPress={() =>
                props.navigation.navigate("ChatScreen", { chatId: chatId })
              }
              title={title}
              subTitle={subTitle}
              image={image}
            />
          );
        }}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  newGroupText: {
    color: Colors.blue,
    fontSize: 17,
    marginBottom: 5,
  },
});

export default ChatListScreen;
