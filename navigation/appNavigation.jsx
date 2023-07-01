import React from 'react';
import {  LogBox, Platform, SafeAreaView, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Pages
import Home from '../src/screens/Home/Home';
import Search from '../src/screens/Search/Search';
import Library from '../src/screens/Library/Library';

// Screens
import Welcome from '../src/screens/Welcome/Welcome';
import TermsAndConditions from '../src/screens/Welcome/TermsAndConditions';
import SinglePost from '../src/screens/Post/SinglePost';
import SingleCategory from '../src/screens/Category/SingleCategory';
import Tips from '../src/screens/Post/Tabs/Tips';
import Anatomy from '../src/screens/Post/Tabs/Anatomy';
import Procedure from '../src/screens/Post/Tabs/Procedure';

// Icons
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';

// Theme
import { colors, ios, NHSColors } from '../constants/theme'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

export default function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName='welcome'>
            <Stack.Screen name="welcome" options={{headerShown: false, title: 'Welcome'}} component={Welcome} />
            <Stack.Screen name="termsandconditions" options={{headerShown: false, title: 'Terms And Conditions'}} component={TermsAndConditions} />
            <Stack.Screen name="home" options={{headerShown: false, title: 'Home'}} component={HomeTabs} />
            <Stack.Screen name="post" options={{headerShown: false, presentation: "fullScreenModal", title: 'Post'}} component={SinglePost} />
            <Stack.Screen name="category" options={{headerShown: false, presentation: "fullScreenModal", title: 'Category'}} component={SingleCategory} />
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
                marginTop: ios? 10 : 0,
            },
            tabBarStyle: {
                height: ios? 80 : 70,
                justifyContent:'center',
                alignItems: 'center',
            },
            })}>
            <Tab.Screen name="hometab" component={Home} options={{title: 'Home'}} />
            <Tab.Screen name="searchtab" component={Search} options={{title: 'Search'}} />
            <Tab.Screen name="librarytab" component={Library} options={{title: 'Library'}} />
        </Tab.Navigator>
    )
}

const menuIcons = (route, focused) => {
    let icon;
    let iconSize = 23;
    let focusedColor = colors.lightGreen
    let color = colors.lightGray
    let focusedText = "text-md font-bold text-nhs-light-green"
    let text = "text-md text-lightGray"
    
    if (route.name === 'hometab') { 
        label = focused ? <Text className={focusedText}>Home</Text> : <Text className={text}>Home</Text>
        icon = focused ? <Foundation name='home' size={iconSize} color={focusedColor}/> : <Foundation name='home' size={iconSize} color={color} />
    }   else if (route.name === 'searchtab') {
        label = focused ? <Text className={focusedText}>Search</Text> : <Text className={text}>Search</Text>
        icon = focused ? <Ionicons name='search' size={iconSize} color={focusedColor} /> : <Ionicons name='search' size={iconSize}  color={color}/>
    }   else if (route.name === 'librarytab') {
        label = focused ? <Text className={focusedText}>Library</Text> : <Text className={text}>Library</Text>
        icon = focused ? <Ionicons name='grid' size={iconSize} color={focusedColor}/> : <Ionicons name='grid' size={iconSize} color={color}/>
    } 
    
    return (
        <View className="flex-1 justify-center items-center" >
            {icon}
            {label}
        </View>
    )
};