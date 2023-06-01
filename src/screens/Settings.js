import React, { useCallback, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "../components/Input";
import { useSelector, useDispatch } from "react-redux";
import SubmitButton from "../components/SubmitButton";
import Colors from "../constants/Colors";
import ProfileImage from "../components/ProfileImage";
import {
  updateSignedInUserData,
  userLogout,
} from "../utils/actions/authActions";
import { updateLogeedInUserData } from "../store/authSlice";
const Settings = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData", userData);
  const initialState = {
    inputValues: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      about: userData.about || "",
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      console.log(validateInput(inputId, inputValue));
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;
    try {
      // console.log("updatedValues", updatedValues);
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);
      dispatch(
        updateLogeedInUserData({
          newData: updatedValues,
        })
      );
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
    // Alert.alert(updatedValues);
  }, [formState, dispatch]);

  return (
    <PageContainer>
      <PageTitle title="Settings" />
      <ProfileImage
        size={80}
        userId={userData.userId}
        uri={userData.profilePicture}
      />
      <ScrollView>
        <Input
          icon="user"
          onInputChanged={inputChangedHandler}
          id="firstName"
          IconPack={Feather}
          iconSize={24}
          label="First Name"
          autoCapitalize="none"
          errorText={formState.inputValidities["firstName"]}
          initialValue={userData.firstName}
        />
        <Input
          icon="user"
          onInputChanged={inputChangedHandler}
          IconPack={Feather}
          iconSize={24}
          id="lastName"
          label="Last Name"
          autoCapitalize="none"
          errorText={formState.inputValidities["lastName"]}
          initialValue={userData.lastName}
        />
        <Input
          icon="mail"
          onInputChanged={inputChangedHandler}
          IconPack={Feather}
          iconSize={24}
          label="Email"
          id="email"
          keyboardType="email-address"
          autoCapitalize="none"
          errorText={formState.inputValidities["email"]}
          initialValue={userData.email}
        />
        <Input
          icon="user"
          onInputChanged={inputChangedHandler}
          IconPack={Feather}
          iconSize={24}
          label="About"
          id="about"
          // keyboardType="email-address"
          autoCapitalize="none"
          errorText={formState.inputValidities["about"]}
        />
        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved!</Text>}
          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={Colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            <SubmitButton
              title="Save"
              onPress={saveHandler}
              style={{ marginTop: 20 }}
              disabled={!formState.formIsValid}
            />
          )}
          <SubmitButton
            title="Logout"
            onPress={() => dispatch(userLogout())}
            style={{ marginTop: 20 }}
            // disabled={!formState.formIsValid}
            color={Colors.red}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
