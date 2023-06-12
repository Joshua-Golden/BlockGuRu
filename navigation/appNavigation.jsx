import React from 'react';
import {  LogBox, Platform, SafeAreaView, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { LightThemeColors, NHSColors } from '../constants/theme';

// Pages
import Home from '../app/home';
import Search from '../app/search';
import Library from '../app/library';
import Post from '../app/post';
import Settings from '../app/settings';

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
            <Stack.Screen name="post" options={{headerShown: false}} component={Post} />
            <Stack.Screen name="settings" options={{headerShown: false}} component={Settings} />
        </Stack.Navigator>
    )
} 

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => menuIcons(route, focused),
            tabBarIconStyle: {
                marginTop: ios? 4 : 0,
            },
            tabBarStyle: {
                height: ios? 60 : 50,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: NHSColors['nhs-white']
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
    let iconSize = 20;
    let focusedIconSize = 30;
    let focusedButtonClass = "rounded-full flex items-center justify-center p-3 bg-nhs-light-blue";
    let focusedText = "text-md text-nhs-white"
    let buttonClass = "bg-white";
    
    if (route.name === 'hometab') {
        label = 'home';
        icon = focused?<Foundation name='home' size={iconSize} color={NHSColors['nhs-light-blue']} /> : <Foundation name='home' size={iconSize} color={NHSColors['nhs-mid-grey']} />
    }   else if (route.name === 'searchtab') {
        label = 'search';
        icon = focused? <Ionicons name='search' size={iconSize} color={NHSColors['nhs-light-blue']}/> : <Ionicons name='search' size={iconSize} color={NHSColors['nhs-mid-grey']} />
    }   else if (route.name === 'librarytab') {
        label = 'search';
        icon = focused? <Ionicons name='grid' size={iconSize} color={NHSColors['nhs-light-blue']}/> : <Ionicons name='grid' size={iconSize} color={NHSColors['nhs-mid-grey']} />
    } 
    
    return (
        <View className="flex-1 justify-center items-center" >
            {icon}
        </View>
    )
};