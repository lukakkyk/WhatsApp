import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PageContainer from "../components/PageContainer";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import commonStyle from "../constants/commonStyle";
import { searchUsers } from "../utils/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { setStoredUsers } from "../store/userSlice";
import DataItem from "../components/DataItem";
import ProfileImage from "../components/ProfileImage";
const NewChatScreen = ({ navigation, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);

  const isGroupChat = props.route.params && props.route.params.isGroupChat;
  const isGroupChatDisabled = selectedUsers.length === 0 || chatName === "";

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="close" onPress={() => navigation.goBack()} />
          </HeaderButtons>
        );
      },
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            {isGroupChat && (
              <Item
                disabled={isGroupChatDisabled}
                // color={isGroupChatDisabled ? 'red' : undefined}
                title="Create"
                onPress={() =>
                  navigation.navigate("ChatList", {
                    selectedUsers,
                    chatName
                  })
                }
              />
            )}
          </HeaderButtons>
        );
      },
      headerTitle: isGroupChat ? "add participants" : "New Chat",
    });
  }, [chatName, selectedUsers]);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === "") {
        setUsers();
        setNoResultsFound(false);
        return;
      }

      setIsLoading(true);
      const usersResult = await searchUsers(searchTerm);
      delete usersResult[userData.userId];
      setUsers(usersResult);
      console.log("usersResult", usersResult);
      if (Object.keys(usersResult).length === 0) {
        setNoResultsFound(true);
      } else {
        setNoResultsFound(false);
        dispatch(setStoredUsers({ newUsers: usersResult }));
      }
      //   setUsers({});
      //   setNoResultsFound(true);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const userPressed = (userId) => {
    if (isGroupChat) {
      const newSelectedUsers = selectedUsers.includes(userId)
        ? selectedUsers.filter((id) => id !== userId)
        : selectedUsers.concat(userId);
      setSelectedUsers(newSelectedUsers);
    } else {
      navigation.navigate("ChatList", {
        selectedUserId: userId,
      });
    }
  };

  return (
    <PageContainer>
      {isGroupChat && (
        <>
          <View style={styles.chatNameContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textBox}
                placeholder="Enter a name for your chat!"
                autoCorrect={false}
                autoComplete="false"
                onChangeText={(text) => setChatName(text)}
                value={chatName}
              />
            </View>
          </View>

          <View style={styles.selectedUsersContainer}>
            <FlatList
              style={styles.selectedUsersList}
              contentContainerStyle={{ alignItems: "center" }}
              data={selectedUsers}
              keyExtractor={(item) => item}
              horizontal={true}
              renderItem={(itemData) => {
                const userId = itemData.item;
                const userData = storedUsers[userId];
                return (
                  <ProfileImage
                    style={styles.selectedUserStyle}
                    size={40}
                    uri={userData.profilePicture}
                    onPress={() => userPressed(userId)}
                    showRemoveButton={true}
                  />
                );
              }}
            />
          </View>
        </>
      )}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {isLoading && (
        <View style={commonStyle.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {!isLoading && !noResultsFound && users && (
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userId = itemData.item;
            const userData = users[userId];
            return (
              <DataItem
                title={`${userData.firstName} ${userData.lastName}`}
                subTitle={userData.about}
                image={userData.profilePicture}
                onPress={() => userPressed(userId)}
                type={isGroupChat ? "checkbox" : ""}
                isChecked={selectedUsers.includes(userId)}
              />
            );
          }}
        />
      )}
      {!isLoading && noResultsFound && (
        <View style={commonStyle.center}>
          <FontAwesome
            name="question"
            size={55}
            color={Colors.lightGrey}
            style={styles.noResultIcon}
          />
          <Text style={styles.noResultText}>No users found!</Text>
        </View>
      )}
      {!isLoading && !users && (
        <View style={commonStyle.center}>
          <FontAwesome
            name="users"
            size={55}
            color={Colors.lightGrey}
            style={styles.noResultIcon}
          />
          <Text style={styles.noResultText}>
            Enter a name to search a user!
          </Text>
        </View>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.extraLightGrey,
    height: 30,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },

  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: "100%",
  },
  noResultIcon: {
    marginBottom: 20,
  },
  noResultText: {
    color: Colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  chatNameContainer: {
    paddingVertical: 10,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.nearlyWhite,
    flexDirection: "row",
    borderRadius: 5,
  },
  textBox: {
    color: Colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
    width: "100%",
  },
  selectedUsersContainer: {
    height: 50,
    justifyContent: "center",
  },
  selectedUsersList: {
    height: "100%",
    paddingTop: 10,
  },
  selectedUserStyle: {
    marginRight: 10,
  },
});

export default NewChatScreen;
