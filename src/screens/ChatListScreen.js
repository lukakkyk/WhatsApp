import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";
const ChatListScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const selectedUser = props.route?.params?.selectedUserId;

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Chat List screen</Text>
      {/* <Button title='log out' onPress={logout} /> */}
      <Button
        title="chat screen"
        onPress={() => props.navigation.navigate("ChatScreen")}
      />
    </View>
  );
};

export default ChatListScreen;
