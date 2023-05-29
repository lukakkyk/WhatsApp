import React from 'react'
import { Text, View, Button } from 'react-native'
import { logOut } from '../utils/actions/authActions'
import { useDispatch } from "react-redux";
const ChatListScreen = ({navigation}) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut())
  }

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>Chat List screen</Text>
        <Button title='log out' onPress={logout} />
        <Button title='chat screen' onPress={() => navigation.navigate('ChatScreen')} />
        
    </View>
  )
}

export default ChatListScreen
