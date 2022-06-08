import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Stacks from "./Stacks";
import MainTabs from "./MainTabs";

const RootStack = createNativeStackNavigator();

function Root() {
  const isLoggedIn = false;

  return (
    <RootStack.Navigator
      initialRouteName={isLoggedIn ? "MainTabs" : "AuthStacks"}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen name="AuthStacks" component={Stacks} />
    </RootStack.Navigator>
  );
}

export default Root;
