import React, { useCallback, useReducer } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signUp } from "../utils/actions/authActions";

import {getFirebaseApp}  from '../utils/firebaseHelper';

console.log('getFirebaseApp', getFirebaseApp())

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
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      console.log(validateInput(inputId, inputValue));
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = () => {
    signUp(
      formState.inputValues.firstName,
      formState.inputValues.lastName,
      formState.inputValues.email,
      formState.inputValues.password
    );
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
      <SubmitButton
        title="Click me"
        style={{ marginTop: 20 }}
        onPress={authHandler}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignUpForm;
