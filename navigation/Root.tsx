import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import AuthStacks from "./AuthStacks";
import MainTabs from "./MainTabs";

const RootStack = createNativeStackNavigator();

function Root() {
  const isLoggedIn = false;
  const initialRouteName = isLoggedIn ? "/" : "/auth";

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="/" component={MainTabs} />
      <RootStack.Screen name="/auth" component={AuthStacks} />
    </RootStack.Navigator>
  );
}

export default Root;
