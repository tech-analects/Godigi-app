import { View, Text } from "react-native";
import React from "react";
// import { Stack } from 'expo-router'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import VerifyCode from "./verifyCode";
import ResetPassword from "./resetPassword";
import VerifyUser from "./verifyUser";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
      ></Stack.Screen>
      <Stack.Screen name="verifyCode" component={VerifyCode}></Stack.Screen>
      <Stack.Screen name="verifyUser" component={VerifyUser}></Stack.Screen>
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
