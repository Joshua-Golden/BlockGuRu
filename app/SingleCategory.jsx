import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform, Button, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors, ios } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import getPostCategoryByID from '../actions/getPostCategoryByID';
import PostCard from '../components/Posts/PostCard';

const SingleCategory = (data) => {
  const navigation = useNavigation();
  const category = data.route.params
  console.log(category)

  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
    async function getPosts() {
        const posts = await getPostCategoryByID(category.id);
        console.log(posts)     
        setPosts(posts)
      }
      getPosts()
  }, [])
  
  return (
    <View className="flex-1 ">
        {/* Status Bar */}
        <StatusBar />
        {/* Navigation */}
        <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-10" : "py-4"}`}>
            <View className="flex-row mx-5 justify-start items-center">
                <TouchableOpacity className="mr-2" onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={25}/>
                </TouchableOpacity>
                <Text className="font-bold text-2xl text-nhs-black">{category.title}</Text>
            </View>
            <View className="px-5 my-2">
                <Text className="text-lg text-nhs-black">Found {posts.length} results</Text>
            </View>
        </SafeAreaView>

        <View className="bg-nhs-white px-5 flex-1">
            <View className="bg-nhs-white mb-2">
                <Text className="font-bold text-lg text-nhs-black">{}</Text>
            </View>        
            <FlatList
                scrollEnabled  
                vertical
                showsVerticalScrollIndicator
                data={posts}
                keyExtractor={item => item.Post.id}
                renderItem={({item}) => {                    
                    return (
                        <View className="mb-3 border-b-[1px] border-neutral-200">
                            <PostCard item={item.Post} />
                        </View>
                    )
                }}
            />        
        </View>

    </View>

)
};

export default SingleCategory;