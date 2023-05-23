import React from 'react'
import { Text, View, Button } from 'react-native'
const ChatListScreen = ({navigation}) => {
  return (
    <View>
      <Text>Chat List screen</Text>
        <Button title='chat screen' onPress={() => navigation.navigate('ChatScreen')} />
        
    </View>
  )
}

export default ChatListScreen
