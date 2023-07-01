import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet, Pressable, Animated, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'

// API
import getPostCategoryByVidID from '../../../actions/getPostCategoryByVidID';
import getPostContentByID from '../../../actions/getPostContentByID';

import useFetch from '../../../hooks/useFetch';

// Icons
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';
import { colors, customStyle, sizes, spacing, width, height } from '../../../constants/theme';
import CategoryScroll from '../../components/shared/Categories/CategoryScroll';
import { SmallButton } from '../../components/shared/Button';

import PostContent from '../../components/shared/Posts/PostContent';
import Video from '../Video/Video';


export default function SinglePost( {route, navigation} ) {
    const ref = React.useRef<FlatList>(null);
    const [ selected, setSelected ] = useState(0);

    const onScroll = ({ nativeEvent }) => {
        const index = Math.round(nativeEvent.contentOffset.x / (width - 20))
        
        setSelected(index)

    }
    const tapScroll = ( i:number ) => {
        setSelected(i)
        ref.current?.scrollToIndex({
            index: i,
            animated: true,
        })
    }

    const { post } = route.params
    const { data: postContent, isLoading: isPostContentLoading, error: postContentError, refetch: postContentRefetch } = useFetch(getPostContentByID, post.post_content_id)
    const { data: postCategories, isLoading: isPostCategoriesLoading, error: postCategoriesError, refetch: postCategoriesRefetch } = useFetch(getPostCategoryByVidID, post.id)
    const tabs = ['Anatomy', 'Procedures', 'Tips'];
    const tabContent = [postContent.anatomy, postContent.procedures, postContent.tips]

    const [ isVideoLoading, setIsVideoLoading ] = useState(false)
    function handleVideo() {
        setIsVideoLoading(true)
    }
    
    return (
    <>
        <View className="flex-1 h-full pb-5 bg-nhs-white">
            <ScrollView className="flex-1">
                {/* Status Bar */}
                <StatusBar translucent backgroundColor="transparent" />
                <View className={`absolute z-20 justify-center items-center w-full`}>
                    <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                        <TouchableOpacity className="flex-row justify-center items-center" onPress={() => {navigation.goBack()}}>
                            <Ionicons name='arrow-back' color='white' size={25}/>
                        </TouchableOpacity>
                        
                    </View>          
                </View>

                        {isPostContentLoading ? (                  
                        <View className="h-full justify-center items-center">
                            <ActivityIndicator size='large' color="black" />
                        </View>
                        ) : postContentError ? (
                            <>
                                <Text>Something went wrong</Text>
                            </>
                        ) : typeof postContent !== "undefined" && postContent !== null && postContent.length !== null && Object.hasOwn(postContent, 'id') ? (
                            <>                             

                            {isVideoLoading ? (
                                <>
                                    <Video post={post} />
                                </>
                            ) : (
                                <View className="flex-1">
                                    <View className="w-full h-[350px] justify-center items-center">
                                        <View className="flex-1 w-full h-full bg-nhs-pale-grey">
                                            <View className="flex-1 bg-black">
                                                <Image
                                                source={{uri: post.image_path}}
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
                            )}

                            <View className={`flex-1 mx-5 my-3`}>
                                <View className="">
                                    <Text style={styles.title}>{post.title}</Text>
                                </View>
                                <View className="flex-row mt-3">
                                    <CategoryScroll categoryData={{ postCategories, postCategoriesError, isPostCategoriesLoading, postCategoriesRefetch }}/>
                                </View>
                                <View className="flex-row w-full gap-2 mt-3">
                                    <TouchableOpacity onPress={() => handleVideo()} className="w-full">
                                        <SmallButton text="Play" color='light-green' icon='play-circle' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className="flex-1 mx-5 my-3">
                                <View className="w-full h-full">
                                    <View className="flex-row justify-between items-center w-full">
                                        {tabs.map((e, i) => (
                                            <Pressable className="w-1/3 flex-col" onPress={() => tapScroll(i)}>
                                                <View className="w-full items-center mb-1">
                                                    <Animated.Text
                                                        style={[
                                                        customStyle.h3,
                                                        selected == i && {color: colors.lightGreen},
                                                        ]}>
                                                        {e}
                                                    </Animated.Text>
                                                </View>
                                                {selected == i ? <View className="bg-nhs-light-green mt-1 py-[1.2px] rounded-full" /> : <View className="bg-nhs-pale-grey mt-1 py-[1.2px] rounded-full"></View>}
                                                
                                            </Pressable>
                                        ))}
                                    </View>
                                    <FlatList
                                        ref={ref}
                                        data={tabContent}
                                        snapToAlignment='center'
                                        decelerationRate="fast"
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled     
                                        bounces={false}
                                        onScroll={onScroll}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <>
                                                <View className="mt-4 mx-5" style={{ width: width - 80}}>
                                                    <PostContent key={index} content={item}/>
                                                </View>
                                        </>
                                            )
                                        }}
                                    
                                        

                                    />

                                </View>
                            </View>
                            </>
                        ) : (
                            <>                            
                                <Text>No data available</Text>
                            </>
                        )}


            </ScrollView>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    favorite: {
      position: 'absolute',
      top: spacing.m,
      right: spacing.m,
      zIndex: 1,
    },
    title: {
      fontSize: sizes.h2,
      fontWeight: 'bold',
      color: colors.black,
    },
    secondary: {
      fontSize: sizes.p,
      color: colors.white,
    },
    starCon: {
      flexDirection: 'row',
      marginVertical: 9,
    },
    star: {
      marginRight: 5,
    },
    titleItem: {
      fontSize: 16,
      fontWeight: '600',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    body: {
      paddingHorizontal: 20,
      flex: 1,
    },
    line: {
      height: 2,
      backgroundColor: colors.lightGreen,
      alignSelf: 'center',
      marginTop: 3,
    },
    image: {
      width: width / 3.8,
      height: width / 3.8,
      borderRadius: 10,
    },
    footerItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footerItemText: {
      fontSize: 14,
      color: 'gray',
      marginLeft: 10,
      fontWeight: '500',
    },
    iconHeart: {
      tintColor: colors.lightGray,
    },
    buttonHeart: {
      position: 'absolute',
      right: 15,
      top: 1,
    },
  });

