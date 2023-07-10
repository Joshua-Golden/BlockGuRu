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
import SingleRegion from '../src/screens/Regions/SingleRegions';
import BlockVideoPlayer from '../src/screens/Video/BlockVideoPlayer'

// Icons
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';

// Theme
import { colors, device, NHSColors } from '../constants/theme'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

export default function AppNavigation( { initialRouteName } ) {
    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name="Welcome" options={{headerShown: false, title: 'Welcome'}} component={Welcome} />
            <Stack.Screen name="Termsandconditions" options={{headerShown: false, title: 'Terms And Conditions'}} component={TermsAndConditions} />
            <Stack.Screen name="Home" options={{headerShown: false, title: 'Home'}} component={HomeTabs} />
            <Stack.Screen name="Post" options={{headerShown: false, presentation: "fullScreenModal", title: 'Post'}} component={SinglePost} />
            <Stack.Screen name="Category" options={{headerShown: false, presentation: "fullScreenModal", title: 'Category'}} component={SingleCategory} />
            <Stack.Screen name="Region" options={{headerShown: false, presentation: "fullScreenModal", title: 'Region'}} component={SingleRegion} />
            <Stack.Screen name="VideoPlayer" options={{headerShown: false, presentation: "fullScreenModal", title: 'Video Player'}} component={BlockVideoPlayer} />
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
                marginTop: device.osName === "iOS" ? 10 : 0,
            },
            tabBarStyle: {
                height: device.osName === "iOS" ? 80 : 70,
                justifyContent:'center',
                alignItems: 'center',
            },
            })}>
            <Tab.Screen name="Home Tab" component={Home} options={{title: 'Home'}} />
            <Tab.Screen name="Search Tab" component={Search} options={{title: 'Search'}} />
            <Tab.Screen name="Library Tab" component={Library} options={{title: 'Library'}} />
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
    
    if (route.name === 'Home Tab') { 
        label = focused ? <Text className={` ${focusedText} w-full`}>Home</Text> : <Text className={` ${text} w-full`}>Home</Text>
        icon = focused ? <Foundation name='home' size={iconSize} color={focusedColor}/> : <Foundation name='home' size={iconSize} color={color} />
    }   else if (route.name === 'Search Tab') {
        label = focused ? <Text className={` ${focusedText} w-full`}>Search</Text> : <Text className={` ${text} w-full`}>Search</Text>
        icon = focused ? <Ionicons name='search' size={iconSize} color={focusedColor} /> : <Ionicons name='search' size={iconSize}  color={color}/>
    }   else if (route.name === 'Library Tab') {
        label = focused ? <Text className={` ${focusedText} w-full`}>Library</Text> : <Text className={` ${text} w-full`}>Library</Text>
        icon = focused ? <Ionicons name='grid' size={iconSize} color={focusedColor}/> : <Ionicons name='grid' size={iconSize} color={color}/>
    } 
    
    return (
        <View className="flex-1 justify-center items-center" >
            {icon}
            {label}
        </View>
    )
};