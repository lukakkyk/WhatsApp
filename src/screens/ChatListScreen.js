import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
const ChatListScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
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
              onPress={() =>navigation.navigate('NewChat')}
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
        onPress={() => navigation.navigate("ChatScreen")}
      />
    </View>
  );
};

export default ChatListScreen;
