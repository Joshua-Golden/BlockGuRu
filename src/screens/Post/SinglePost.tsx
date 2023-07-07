import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet, Pressable, Animated, FlatList, RefreshControl, Modal } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Video } from 'expo-av';

import { AbortController } from 'native-abort-controller'
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress'

// API
import getPostCategoryByVidID from '../../../actions/database/getPostCategoryByVidID';
import getPostContentByID from '../../../actions/database/getPostContentByID';

import useFetch from '../../../hooks/useFetch';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { colors, customStyle, width, shadow } from '../../../constants/theme';
import CategoryScroll from '../../components/shared/Categories/CategoryScroll';
import { SmallButton } from '../../components/shared/Button';

import PostContent from '../../components/shared/Posts/PostContent';
import saveVideos from '../../../actions/save/saveVideos';
import deleteSavedVideoByTitle from '../../../actions/save/deleteSavedVideoByTitle';
import getSavedVideoByTitle from '../../../actions/save/getSavedVideoByTitle';
import deleteSavedVideos from '../../../actions/save/deleteSavedVideos';
import {  BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';



export default function SinglePost( {route, navigation} ) {
    const controller = new AbortController()
    const signal = controller.signal

    signal.addEventListener('abort', () => {
        console.log('aborted!')
    })
    
    const [ refresh, setRefresh ] = useState(false);
    const [ fetchPost, setFetchPost] = useState(false)
    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        setFetchPost(true)
    }, []);

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
    
    const [ useLocalFile, setUseLocalFile ] = useState(false)
    const [ pausedDownload, setPausedDownload ] = useState({})
    
    const [ errorModalVisible, setErrorModalVisible ] = useState(false)
    const [ modalVisible, setModalVisible ] = useState(false)
    const options = {
        'Download': ['Pause', 'Cancel'],
        'Pause': ['Resume', 'Cancel'],
        'Resume': ['Pause', 'Cancel']
    }
    // Bottom Sheet Variables
    const snapPoints = useMemo(() => ['35%'], []);

    useEffect(() => {
        async function getSavedPost() {
            // previously paused download
            const title = post.title.replaceAll(' ', '').toLowerCase()
            const downloadSnapshotJson = await SecureStore.getItemAsync(title);
            const downloadSnapshot = JSON.parse(downloadSnapshotJson);
            if (downloadSnapshot !== null) {
                setPausedDownload(downloadSnapshot)
                setAction('Pause')
            }
            const result = await getSavedVideoByTitle('posts', post.title)
            if (result.length > 0 && typeof result !== undefined && result !== null ) {
                    
                setUseLocalFile(true)
                setAction('Complete')
            } else {
                setUseLocalFile(false)
                setAction('Can download')
            }
        }
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
                console.log(post)
            } catch (error) {
                setError(error.message)
                console.log(error.message)
            } finally {
                setFetchPost(false)
                setRefresh(false);
            }
        }
        getSavedPost()
    }, [fetchPost])
    
    const video = React.useRef(null)

    // Set values for tabs
    const tabs = ['Anatomy', 'Procedures', 'Tips'];
    const tabContent = [postContent.anatomy, postContent.procedures, postContent.tips]

    // Video Play handler
    const [ isVideoLoading, setIsVideoLoading ] = useState(false)
    function handleVideo() {
        setIsVideoLoading(true)
    }

    // Video Download handler
    const [ action, setAction ] = useState('Can download')
    const [ videoDownloadProgress, setVideoDownloadProgress ] = useState(0);
    const [ currentVideoSize, setCurrentVideoSize ] = useState(0);
    const [ maxVideoSize, setMaxVideoSize ] = useState(0);
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
        setVideoDownloadProgress(progress);
        setCurrentVideoSize(Math.round(downloadProgress.totalBytesWritten / 1000000));
        setMaxVideoSize(Math.round(downloadProgress.totalBytesExpectedToWrite / 1000000));
    };
    const downloadResumable = useRef(FileSystem.createDownloadResumable(
        videoURL,
        videoDir + `${video_id}.mp4`,
        {},
        callback
    ));

    function handleDownload( action, post ) { 
        console.log(action)

        const savePost = async (uri, params, video_id, maxVideoSize) => {
            try {
                await saveVideos('posts', video_id, params.title, uri, params.video_path, params.image_path, maxVideoSize )
                setAction('Complete')
                const result = await getSavedVideoByTitle('posts', params.title)
                console.log(result)
                
                if ( result.length > 0 && typeof result !== "undefined" && result !== null) {
                    post.video_path = result[0].uri
                    setUseLocalFile(true)
                    setAction('Complete')
                }
            } catch (error) {
                setAction('Failed')
                setError(error)
                setErrorModalVisible(true)
                console.error('Video could not save')
                console.error(error.message);
            }
        }
        const removeDownload = async ( params ) => {
            try {
                const currentVideo = await getSavedVideoByTitle('posts', params.title)
                console.log(currentVideo)
                console.log('currentVideo')
                
                if (typeof currentVideo === 'object' && currentVideo.length !> 0) {

                    if ( currentVideo[0].video_path && currentVideo[0].video_path !== null && currentVideo[0].video_path !== undefined && currentVideo[0].video_path !== '' ) {
                        post.video_path = currentVideo[0].video_path
                        const title = params.title.replaceAll(' ', '').toLowerCase()
                        await SecureStore.deleteItemAsync(title)
                        
                        await deleteSavedVideoByTitle('posts', params.title)

                        setAction('Deleted')
                        setUseLocalFile(false)
                    
                        // check if post has been deleted
                        const result = await SecureStore.getItemAsync(title)
                        if ( result !== null && result !== undefined && result !== '' && result.length > 0 ) {
                            console.log(result)
                            if (JSON.parse(result).title === params.title) {
                                console.log('Delete unsuccessful')
                            }
                        } else {
                            console.log(result)
                            console.log('Delete successful')
                            setAction('Can download')
                        }
                    } else {
                        console.log('Cannot find video path')
                        setError('Error deleting this video.')
                    }
                } else {
                    setRefresh(true)
                    console.log('No file found to delete')
                    setError('Error deleting this video.')
                }
            } catch(error) {
                setAction('Failed')
                console.error(error.message)
                setError(error.message)
                setErrorModalVisible(true)
            } finally {
                setRefresh(false)
            }
        }
        const downloadVideo = async ( params ) => {
            console.log(params)
            if ( params.video_path === undefined || params.video_path === null || params === null ) {
                console.log('Cannot find file path to download.')
            } else if ( params.video_path.startsWith('file://') && downloadResumable.current.fileUri.startsWith('file://')) {
                setErrorModalVisible(true)
                setUseLocalFile(true)
                setError('Local download found.')
                console.log('Local download found.')
            } else {
                setAction('Downloading')
                setModalVisible(true)
                try{
                    await ensureDirExists( videoDir );
                    const result = await downloadResumable.current.downloadAsync();
                    console.log('result')
                    console.log(result)
                    console.log("Download complete: ", params.id)
                    savePost(result.uri, params, video_id, result.headers["content-length"])
                    setAction('Cannot download')

                } catch(error) {
                    setAction('Failed')
                    setError(error)
                    setErrorModalVisible(true)
                    console.error(error.message)
                }
            }

        }
        const pauseDownload = async ( params ) => {
            try {
                downloadResumable.current.pauseAsync();
                console.log("Download paused: ", params.id)
                const title = params.title.replaceAll(' ', '').toLowerCase()
                await SecureStore.setItemAsync(title, JSON.stringify(downloadResumable.current.savable()));
            } catch (error) {
                setError(error)
                setErrorModalVisible(true)
                onRefresh()
                console.error(error.message)
                console.log(action)
                setAction('Failed')
            } finally {
            }
        }
        const resumeDownload = async ( params ) => {
            try {
                
                console.log("Download resuming: ", params.id)
                const downloadResumable = new FileSystem.DownloadResumable(
                    pausedDownload.url,
                    pausedDownload.fileUri,
                    pausedDownload.options,
                    callback,
                    pausedDownload.resumeData
                );
                setAction('Downloading')
                const { uri } = await downloadResumable.resumeAsync();
                savePost(uri, params, video_id, maxVideoSize)

            } catch (error) {
                setAction('Failed')
                setError(error)
                setErrorModalVisible(true)
                console.error(error.message)
            }
        }
        const cancelDownload = async ( params ) => {
            try {
                downloadResumable.current.pauseAsync();
                console.log("Canceling download: ", params.id)
                setAction('Cancelled')
            } catch (error) {
                setError(error)
                console.error(error.message)
            } finally {
                setAction('Cancelled')
            }
        }
        if ( post !== 'null' && post !== 'undefined') {
            if (action === 'Pause') { 
                pauseDownload(post)
            } else if (action ==='Resume') {
                resumeDownload(post)
            } else if (action === 'Download') {
                setModalVisible(true)
                downloadVideo(post)
            } else if (action === 'Cancel') {
                cancelDownload(post)
            } else if (action === 'Remove') {
                removeDownload(post)
            }
        }
    }

    async function deleteSavedVideo() {
        const results = await deleteSavedVideoByTitle('posts', 'text')
        console.log(results)
    }
    async function deleteSavedVideose() {
        const results = await deleteSavedVideos('posts')
        console.log(results)
    }


    //ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        setModalVisible(true)
        bottomSheetModalRef.current?.present();
    }, []);
    const handleDismissModalPress = useCallback(() => {
        setModalVisible(false)
        bottomSheetModalRef.current?.dismiss();
    }, []);

    return (
    <>
        <View className="relative flex-1 h-full pb-5 bg-nhs-white">
            <ScrollView className="flex-1"
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
                                    <Video 
                                        ref={video}
                                        style={{ width: width, aspectRatio: 16/9}}
                                        isLooping
                                        shouldPlay
                                        useNativeControls
                                        source={{uri: post.video_path}}
                                    />
                                    {/* <Video post={post} /> */}
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
                                    <Text style={customStyle.h2}>{post.title}</Text>
                                </View>
                                <View className="flex-row mt-3">
                                    <CategoryScroll categoryData={{ postCategories, postCategoriesError, isPostCategoriesLoading, postCategoriesRefetch }}/>
                                </View>
                                <View className="flex-row w-full items-center justify-center gap-2 mt-3">
                                    <TouchableOpacity  onPress={() => handleVideo()} className="w-1/3">
                                        <SmallButton text="Play" textColor='white' color='light-green' icon='play-circle' />
                                    </TouchableOpacity>
                                    {( action !== 'Cannot download' && action === "Can download" && !useLocalFile ) || action === '' || !useLocalFile || action === 'Deleted' ? (
                                        <TouchableOpacity onPress={() => {modalVisible ? handleDismissModalPress() : handlePresentModalPress()}} className="w-2/3">
                                            <SmallButton text="Download" textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon='download-outline' />
                                        </TouchableOpacity>
                                    ) : (
                                        <View className="w-2/3">
                                            <TouchableOpacity onPress={() => {modalVisible ? handleDismissModalPress() : handlePresentModalPress()}} className="w-full">
                                                <SmallButton text={action === 'Download' && !useLocalFile ? 'Pause' : action === 'Pause' ? 'Resume' : action === 'Complete' ? 'Downloaded' : action === 'Downloading' ? 'Downloading' : useLocalFile ? 'Downloaded' : 'error'} textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon={action === 'Complete' || useLocalFile && action ==='Download' ? 'md-checkbox-outline' : useLocalFile ? 'md-checkbox-outline' :'download-outline' } />
                                            </TouchableOpacity>                                          
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
            { modalVisible ? (
                <>
                    <TouchableOpacity onPress={() => handleDismissModalPress()} className="absolute bg-black/30 h-full w-full" />
                </>
            ) : (
                <></>
            )}

            {/* DownloadModal */}
            <BottomSheetModalProvider>
                <View>
                    <BottomSheetModal
                    enablePanDownToClose
                    onDismiss={() => setModalVisible(false)}
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}>
                    <View className="relative bg-nhs-white w-full px-8 rounded-t-[40px] bottom-0 justify-center items-center">
                        { useLocalFile && action !== 'Complete' ? (
                            <>
                                <View className="w-full justify-center items-center">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Already Downloaded</Text>
                                        <Text className="text-nhs-black text-md text-center">We found a local version of {post.title}. You can view it in your library or remove it.</Text>
                                    </View>
                                    <View className="w-full flex-row gap-2 mt-4 ">
                                        <TouchableOpacity onPress={() => {handleDownload('Remove', post)}} className="w-1/2">
                                            <SmallButton text="Remove" textColor='white' color='red' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {navigation.navigate('home' , { screen: 'librarytab'}); }} className="w-1/2">
                                            <SmallButton text="Go to Library" textColor='white' color='light-green' />
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                            </>
                        ) : (
                            <>
                            { action === 'Can download' || action ==='Download' || action === 'Failed' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl">Available to Download</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} is available for download.</Text>
                                    </View>
                                    <View className="w-full flex-row gap-2 mt-4">
                                    <TouchableOpacity onPress={() => {handleDownload('Download', post)}} className="w-1/2">
                                            <SmallButton text="Download" textColor='white' color='light-green' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {navigation.navigate('home' , { screen: 'librarytab'})}} className="w-1/2">
                                            <SmallButton text="Go to Library" textColor='white' color='light-green' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : action === 'Downloading' || action ==='Pause' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl">Download</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} is still downloading... Please wait or hide the process</Text>
                                    </View>
                                    <View className="w-full justify-center items-center my-6">
                                        <View className="flex-row w-full justify-between items-center">
                                            <Text className="text-lg font-bold">{currentVideoSize} / {maxVideoSize} MB</Text>
                                            <Text className="text-lg font-bold">{Math.round(videoDownloadProgress * 100)}%</Text>
                                        </View>
                                        <View className="w-full">
                                            <Progress.Bar progress={Math.round(videoDownloadProgress * 100)} width={null} />
                                        </View>
                                    </View>
                                    <View className="w-full flex-row gap-2">
                                    {options.Download.map((option, i) => (
                                        <TouchableOpacity onPress={() => {handleDownload(option, post)}} key={i} className={`w-1/2 px-4 py-2 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
                                            <Text className="text-nhs-white font-bold tracking-wide text-lg">{option}</Text>
                                        </TouchableOpacity>))}
                                    </View>
                                </View>
                            ) : action === 'Resume' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Download</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} is still downloading... Please wait or hide the process</Text>
                                    </View>
                                    <View className="w-full justify-center items-center my-6">
                                        <View className="flex-row w-[85%] justify-between items-center">
                                            <Text className="text-lg font-bold">{currentVideoSize} / {maxVideoSize} MB</Text>
                                            <Text className="text-lg font-bold">{Math.round(videoDownloadProgress * 100)}%</Text>
                                        </View>
                                        <View className="w-full">
                                            <Progress.Bar progress={Math.round(videoDownloadProgress * 100)} width={null} />
                                        </View>
                                    </View>
                                    <View className="w-full gap-2 flex-row">
                                        {options.Resume.map((option, i) => (
                                            <TouchableOpacity onPress={() => {handleDownload(option, post)}} key={i} className={`w-1/2 px-4 py-2 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
                                                <Text className="text-nhs-white font-bold tracking-wide text-lg">{option}</Text>
                                            </TouchableOpacity>))}
                                    </View>
                                    
                                </View>
                            ) : action === 'Complete' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Download Complete</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} has finished downloading. You can view it in your library or remove it.</Text>
                                    </View>
                                    <View className="w-full flex-row gap-2 mt-4 ">
                                        <TouchableOpacity onPress={() => {handleDownload('Remove', post)}} className="w-1/2">
                                            <SmallButton text="Remove" textColor='white' color='red' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {navigation.navigate('home' , { screen: 'librarytab'}); setModalVisible(false)}} className="w-1/2">
                                            <SmallButton text="Go to Library" textColor='white' color='light-green' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <></>
                            )}
                            </>
                        )}
                    </View>
                </BottomSheetModal>
                </View>

            </BottomSheetModalProvider>

            
        </View>
    </>
  )
}