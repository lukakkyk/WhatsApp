import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validate } from "validate.js";
const SignUpForm = (props) => {
  const inputChangedHandler = (inputId, inputValue) => {
    // console.log("inputId " + inputId), console.log("inputValue " + inputValue);
    if (inputId === "firstName" || inputId === "lastName") {
      // console.log(
      //   validate(
      //     { firstName: inputValue },
      //     { firstName: { presence: { allowEmpty: false } } }
      //   )
      // );
    } else if (inputId === "email") {
    } else if (inputId === "password") {
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
      />
      <Input
        icon="user"
        onInputChanged={inputChangedHandler}
        IconPack={Feather}
        iconSize={24}
        id="lastName"
        label="Last Name"
      />
      <Input
        icon="mail"
        onInputChanged={inputChangedHandler}
        IconPack={Feather}
        iconSize={24}
        label="Email"
        id="email"
      />
      <Input
        icon="lock"
        onInputChanged={inputChangedHandler}
        IconPack={Feather}
        iconSize={24}
        label="password"
        id="password"
      />
      <SubmitButton
        title="Click me"
        style={{ marginTop: 20 }}
        onPress={() => console.log("button pressed")}
      />
    </>
  );
};

export default SignUpForm;
