import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, Animated, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {Image} from 'expo-image';

import { NHSColors } from '../constants/theme';

import { useWindowDimensions } from 'react-native';
// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import Tabs from '../components/Posts/Content/Tabs';
import Content from '../components/Posts/Content/Content';
import getPostContentByID from '../actions/getPostContentByID';
import VideoPlayer from '../components/Posts/Video/VideoPlayer';

const ios = Platform.OS == 'ios';

const tabs = ["Tips", "Procedure", "Anatomy"];
const Post = (data) => {
    const {width} = useWindowDimensions() 
    const navigation = useNavigation();

    const item = data.route.params.item

    const [ postContent, setPostContent ] = useState([]);
    useEffect(() => {
      async function getCategory() {
        const postContent = await getPostContentByID(item.PostContentID);
        setPostContent(postContent)
      }
      getCategory()
    }, [])

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const displayTabContent = () => {
        switch (activeTab) {
            case "Tips":
                return (
                    <Content content={postContent.tips} />
                )
            case "Procedure":
                return (
                    <Content content={postContent.procedures} />
                )
            case "Anatomy":
                return (
                    <Content content={postContent.anatomy} />
                )
        }
    }

    return (
        <View className="flex-1 bg-nhs-white">
            <View className="relative">
                <VideoPlayer post={item} />                
            </View>
            <ScrollView className="flex-1 bg-white px-5">
                <View className="flex-row space-x-2 mb-1">
                    <View className="flex-col items-center space-x-1">
                        <View className="flex-col my-4">
                            <View className="flex-row justify-start items-center mb-3">
                                <TouchableOpacity 
                                    onPress={()=>navigation.goBack()} 
                                    className="bg-gray-50 p-2 mr-3r rounded-full shadow">
                                    <Ionicons name='arrow-back' color={NHSColors['nhs-blue']} size={30}/>
                                </TouchableOpacity>
                                <Text className="font-extrabold text-2xl mb-1 text-nhs-black">{item.title}</Text>
                            </View>
                            <View className="flex-row justify-center items-start">
                                {item.tags.map(tag => { return(
                                    <TouchableOpacity>
                                    <Text className="font-normal text-md mx-1 text-nhs-black">#{tag}</Text></TouchableOpacity>
                                )})}
                            </View>
                            <Text className="font-semibold text-lg text-gray-700 my-2">{item.author}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-1">
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <ScrollView className="mx-3">{displayTabContent()}</ScrollView>  

                </View>    
            </ScrollView>
        </View>

)
};

export default Post