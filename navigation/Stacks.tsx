import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

const NativeStack = createNativeStackNavigator();
// TODO: 여기부터 작업 시작
function Stacks() {
  return (
    <NativeStack.Navigator initialRouteName="/auth">
      <NativeStack.Screen
        name="/auth"
        component={() => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 36 }}>Auth다</Text>
          </View>
        )}
      />
    </NativeStack.Navigator>
  );
}

export default Stacks;
