import {EvilIcons, Ionicons, Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import {Button} from "react-native";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Drinks"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Drinks"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="drink" size={20} style={{marginBottom: -3}} color={color} />,
        }}
      />
    <BottomTab.Screen
        name="MyBar"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="fridge-outline" size={24} style={{marginBottom: -3}} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}



// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator({navigation}:{navigation:any}) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Drinks',
            headerTintColor:'#fff',
            headerStyle: {
                backgroundColor: '#ff6f61'
            },headerRight: () => (
                <EvilIcons name="user" size={40} color="white" style={{paddingHorizontal: 10}}  onPress={() => navigation.navigate('User')}/>

            ), }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator({navigation}:{navigation:any}) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'My Bar',
            headerTintColor:'#fff',
            headerStyle: {
                backgroundColor: '#ff6f61'
            }, headerRight: () => (
                <EvilIcons name="user" size={40} color="white" style={{paddingHorizontal: 10}}  onPress={() => navigation.navigate('User')}/>

            ),}}
      />
    </TabTwoStack.Navigator>
  );
}
