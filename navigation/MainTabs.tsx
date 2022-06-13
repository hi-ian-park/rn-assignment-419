import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Account from 'screens/Account';
import Home from 'screens/Home';
import Search from 'screens/Search';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: '#eee',
      }}
      initialRouteName="/home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0f0f0f',
        tabBarInactiveTintColor: '#9d9d9d',
      }}
    >
      <Tab.Screen name="/home" component={Home} />
      <Tab.Screen name="/search" component={Search} />
      <Tab.Screen name="/account" component={Account} />
    </Tab.Navigator>
  );
}

export default MainTabs;
