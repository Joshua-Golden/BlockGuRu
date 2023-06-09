import React from 'react';
import { Dimensions, LogBox, Platform, View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LightThemeColors } from '../constants/theme';

// Screens
import Home from '../app/home';
import Search from '../app/search';
import Library from '../app/library';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ios = Platform.Os == 'ios';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

export default function AppNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" options={{headerShown: false}} component={HomeTabs} />
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
                marginBottom: 0,
                height: 75,
                borderRadius: 15,
                alignItems: 'center',
                backgroundColor: LightThemeColors.blue
            },
            tabBarItemStyle: {
                marginTop: ios? 30: 0,
            }
            })}>
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="search" component={Search} />
            <Tab.Screen name="library" component={Library} />
        </Tab.Navigator>
    )
}

const menuIcons = (route, focused) => {
    let icon;
    let iconSize = 25;
    let focusedIconSize = 30;
    let focusedButtonClass = "rounded-full flex items-center justify-center p-3 shadow bg-nhs-light-blue";
    let buttonClass = "bg-white";
    
    if (route.name === 'home') {
        icon = focused?<Foundation name='home' size={iconSize} color={LightThemeColors.bgLight} /> : <Foundation name='home' size={iconSize} color="white" />
    }   else if (route.name === 'search') {
        icon = focused? <Ionicons name='search' size={iconSize} color={LightThemeColors.bgLight}/> : <Ionicons name='search' size={iconSize} color="white" />
    }   else if (route.name === 'library') {
        icon = focused? <Ionicons name='grid' size={iconSize} color={LightThemeColors.bgLight}/> : <Ionicons name='grid' size={iconSize} color="white" />
    } 
    
    return (
        <View>
            {icon}
        </View>
    )
}