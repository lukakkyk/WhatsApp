import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";

const Input = ({label, icon, iconSize, errorText, IconPack, onInputChanged, id, ...props }) => {

  const onChangetext = (text) => {
    setValue(text)
     onInputChanged(id, text)
  }

  const [value, setValue] = useState(props.initialValue);
  console.log('initialValue', props.initialValue)

  return (
    <View style={styles.cotnainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
      {icon && <IconPack style={styles.icon} name={icon} size={iconSize || 15} color="black" />}
        <TextInput {...props} style={styles.input} value={value} onChangeText={onChangetext} />
      </View>
      {errorText && <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  cotnainer: {
    width: "100%",
  },
  inputContainer:{
    width:'100%',
    backgroundColor:'red',
    paddingHorizontal:10,
    paddingVertical:15,
    borderRadius:2,
    backgroundColor:Colors.nearlyWhite,
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    marginRight:10,
    color:Colors.grey
  },
  label:{
    marginVertical:8,
    fontFamily:'bold',
    letterSpacing:0.3,
    color:Colors.textColor
  },
  input:{
    flex:1,
    color:Colors.textColor,
    letterSpacing:0.3,
    fontFamily:'regular',
    paddingTop:0
  },
  errorContainer:{
    marginVertical:5
  },
  errorText:{
    color:'red',
    fontSize:13,
    fontFamily:'regular',
    letterSpacing:0.3
  }
});

export default Input;
