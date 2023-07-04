import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet, Pressable, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'

import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Modal, SlideAnimation, ModalContent } from'react-native-modals';

// API
import getPostCategoryByVidID from '../../../actions/getPostCategoryByVidID';
import getPostContentByID from '../../../actions/getPostContentByID';

import useFetch from '../../../hooks/useFetch';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { colors, customStyle, sizes, spacing, width, height } from '../../../constants/theme';
import CategoryScroll from '../../components/shared/Categories/CategoryScroll';
import { SmallButton } from '../../components/shared/Button';

import PostContent from '../../components/shared/Posts/PostContent';
import Video from '../Video/Video';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SinglePost( {route, navigation} ) {
    // Tabs Flat List functions
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

    // API functions
    const { post } = route.params
    const { data: postContent, isLoading: isPostContentLoading, error: postContentError, refetch: postContentRefetch } = useFetch(getPostContentByID, post.post_content_id)
    const { data: postCategories, isLoading: isPostCategoriesLoading, error: postCategoriesError, refetch: postCategoriesRefetch } = useFetch(getPostCategoryByVidID, post.id)
    
    // Set values for tabs
    const tabs = ['Anatomy', 'Procedures', 'Tips'];
    const tabContent = [postContent.anatomy, postContent.procedures, postContent.tips]

    // Video Play handler
    const [ isVideoLoading, setIsVideoLoading ] = useState(false)
    function handleVideo() {
        setIsVideoLoading(true)
    }

    const [ modalVisible, setModalVisible ] = useState(false)
    const options = {
        'Download': ['Pause', 'Cancel'],
        'Pause': ['Resume', 'Cancel'],
        'Resume': ['Pause', 'Cancel'],
        'Complete': ['Remove']
    }
    const [ action, setAction ] = useState('')

    // Video Download handler
    const [ download, setDownload ] = useState('');
    const [ isDownloading, setIsDownloading ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ isPaused, setIsPaused ] = useState(false);
    const [ isCanceled, setIsCanceled ] = useState(false);
    const [ isComplete, setIsComplete ] = useState(false);
    const [ error, setError ] = useState('');

    // create private id number for video download
    const video_id = Math.random().toString().slice(2,10);
    const videoDir = FileSystem.documentDirectory + 'videos/';
    const videoURL = post.video_path

    const ensureDirExists = async ( videoDir ) => {
        const dirInfo = await FileSystem.getInfoAsync(videoDir);
        if (!dirInfo.exists) {
          console.log("Video directory doesn't exist, creating...");
          await FileSystem.makeDirectoryAsync(videoDir, { intermediates: true });
        }
    };
    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setProgress(progress);
    };
    const downloadResumable = useRef(FileSystem.createDownloadResumable(
        videoURL,
        videoDir + `${video_id}.mp4`,
        {},
        callback
    ));

    function handleDownload( action, post ) { 
        setModalVisible(false)
        setAction(action)
        console.log(action)
                
        const savePost = async (uri, post, video_id) => {
            console.log(uri)
            const data = {'title': post.title, 'uri': uri, 'id': video_id}
            try {
                setIsSaving(true)
                console.log('saving post')
                await SecureStore.setItemAsync(`posts`, JSON.stringify(data))
                console.log('Saved post to secure store')
                setIsComplete(true);
            } catch (error) {
                setError(error)
                console.error(error.message);
            } finally {
                setIsSaving(false)
            }
        }
        const downloadVideo = async ( videoURL, params ) => {
            try{
                setIsDownloading(true)
                setIsCanceled(false)
                await ensureDirExists( videoDir );
                const { uri } = await downloadResumable.current.downloadAsync();
                console.log("Download complete: ", params.id)
                console.log(uri)
                setDownload(uri)
                savePost(uri, params, video_id)
                setIsComplete(true)
                setAction('Complete')
            } catch(error) {
                setError(error)
                console.error(error.message)
            } finally {
                setIsDownloading(false)
            }
        }
        const pauseDownload = async ( videoURL, params ) => {
            try {
                setIsPaused(false)
                const { resumeData } = await downloadResumable.current.pauseAsync();
                console.log("Download paused: ", params.id)
                await AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.current.savable()));
                setDownload('pausedDownload')  
                console.log(resumeData)
            } catch (error) {
                setError(error)
                console.error(error.message)
            } finally {
                setIsPaused(true)
            }
        }
        const resumeDownload = async ( videoURL, params ) => {
            try {
                setIsDownloading(true)
                setIsPaused(false)
                const { uri } = await downloadResumable.current.resumeAsync();
                setDownload(uri)  
                savePost(uri, params, video_id)
                console.log("Download resuming: ", params.id)
            } catch (error) {
                setError(error)
                console.error(error.message)
            } finally {
                setIsComplete(true)
                setIsDownloading(false)
            }
        }
        const cancelDownload = async ( videoURL, params ) => {
            try {
                const { resumeData } = await downloadResumable.current.pauseAsync();
                console.log("Canceling download: ", params.id)
                setIsCanceled(true)
            } catch (error) {
                setError(error)
                console.error(error.message)
            } finally {
                setAction('Complete')
            }
        }
        if ( post !== 'null' && post !== 'undefined') {
            if (action === 'Pause') { 
                console.log(isPaused)
                if (!isPaused) {
                    pauseDownload(videoURL, post)
                } else {
                    console.log('Already paused')
                }
            } else if (action ==='Resume') {
                console.log(action)
                if (isPaused) {
                    resumeDownload(videoURL, post)
                } else {
                    console.log('Already resumed')
                }
            } else if (action === 'Download') {
                console.log(action)
                if (!isDownloading) {
                    downloadVideo(videoURL, post)
                } else {
                    console.log('Already downloading')
                }
            } else if (action === 'Cancel') {
                console.log(action)
                if (isDownloading) {
                    cancelDownload(videoURL, post)
                } else {
                    console.log('No download to cancel')
                }
            }
        }
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
                                <View className="flex-row w-full items-center justify-center gap-2 mt-3">
                                    <TouchableOpacity onPress={() => handleVideo()} className="w-1/3">
                                        <SmallButton text="Play" textColor='white' color='light-green' icon='play-circle' />
                                    </TouchableOpacity>

                                                
                                    {(!isDownloading && !isPaused && !isComplete) || (isCanceled) ? (
                                        <TouchableOpacity onPress={() => handleDownload('Download', post)} className="w-2/3">
                                            <SmallButton text="Download" textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon='download-outline' />
                                        </TouchableOpacity>
                                    ) : (
                                        <View className="w-2/3">
                                            <TouchableOpacity onPress={() => setModalVisible((current) => !current)} className="w-full">                                            
                                                {isComplete ? (
                                                    <SmallButton text="Downloaded" textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon='md-checkbox-outline' />
                                                ) : (
                                                    action === 'Download' || action === 'Resume' ? (
                                                        <View className="flex-row px-4 py-2 justify-center items-center border-[2px] border-nhs-light-green rounded-full">
                                                            <View className="mr-2">
                                                                <CircularProgress value={progress * 100} radius={10} activeStrokeWidth={4} inActiveStrokeWidth={1} />
                                                            </View>
                                                            <Text className="text-nhs-light-green">Downloading</Text>
                                                        </View>
                                                    ) : (
                                                        <SmallButton text={action === 'Download' ? 'Pause' : action === 'Pause' ? 'Resume' : 'Download'} textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon='download-outline' />
                                                    )
                                                )}
                                            </TouchableOpacity>
                                            <Modal
                                                visible={modalVisible}
                                                modalAnimation={new SlideAnimation({ slideFrom: 'bottom'})}
                                                onSwipeOut={() => setModalVisible(false)}
                                                onTouchOutside={() => setModalVisible(false)}>
                                                <ModalContent>
                                                    { action === 'Download' ? (
                                                        options.Download.map((option, i) => (
                                                            <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className="w-full h-10 mx-3 ml-1 pt-3">
                                                                <Text>{option}</Text>
                                                            </TouchableOpacity>))
                                                    ) : action === 'Pause' ? (                        
                                                        options.Pause.map((option, i) => (
                                                            <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className="w-full h-10 mx-3 ml-1 pt-3">
                                                                <Text>{option}</Text>
                                                            </TouchableOpacity>))
                                                    ) : action === 'Resume' ? (
                                                        options.Resume.map((option, i) => (
                                                            <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className="w-full h-10 mx-3 ml-1 pt-3">
                                                                <Text>{option}</Text>
                                                            </TouchableOpacity>))
                                                    ) : action === 'Complete' ? (
                                                        options.Complete.map((option, i) => (
                                                            <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className="w-full h-10 mx-3 ml-1 pt-3">
                                                                <Text>{option}</Text>
                                                            </TouchableOpacity>))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </ModalContent>
                                            </Modal>
                                            
                                        </View>                                        
                                    )}
                                    
                                </View>
                            </View>
                            <View className="flex-1 mx-5 my-3">
                                <View className="w-full h-full">
                                    <View className="flex-row justify-between items-center w-full">
                                        {tabs.map((e, i) => (
                                            <Pressable key={i} className="w-1/3 flex-col" onPress={() => tapScroll(i)}>
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
                                                <View key={index} className="mt-4 mx-5" style={{ width: width - 80}}>
                                                    <PostContent content={item}/>
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

