import React, { useEffect, useState } from 'react';
import {  Alert, LogBox, Platform, SafeAreaView, Text, View } from 'react-native';

import * as Network from 'expo-network';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages
import Home from '../src/screens/Home/Home';
import Search from '../src/screens/Search/Search';
import Library from '../src/screens/Library/Library';

// Screens
import Welcome from '../src/screens/Welcome/Welcome';
import TermsAndConditions from '../src/screens/Welcome/TermsAndConditions';
import Information from '../src/screens/Information/Information';
import AboutBlockGuRU from '../src/screens/Information/AboutBlockGuRU';
import Acknowledgements from '../src/screens/Information/Acknowledgements';
import AboutPrivacyPolicy from '../src/screens/Information/AboutPrivacyPolicy';
import AboutTermsAndConditions from '../src/screens/Information/AboutTermsAndConditions';
import AboutHelpCenter from '../src/screens/Information/AboutHelpCenter';
import AdditionalResources from '../src/screens/Information/AdditionalResources';
import SinglePost from '../src/screens/Post/SinglePost';
import OfflineSinglePost from '../src/screens/Post/OfflinePost';
import Posts from '../src/screens/Post/Posts';
import SingleCategory from '../src/screens/Category/SingleCategory';
import SingleTechnique from '../src/screens/Technique/SingleTechnique';
import SingleRegion from '../src/screens/Regions/SingleRegions';
import BlockVideoPlayer from '../src/screens/Video/BlockVideoPlayer'

// Icons
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';

// Theme
import { colors, device, NHSColors } from '../constants/theme'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

export default function AppNavigation( { initialRouteName } ) {
    const [ isOffline, setIsOffline ] = useState(false)
    async function checkNetworkConnection() {
        try {
        const network = await Network.getNetworkStateAsync();
        if ( network.isConnected === true && network.isInternetReachable === true ) {
            setIsOffline(false)
        } else {
            setIsOffline(true)
        }
        } catch (error) {
        console.log(error);
        Alert.alert(error.message)
        }
    }
    useEffect(() => {
        checkNetworkConnection()
    }, [])

    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name="Welcome" options={{headerShown: false, title: 'Welcome'}} component={Welcome} />
            <Stack.Screen name="Termsandconditions" options={{headerShown: false, title: 'Terms And Conditions'}} component={TermsAndConditions} />
            <Stack.Screen name="Home" options={{headerShown: false, title: 'Home'}} component={HomeTabs} />
            <Stack.Screen name="Information" options={{headerShown: false, title: 'Information'}} component={Information} />
            <Stack.Screen name="AboutBlockGuRU" options={{headerShown: false, title: 'About'}} component={AboutBlockGuRU} />
            <Stack.Screen name="Acknowledgements" options={{headerShown: false, title: 'Acknowledgements'}} component={Acknowledgements} />
            <Stack.Screen name="AboutPrivacyPolicy" options={{headerShown: false, title: 'Privacy Policy'}} component={AboutPrivacyPolicy} />
            <Stack.Screen name="AboutTermsAndConditions" options={{headerShown: false, title: 'Terms and Conditions'}} component={AboutTermsAndConditions} />
            <Stack.Screen name="AboutHelpCenter" options={{headerShown: false, title: 'Help Center'}} component={AboutHelpCenter} />
            <Stack.Screen name="AdditionalResources" options={{headerShown: false, title: 'Additional Resources'}} component={AdditionalResources} />
            <Stack.Screen name="Post" options={{headerShown: false, presentation: "fullScreenModal", title: 'Post'}} component={SinglePost} />
            <Stack.Screen name="OfflinePost" options={{headerShown: false, presentation: "fullScreenModal", title: 'Post'}} component={OfflineSinglePost} />
            <Stack.Screen name="Posts" options={{headerShown: false, presentation: "fullScreenModal", title: 'Posts'}} component={Posts} />
            <Stack.Screen name="Category" options={{headerShown: false, presentation: "fullScreenModal", title: 'Category'}} component={SingleCategory} />
            <Stack.Screen name="Technique" options={{headerShown: false, presentation: "fullScreenModal", title: 'Technique'}} component={SingleTechnique} />
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
                marginTop: device.osName === "iPadOS" ? 20 :    device.osName === "iOS" ? 10   :    device.osName === 'Android' ? 10: 10,
            },
            tabBarStyle: {
                height: device.osName === "iPadOS" ? 80 :    device.osName === "iOS" ? 80   :    device.osName === 'Android' ? 70: 70,
                justifyContent:'center',
                alignItems: 'center',
            },
            })}>
            <Tab.Screen name="Home Tab" component={Home} options={{title: 'Home'}} />
            <Tab.Screen name="Search Tab" component={Search} options={{title: 'Search'}} />
            <Tab.Screen name="Library Tab" component={Library} options={{title: 'My Library'}} />
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
        label = focused ? <Text className={` ${focusedText} w-full`}>My Library</Text> : <Text className={` ${text} w-full`}>My Library</Text>
        icon = focused ? <Ionicons name='grid' size={iconSize} color={focusedColor}/> : <Ionicons name='grid' size={iconSize} color={color}/>
    } 
    
    return (
        <View className="flex-1 items-center" >
            {icon}
            {label}
        </View>
    )
};