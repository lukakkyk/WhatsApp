import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import SignUpForm from "../components/SignUpForm";
import Colors from "../constants/Colors";
import SignInForm from "../components/SignInForm";
const AuthScreen = () => {
  const [isSignup, setIsSignUp] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          {isSignup ? <SignUpForm /> : <SignInForm />}
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => setIsSignUp((prev) => !prev)}
          >
            <Text style={styles.link}>{`Switch to ${
              isSignup ? "Sign In" : "Sign Up"
            } `}</Text>
          </TouchableOpacity>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: Colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
});

export default AuthScreen;
