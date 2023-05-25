import React, { useReducer, useCallback } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      console.log(validateInput(inputId, inputValue));
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );

  return (
    <>
      <Input
        icon="mail"
        IconPack={Feather}
        iconSize={24}
        label="Email"
        id="email"
        keyboardType="email-address"
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['email']}
      />
      <Input
        icon="lock"
        IconPack={Feather}
        iconSize={24}
        label="password"
        id="password"
        autoCapitalize="none"
        secureTextEntry={true}
        onInputChanged={inputChangedHandler}
      />
      <SubmitButton
        title="Click me"
        style={{ marginTop: 20 }}
        onPress={() => console.log("button pressed")}
        errorText={formState.inputValidities['password']}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignInForm;
