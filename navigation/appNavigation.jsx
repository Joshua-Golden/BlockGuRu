import React from 'react';
import {  LogBox, Platform, SafeAreaView, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { LightThemeColors } from '../constants/theme';

// Pages
import Home from '../app/home';
import SinglePost from '../app/post/singlePost';
import Search from '../app/search';
import Library from '../app/library';

// Screens
import SinglePostScreen from '../screens/SinglePostScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

export default function AppNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" options={{headerShown: false}} component={HomeTabs} />
            <Stack.Screen name="post/singlePost" options={{headerShown: false}} component={SinglePostScreen} />
            <Stack.Screen name="settings" options={{headerShown: false}} component={SettingsScreen} />
        </Stack.Navigator>
    )
} 

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => menuIcons(route, focused),
            tabBarStyle: {
                height: ios? 100 : 60,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: LightThemeColors.blue
            },
            })}>
            <Tab.Screen name="hometab" component={Home} />
            <Tab.Screen name="searchtab" component={Search} />
            <Tab.Screen name="librarytab" component={Library} />
        </Tab.Navigator>
    )
}

const menuIcons = (route, focused) => {
    let icon;
    let iconSize = 25;
    let focusedIconSize = 30;
    let focusedButtonClass = "rounded-full flex items-center justify-center p-3 bg-nhs-light-blue";
    let focusedText = "text-md text-nhs-white"
    let buttonClass = "bg-white";
    
    if (route.name === 'hometab') {
        label = 'home';
        icon = focused?<Foundation name='home' size={iconSize} color={LightThemeColors.bgLight} /> : <Foundation name='home' size={iconSize} color="white" />
    }   else if (route.name === 'searchtab') {
        label = 'search';
        icon = focused? <Ionicons name='search' size={iconSize} color={LightThemeColors.bgLight}/> : <Ionicons name='search' size={iconSize} color="white" />
    }   else if (route.name === 'librarytab') {
        label = 'search';
        icon = focused? <Ionicons name='grid' size={iconSize} color={LightThemeColors.bgLight}/> : <Ionicons name='grid' size={iconSize} color="white" />
    } 
    
    return (
        <View className="flex-1 justify-center items-center" >
            {icon}
            <Text className="capitalize text-sm mt-1 text-nhs-white">
                {label}
            </Text>
        </View>
    )
}