import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
const ChatScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text>Chat Screen</Text>
        <Button title='navigate to chat settings' onPress={() => navigation.navigate('ChatSettings')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ChatScreen
