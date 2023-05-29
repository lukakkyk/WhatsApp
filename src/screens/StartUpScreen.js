import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import commonStyle from "../constants/commonStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { authenticate, setDidTryAutoLogin } from "../store/authSlice";
import { getUserData } from "../utils/actions/userActions";
const StartUpScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const storeAuthInfo = await AsyncStorage.getItem("userData");
      if (!storeAuthInfo) {
        dispatch(setDidTryAutoLogin());
        return;
      }
      const parsedData = JSON.parse(storeAuthInfo);
      console.log(parsedData);
      const { token, userId, expiryDate: expiryDateString } = parsedData;
      const expiryDate = new Date(expiryDateString);
      if (expiryDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAutoLogin());
        return;
      }
      const userData = await getUserData(userId);
      dispatch(authenticate({
        token:token,
        userData
      }))
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={commonStyle.center}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartUpScreen;
