import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signIn, signUp } from "../utils/actions/authActions";
import { Alert, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "lukakkyk@gmail.com" : "",
    password: isTestMode ? "123456" : "",
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};

const SignInForm = (props) => {
  const dispatch = useDispatch();
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

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("formState.inputValues", formState.inputValues);
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);

      await dispatch(action);
    } catch (error) {
      console.log("error", error);
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <>
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
        value={formState.inputValues.email}
        initialValue={formState.inputValues.email}
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
        value={formState.inputValues.password}
        initialValue={formState.inputValues.password}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={Colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign in"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;
