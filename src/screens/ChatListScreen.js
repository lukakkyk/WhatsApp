import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";
import DataItem from "../components/DataItem";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
const ChatListScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const selectedUser = props.route?.params?.selectedUserId;
  const storedUsers = useSelector((state) => state.users.storedUsers);
  console.log("storedUsers", storedUsers);
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updateAt) - new Date(a.updateAt);
    });
  });

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const chatUsers = [selectedUser, userData.userId];

    const navigationProps = {
      newChatData: {
        users: chatUsers,
      },
    };

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
      <FlatList
        data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const otherUserId = chatData.users.find(
            (uid) => uid !== userData.userId
          );
          const otherUser = storedUsers[otherUserId];

          if (!otherUser) return;

          const title = `${otherUser.firstName} ${otherUser.lastName}`;
          const subTitle = chatData.latestMessageText || "New Chat";
          const image = otherUser.profileImage;

          return (
            <DataItem
              onPress={() =>
                props.navigation.navigate("ChatScreen", { chatId:chatId })
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

export default ChatListScreen;
