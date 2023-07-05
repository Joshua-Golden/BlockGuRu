import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet, Pressable, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Video } from 'expo-av';

import CircularProgress from 'react-native-circular-progress-indicator';
import { BottomModal, SlideAnimation, ModalContent, ModalFooter, ModalButton } from'react-native-modals';
import * as Progress from 'react-native-progress'

// API
import getPostCategoryByVidID from '../../../actions/database/getPostCategoryByVidID';
import getPostContentByID from '../../../actions/database/getPostContentByID';

import useFetch from '../../../hooks/useFetch';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { colors, customStyle, sizes, spacing, width, height, ios } from '../../../constants/theme';
import CategoryScroll from '../../components/shared/Categories/CategoryScroll';
import { SmallButton } from '../../components/shared/Button';

import PostContent from '../../components/shared/Posts/PostContent';
// import Video from '../Video/Video';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import saveVideos from '../../../actions/save/saveVideos';
import getSavedVideos from '../../../actions/save/getSavedVideos';
import deleteSavedVideoByTitle from '../../../actions/save/deleteSavedVideoByTitle';
import getSavedVideoByTitle from '../../../actions/save/getSavedVideoByTitle';
import deleteSavedVideos from '../../../actions/save/deleteSavedVideos';
import { Triangle } from 'three';

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
    
    const [ useLocalFile, setUseLocalFile ] = useState(false)
    const [ oldVideoPath, setOldVideoPath ] = useState(post.video_path)
    const [ pausedDownload, setPausedDownload ] = useState({})
    
    useEffect(() => {
        async function getSavedPost() {
            // previously paused download
            const title = post.title.split(" ").join("-").toLowerCase()
            const downloadSnapshotJson = await SecureStore.getItemAsync(title);
            const downloadSnapshot = JSON.parse(downloadSnapshotJson);
            if (downloadSnapshot !== null) {
                setPausedDownload(downloadSnapshot)
                setAction('Pause')
            }

            if (post.video_path === undefined || post.video_path === null ) {
                setAction('Cannot download')
                console.log('No video path found.')
            } else {
                const result = await getSavedVideoByTitle('posts', post.title)
                if ( result.length > 0 && typeof result !== undefined && result !== null ) {
                    
                        setOldVideoPath(post.video_path)
                        post.video_path = result[0].uri
                        setUseLocalFile(true)
                        setAction('Complete')
                    }
            }
        }
        getSavedPost()
    }, [])
    
    const video = React.useRef(null)

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
        'Resume': ['Pause', 'Cancel']
    }

    // Video Download handler
    const [ action, setAction ] = useState('Can download')
    const [ progress, setProgress ] = useState(0);
    const [ videoSize, setVideoSize ] = useState(0);
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
        setVideoSize(downloadProgress.totalBytesExpectedToWrite);
    };
    const downloadResumable = useRef(FileSystem.createDownloadResumable(
        videoURL,
        videoDir + `${video_id}.mp4`,
        {},
        callback
    ));

    function handleDownload( action, post ) { 
        console.log(action)
        setModalVisible(false)
        setAction(action)

        const savePost = async (uri, params, video_id) => {
            try {
                await saveVideos('posts', video_id, params.title, uri)
                setAction('Complete')
                const result = await getSavedVideoByTitle('posts', params.title)
                
                if ( result.length > 0 && typeof result !== "undefined" && result !== null) {
                    post.video_path = result.uri
                    setUseLocalFile(true)
                    setAction('Complete')
                }
            } catch (error) {
                setError(error)
                console.error('Video could not save')
                console.error(error.message);
            }
        }
        const removeDownload = async ( params ) => {
            try {
                await deleteSavedVideoByTitle('posts', params.title)
                setAction('Deleted')
                setUseLocalFile(false)
                post.video_path = oldVideoPath
                const title = params.title.split(" ").join("-").toLowerCase()
                const result = await SecureStore.getItemAsync(JSON.stringify(title))
                await SecureStore.deleteItemAsync(title)
                console.log(result)
            } catch(error) {
                console.error(error.message)
            }
        }
        const downloadVideo = async ( params ) => {
            console.log(params.video_path)
            if ( params.video_path === undefined || params.video_path === null || params === null ) {
                console.log('Cannot find file path to download.')
            } else if ( params.video_path.startsWith('file://')) {
                setModalVisible(true)
                setUseLocalFile(true)
                console.log('Local download found.')
            } else {
                try{
                    await ensureDirExists( videoDir );
                    const { uri } = await downloadResumable.current.downloadAsync();
                    console.log("Download complete: ", params.id)
                    savePost(uri, params, video_id)
                } catch(error) {
                    setError(error)
                    console.error(error.message)
                }
            }
        }
        const pauseDownload = async ( params ) => {
            try {
                const { resumeData } = await downloadResumable.current.pauseAsync();
                console.log("Download paused: ", params.id)
                const title = params.title.split(" ").join("-").toLowerCase()
                await SecureStore.setItemAsync(JSON.stringify(title), JSON.stringify(downloadResumable.current.savable()));
                console.log(downloadResumable.current.savable())
                console.log(resumeData)
            } catch (error) {
                setError(error)
                console.error(error.message)
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
                const { uri } = await downloadResumable.resumeAsync();
                savePost(uri, params, video_id)
            } catch (error) {
                setError(error)
                console.error(error.message)
            }
        }
        const cancelDownload = async ( params ) => {
            try {
                const { resumeData } = await downloadResumable.current.pauseAsync();
                console.log("Canceling download: ", params.id)
            } catch (error) {
                setError(error)
                console.error(error.message)
            } finally {
                setAction('Download')
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
                                    <TouchableOpacity onPress={() => handleVideo()} className="w-1/3">
                                        <SmallButton text="Play" textColor='white' color='light-green' icon='play-circle' />
                                    </TouchableOpacity>
                                                
                                    {( action !== 'Cannot download' && action === "Download" && !useLocalFile ) || action === '' || !useLocalFile || action === 'Deleted' ? (
                                        <TouchableOpacity onPress={() => handleDownload('Download', post)} className="w-2/3">
                                            <SmallButton text="Download" textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon='download-outline' />
                                        </TouchableOpacity>
                                    ) : (
                                        <View className="w-2/3">
                                            <TouchableOpacity onPress={() => setModalVisible((current) => !current)} className="w-full">
                                                <SmallButton text={action === 'Download' && !useLocalFile ? 'Pause' : action === 'Pause' ? 'Resume' : action === 'Complete' ? 'Downloaded' : useLocalFile ? 'Downloaded' : 'error'} textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon={action === 'Complete' || useLocalFile && action ==='Download' ? 'md-checkbox-outline' : useLocalFile ? 'md-checkbox-outline' :'download-outline' } />
                                            </TouchableOpacity>
                                            <BottomModal
                                                width={width * 80 / 100}
                                                visible={modalVisible}
                                                
                                                modalAnimation={new SlideAnimation({ slideFrom: 'bottom'})}
                                                onSwipeOut={() => setModalVisible(false)}
                                                onTouchOutside={() => setModalVisible(false)}>
                                                <ModalContent className="w-full justify-center items-center">
                                                    <View className="relative w-full justify-center items-center gap-4">
                                                        <TouchableOpacity onPress={() => setModalVisible(false)} className="z-20 absolute top-0 right-0 ">
                                                            <Ionicons name="close" color={'#E8EDEE'} size={20}/>
                                                        </TouchableOpacity>
                                                        { useLocalFile && action !== 'Complete' ? (
                                                            <>
                                                                <View className="w-full justify-center items-center">
                                                                    <View className="w-full my-4 justify-center items-center">
                                                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Already Downloaded</Text>
                                                                        <Text className="text-nhs-black text-md text-center">We found a local version of {post.title}. You can view it in your library or remove it.</Text>
                                                                    </View>
                                                                    <View className="w-full flex-row gap-2 mt-4 ">
                                                                        <TouchableOpacity onPress={() => handleDownload('Remove', post)} className="w-1/2">
                                                                            <SmallButton text="Remove" textColor='white' color='red' />
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() => {navigation.navigate('home' , { screen: 'librarytab'}); setModalVisible(false)}} className="w-1/2">
                                                                            <SmallButton text="Go to Library" textColor='white' color='light-green' />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    
                                                                </View>
                                                            </>
                                                        ) : (
                                                            <>
                                                            { action === 'Download' ? (
                                                                <View className="w-full mx-3">
                                                                    <View className="w-full my-4 justify-center items-center">
                                                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl">Download</Text>
                                                                        <Text className="text-nhs-black text-md text-center">{post.title} is still downloading... Please wait or hide the process</Text>
                                                                    </View>
                                                                    <View className="w-full justify-center items-center my-6">
                                                                        <View className="flex-row w-[85%] justify-between items-center">
                                                                            <Text className="text-lg font-bold">{progress} / {videoSize} MB</Text>
                                                                            <Text className="text-lg font-bold">{progress * 1/100}%</Text>
                                                                        </View>
                                                                        <Progress.Bar progress={progress} width={width * 80 / 100} />
                                                                    </View>
                                                                    <View className="w-full flex-row gap-2">
                                                                    {options.Download.map((option, i) => (
                                                                        <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className={`w-1/2 py-4 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
                                                                            <Text className="text-nhs-white font-bold tracking-wide text-lg">{option}</Text>
                                                                        </TouchableOpacity>))}
                                                                    </View>
                                                                </View>
                                                            ) : action === 'Pause' ? (      
                                                                <View className="w-full mx-3 justify-center items-center">
                                                                    <View className="w-full my-4 justify-center items-center">
                                                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Download</Text>
                                                                        <Text className="text-nhs-black text-md text-center">{post.title} is still downloading... Please wait or hide the process</Text>
                                                                    </View>
                                                                    <View className="h-5 w-[70%] border-t-[1px] border-nhs-pale-grey"/>
                                                                    <View className="w-full justify-center items-center my-6">
                                                                        <View className="flex-row w-[85%] justify-between items-center">
                                                                            <Text className="text-lg font-bold">{progress} / {videoSize} MB</Text>
                                                                            <Text className="text-lg font-bold">{progress * 1/100}%</Text>
                                                                        </View>
                                                                        <Progress.Bar progress={progress} width={width * 80 / 100} />
                                                                    </View>
                                                                    <View className="w-full flex-row gap-2">
                                                                    {options.Pause.map((option, i) => (
                                                                            <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className={`w-1/2 py-2 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
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
                                                                            <Text className="text-lg font-bold">{progress} / {videoSize} MB</Text>
                                                                            <Text className="text-lg font-bold">{progress * 1/100}%</Text>
                                                                        </View>
                                                                        <Progress.Bar progress={progress} width={width * 80 / 100} />
                                                                    </View>
                                                                    <View className="w-full gap-2 flex-row">
                                                                        {options.Resume.map((option, i) => (
                                                                            <TouchableOpacity onPress={() => handleDownload(option, post)} key={i} className={`w-1/2 py-2 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
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
                                                                        <TouchableOpacity onPress={() => handleDownload('Remove', post)} className="w-1/2">
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
                                                </ModalContent>
                                            </BottomModal>                                            
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