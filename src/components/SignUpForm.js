import React from 'react'
import Input from './Input';
import SubmitButton from './SubmitButton';
import { Feather } from '@expo/vector-icons';
const SignUpForm = props => {
  return (
    <>
      <Input
        icon="user"
        IconPack={Feather}
        iconSize={24}
        label="First Name"
      />
      <Input icon="user" IconPack={Feather} iconSize={24} label="Last Name" />
      <Input icon="mail" IconPack={Feather} iconSize={24} label="Email" />
      <Input icon="lock" IconPack={Feather} iconSize={24} label="password" />
      <SubmitButton title="Click me" style={{marginTop:20}} onPress={() => console.log('button pressed')} />
   </>
  )
}

export default SignUpForm
