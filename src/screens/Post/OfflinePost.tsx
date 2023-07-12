import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet, Pressable, Animated, FlatList, RefreshControl, Modal, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image } from 'expo-image'

// Icons
import { Ionicons } from '@expo/vector-icons';
import { colors, customStyle, width, shadow } from '../../../constants/theme';

import BottomTabView from './Tabs/BottomTabView';
import CategoryItem from '../../components/shared/Categories/CategoryItem';
import { SmallButton } from '../../components/shared/Button';
import removeSavedVideoByID from '../../../actions/save/removeSavedVideoByID';
import removeSavedPost from '../../../actions/save/removeSavedPost';

export default function OfflineSinglePost( {route, navigation} ) {
    const [ refresh, setRefresh ] = useState(false);
    const [ fetchPost, setFetchPost] = useState(false)

    // onrefresh function used by scrollview
    const onRefresh = useCallback(() => {
        setRefresh(true);
        setFetchPost(true)
    }, []);

    // API functions
    const { post, postContent, postCategories } = route.params
    // Bottom Sheet Variables
    const snapPoints = useMemo(() => ['35%'], []);

  // Asynchronous function to remove the queried post from local storage
  // Uses post title as key
  // The key is saved as a lowercase string with no spaces and symbols
  // Runs an inline function to format the title correctly then saves  it to variable videoTitle
  // If there is an error raise an Alert.
  async function handleDelete(id, title) {
    try {
      await removeSavedVideoByID('posts', id)
      const videoTitle = title.replaceAll(' ', '').toLowerCase()
      await removeSavedPost(videoTitle)
      navigation.goBack()
    } catch (error) {
      console.log(error.message)
      Alert.alert(
        'Something went wrong',
        "An unknown error has occured",
        [{
          text: 'Dismiss',
        }])

    } finally {
      onRefresh()      
    }
  }

    // calls function every time fetchpost state has changed
    // sets variable post to the original values
    // toggles page loading states
    useEffect(() => {
        if (fetchPost === true) {
            try {
                post.author = route.params.post.author
                post.id = route.params.post.id
                post.featured = route.params.post.featured
                post.image_path = route.params.post.image_path
                post.video_path = route.params.post.video_path
                post.post_content_id = route.params.post.post_content_id
                post.title = route.params.post.title
                post.tags = route.params.post.tags
            } catch (error) {
                console.log(error.message)
            } finally {
                setFetchPost(false)
                setRefresh(false);
            }
        }
    }, [fetchPost])
    
    return (
        // renders single post screen without data that requires apis
    <>
        <View className="relative flex-1 h-full pb-5 bg-nhs-white">
            <ScrollView 
                nestedScrollEnabled
                className="flex-1"
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
            >
                {/* Status Bar */}
                <StatusBar translucent backgroundColor="transparent" />
                <View className={`absolute z-20 justify-center items-center w-full`}>
                    <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                        <TouchableOpacity className="flex-row justify-center items-center" onPress={() => {navigation.goBack()}}>
                            <Ionicons name='arrow-back' color='white' size={25}/>
                        </TouchableOpacity>
                        
                    </View>          
                </View>
                <View className="flex-1">
                    <View className="w-full h-[350px] justify-center items-center">
                        <View className="flex-1 w-full h-full bg-nhs-pale-grey">
                            <View className="flex-1 bg-black">                                
                                <Image
                                source={{uri: post.post.image_path}}
                                style={{
                                    width: '110%',
                                    height: '100%'
                                }}
                                contentFit='cover'
                                />
                                <View className="absolute bg-black opacity-40 h-full w-full"/>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="flex-1 mx-5 my-3">
                    <View className="">
                        <Text style={customStyle.h2}>{post.post.title}</Text>
                    </View>
                    <View className="flex-row my-3">
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator
                        decelerationRate={'fast'}
                        data={postCategories}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => {
                            return (
                            <>
                                <View  key={index} className="mr-3">
                                    <CategoryItem data={item} index={index}/>
                                </View>
                            </>
                            )
                        }}
                        />
                    </View>
                    <View className="flex-row w-full gap-2">
                        <TouchableOpacity  onPress={() => navigation.navigate("VideoPlayer", { post: post.post })} className="w-1/2">
                            <SmallButton text="Play" textColor='white' color='light-green' icon='play-circle' />
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => handleDelete(post.post.id, post.post.title)} className="w-1/2">
                            <SmallButton text="Delete" transparent textColor='light-green' borderColor='light-green' color='light-green' icon="ios-trash" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-grow">
                    <BottomTabView tabContent={postContent} />
                </View>
            </ScrollView>
        </View>
    </>
  )
}