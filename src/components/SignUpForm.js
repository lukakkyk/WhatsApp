import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signUp } from "../utils/actions/authActions";
import { Alert, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  // const stateData = useSelector((state) => state.auth);
  // console.log("stateData", stateData);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      console.log(validateInput(inputId, inputValue));
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    try {
      setIsLoading(true);
      const action = signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      dispatch(action);
      setError(null);
    } catch (error) {
      console.log("error", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Input
        icon="user"
        onInputChanged={inputChangedHandler}
        id="firstName"
        IconPack={Feather}
        iconSize={24}
        label="First Name"
        autoCapitalize="none"
        errorText={formState.inputValidities["firstName"]}
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
      />
      <Input
        icon="lock"
        onInputChanged={inputChangedHandler}
        IconPack={Feather}
        iconSize={24}
        label="password"
        id="password"
        autoCapitalize="none"
        secureTextEntry={true}
        errorText={formState.inputValidities["password"]}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={Colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign up"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUpForm;
