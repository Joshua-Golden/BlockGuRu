import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, StyleSheet, Pressable, Animated, FlatList, RefreshControl, Modal, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image } from 'expo-image'

import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';

// API
import getPostContentByID from '../../../actions/database/getPostContentByID';
import getAllCategories from '../../../actions/database/getAllCategories';
import savePausedVideo from '../../../actions/save/savePausedVideo';
import getPausedVideo from '../../../actions/save/getPausedVideo';
import saveVideos from '../../../actions/save/saveVideos';
import removeSavedVideoByTitle from '../../../actions/save/removeSavedVideoByTitle';
import getSavedPostByTitle from '../../../actions/save/getSavedPostByTitle';
import removeSavedVideos from '../../../actions/save/removeSavedVideos';

import useFetch from '../../../hooks/useFetch';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { colors, customStyle, width, shadow, device } from '../../../constants/theme';
import { SmallButton } from '../../components/shared/Button';

import {  BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomTabView from './Tabs/BottomTabView';
import CategoryItem from '../../components/shared/Categories/CategoryItem';

export default function SinglePost( {route, navigation} ) {
  const [ refresh, setRefresh ] = useState(false);
    const [ fetchPost, setFetchPost] = useState(false)

    // onRefresh function used by scrollview
    // toggles page loading states
    const onRefresh = useCallback(() => {
        setRefresh(true);
        setFetchPost(true)
    }, []);

    // API functions
    const { post } = route.params 
    const { data: postContent, isLoading: isPostContentLoading, error: postContentError, refetch: postContentRefetch } = useFetch(getPostContentByID, post.post_content_id)
    const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useFetch(getAllCategories, '*')
    
    // filter for postCategories
    // takes categories found from API call, and checks if it matches the current post's category id
    // if yes, store in variable to be used by flatlist displaying category items
    const postCategories = new Array
    const filterCategories = (categories, post) => {
        try {
          categories.map(category => {
            if (category.id === post.category_id) {
                postCategories.push(category)
            }    
          })
        } catch (error){
          console.log(error.message)
    
        } finally {
          
        }  
    }
    filterCategories(categories, post)

    // declares local states for saved psots
    const [ useLocalFile, setUseLocalFile ] = useState(false)
    const [ pausedDownload, setPausedDownload ] = useState('')
    
    // declares state for modal visibilty
    // sets object called options for different video download states
    const [ modalVisible, setModalVisible ] = useState(false)
    const options = {
        'Download': ['Pause', 'Cancel'],
        'Pause': ['Resume', 'Cancel'],
        'Resume': ['Pause', 'Cancel']
    }
    // Bottom Sheet Variables
    const snapPoints = useMemo(() => ['35%'], []);

    // ascynchronous function checking for locally saved posts
    // checks api function getPausedVideo to see if there are any paused states saved locally in the encrypted storage
    // uses title formatted as lower case string with no symbols and spaces as storage key
    // if the result returned is usable, construct the string back into an object
    // if the constructed object is usable, set local state pausedDownload to the contents of the object then set component download state to paused
    // then checks if the local encrypted storage has a version of the single post stored
    // uses title posts as the key
    // if the result returned is usable, set the component data state to true and change the setAction state to complete
    // if the result no values are returned or the result is not usable, set the component state to false and change setAction to Can download
    // actions are used to change the download button states and the bottom sheet modal content
    async function getSavedPost() {
        // previously paused download
        const title = post.title.replaceAll(' ', '').toLowerCase()
        const downloadSnapshot = await getPausedVideo(title);
        setPausedDownload(downloadSnapshot)
        console.log(action)
        // if( action !== 'Failed' && action !== 'Pause' && action !== 'Resume' && action !== 'Download' && action !== 'Downloading' ) {
        //     if (downloadSnapshot !== null && downloadSnapshot !== undefined && downloadSnapshot.length > 0 ) {
        //         const downloadSnapshotJSON = JSON.parse(downloadSnapshot);
        //         if (downloadSnapshotJSON !== null) {
        //             setPausedDownload(downloadSnapshotJSON)
        //             setAction('Pause')
        //         }
        //     }
        // }
        const result = await getSavedPostByTitle('posts', post.title)
        if (result.length > 0 && typeof result !== undefined && result !== null ) {
            console.log('here')
            setUseLocalFile(true)
            setAction('Complete')
        } else if( action !== 'Pause' && action !== 'Resume' && action !== 'Download' && action !== 'Downloading' ) {
            console.log('action', action)
            setUseLocalFile(false)
            setAction('Can download')
        }
    }
    // function runs everytime fetchpost state is changed
    // sets post variable to original values
    // calls get saved post to see if there an any values saved
    // refetches new content for post, categories
    // refilters categories
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
                setError(error.message)
                console.log(error.message)
            } finally {
                setFetchPost(false)
                setRefresh(false);
            }
        }
        getSavedPost()
        postContentRefetch()
        categoriesRefetch()
        filterCategories(categories, post)
    }, [fetchPost])

    // Video Download handler
    const [ action, setAction ] = useState('Can download')
    const [ error, setError ] = useState('');

    // create private id number for video download
    const video_id = Math.random().toString().slice(2,10);
    const videoDir = FileSystem.documentDirectory + 'videos/';
    const videoURL = post.video_path

    // checks if the video directory to be used is found on the device
    // if there is no directory, create one
    const ensureDirExists = async ( videoDir ) => {
        const dirInfo = await FileSystem.getInfoAsync(videoDir);
        if (!dirInfo.exists) {
          console.log("Video directory doesn't exist, creating...");
          await FileSystem.makeDirectoryAsync(videoDir, { intermediates: true });
        }
    };
    // callback to get downloadprogress as bytes
    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    };
    // creates an instance of downloadresumable to be used by componnent.
    // set the values for videourl to be downloaded, and the video file path to download to
    // no options required
    // passes the download progress callback
    
    const downloadResumable = useRef(FileSystem.createDownloadResumable(
        videoURL,
        videoDir + `${video_id}.mp4`,
        {},
        callback,
    ));
    // function that handles all download actions
    // takes in the action that is current and the params of the current post
    function handleDownload( action, post ) { 
        console.log(action)

        // saves post to local encrypted storage
        // takes in the downloaded video file path, the current post, postCategories, postContent, video_id and size of the downloaded video
        // saves to local storage with key 'posts'
        // checks if the value has been saved correctly
        // if the result returned is usable then set the action to complete and use the local file for video path
        // if any errors log the, to console and set action to failed
        const savePost = async (uri, post, postCategories, postContent, video_id, maxVideoSize) => {
            try {
                await saveVideos('posts', video_id, post, postCategories, postContent, uri, maxVideoSize )
                const result = await getSavedPostByTitle('posts', post.title)                
                if ( result.length > 0 && typeof result !== "undefined" && result !== null) {
                    post.video_path = result[0].uri
                    setUseLocalFile(true)
                }
                setAction('Complete')

            } catch (error) {
                setAction('Failed')
                setError(error)
                console.error('Video could not save')
                console.error(error.message);
            }
        }

        // removes the download passed through the function
        // call apis for getSavedPostByTitle passing in the download title and 'posts' as key
        // if the result is the download to be removed then remove any paused states found
        // then remove the post from the local encrypted storage
        // set action state to delete and change local file state back to false
        // checks again if the download has been removed
        const removeDownload = async ( params ) => {
            try {
                const currentVideo = await getSavedPostByTitle('posts', params.title)
                console.log(currentVideo)
                console.log('currentVideo')
                
                if (typeof currentVideo === 'object' && currentVideo.length !> 0) {
                    if ( currentVideo[0].post.video_path && currentVideo[0].post.video_path !== null && currentVideo[0].post.video_path !== undefined && currentVideo[0].post.video_path !== '' ) {
                        post.video_path = currentVideo[0].post.video_path
                        const title = params.title.replaceAll(' ', '').toLowerCase()
                        await SecureStore.deleteItemAsync(title)
                        
                        await removeSavedVideoByTitle('posts', params.title)

                        setAction('Deleted')
                        setUseLocalFile(false)
                    
                        // check if post has been deleted
                        const result = await SecureStore.getItemAsync(title)
                        if ( result !== null && result !== undefined && result !== '' && result.length > 0 ) {
                            if (JSON.parse(result).title === params.title) {
                                console.log('Delete unsuccessful')
                            }
                        } else {
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
                Alert.alert(
                    'Something went wrong', 
                    'An unknown remove error has occured',
                    [{
                        text:'Try again',
                        onPress:(() => removeDownload(params))
                    }]
                )
            } finally {
                setRefresh(false)
            }
        }

        // downloads the video passed through the argument
        // checks if there is a usable video path in the params
        // if the video path found is a local file then set the localfile state to true
        // else download the video and set the bottom sheet modal visibility to true
        // checks if for active video directory
        // downloads the video to the directory and store result into variable
        // if the result is usable then call savePost function and pass the parameters
        // setAction state to Cannot download
        const downloadVideo = async ( params ) => {
            async function download(params) {
                setAction('Downloading')
                setModalVisible(true)
                try{
                    await ensureDirExists( videoDir );
                    const result = await downloadResumable.current.downloadAsync();
                    if ( result !== null && result !== undefined) {
                        console.log("Download complete: ", params.id)
                        savePost(result.uri, params, postCategories, postContent, video_id, result.headers["Content-Length"])
                        setAction('Cannot download')
                    }
                } catch(error) {
                    setAction('Failed')
                    setError(error)
                    console.error(error.message)
                }
            }
            try {
                if ( params.video_path.startsWith('file://') && downloadResumable.current.fileUri.startsWith('file://')) {
                    setUseLocalFile(true)
                    setError('Local download found.')
                    console.log('Local download found.')
                } else if ( params.video_path === undefined || params.video_path === null || params === null ) {
                    if( route.params.post.video_path === undefined || route.params.post.video_path === null || route.params.post === null ) {
                        if (route.params.post.title === params.title) {
                            params.video_path = route.params.post.video_path
                            download(params)
                        } else {
                            console.log('Cannot find file path to download.')
                        }
                    } else {
                        download(params)
                    }
                } else {
                    download(params)
                }
            } catch (err) {
                console.log(err.message)
                Alert.alert(
                    'Something went wrong',
                    'There has been an unknown download error',
                    [{
                        text:'Try again',
                        onPress:(() => downloadVideo(params))
                    }]
                )
            }
        }

        // pauses download state
        // stores paused download state to local storage with the formatted title as key
        const pauseDownload = async ( params ) => {
            try {
                console.log(downloadResumable)
                const paused = await downloadResumable.current.pauseAsync();
                console.log('Paused result', paused)
                console.log("Download paused: ", params.id)
                const title = params.title.replaceAll(' ', '').toLowerCase()
                const savedPauseState = await savePausedVideo(title, downloadResumable.current.savable())
                console.log('Saved result', savedPauseState)
                setAction('Pause')
            } catch (error) {
                setError(error)
                console.log(error.message)
                onRefresh()
                console.error(error.message)
                console.log(action)
                setAction('Failed')
            }
        }
        // resumes download
        // takes the paused state and resumes it
        // when completed call savePost function
        const resumeDownload = async ( params ) => {
            try {
                setAction('Resume')
                getSavedPost()
                setAction('Downloading')
                downloadResumable.current.resumeData = pausedDownload
                console.log(downloadResumable)
                const result = await downloadResumable.current.resumeAsync();
                savePost(result.uri, params, postCategories, postContent, video_id, result.headers["Content-Length"])
            } catch (error) {
                setAction('Failed')
                setError(error)
                console.error(error.message)
            }
        }

        // cancel download
        const cancelDownload = async ( params ) => {
            try {
                await downloadResumable.current.pauseAsync();
                console.log("Canceling download: ", params.id)
                setAction('Cancelled')
            } catch (error) {
                setError(error)
                console.error(error.message)
            } finally {
                setAction('Cancelled')
            }
        }

        // checks if the current post data is usable
        // calls function based on respective action found
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
        const results = await removeSavedVideoByTitle('posts', 'text')
        console.log(results)
    }
    async function deleteSavedVideose() {
        const results = await removeSavedVideos('posts')
        console.log(results)
    }


    // creates local instance of bottomsheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // handles modal visibility
    const handlePresentModalPress = useCallback(() => {
        setModalVisible(true)
        bottomSheetModalRef.current?.present();
    }, []);
    const handleDismissModalPress = useCallback(() => {
        setModalVisible(false)
        bottomSheetModalRef.current?.dismiss();
    }, []);
    
    return (
        // renders different views based on loading states, usable data and modal visibilitys
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
                <View className="flex-1 mx-5 my-3">
                    <View className="pr-5">
                        <Text style={customStyle.h2}>{post.title}</Text>
                    </View>
                    <View className="flex-row mt-3">
                        <View className="w-full items-start">
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator
                                decelerationRate={'fast'}
                                data={postCategories}
                                keyExtractor={item => item.id}
                                renderItem={({item, index}) => {
                                    return (
                                    <>
                                        <CategoryItem data={item} index={index}/>
                                    </>
                                    )
                                }}
                            />
                        </View>
                    </View>
                    <View className="flex-row w-full items-center justify-center gap-2 px-2 mt-3">
                        <TouchableOpacity  onPress={() => navigation.navigate("VideoPlayer", { post: post })} className="w-1/3">
                            <SmallButton text="Play" textColor='white' color='light-green' icon='play-circle' />
                        </TouchableOpacity>
                        {( action !== 'Cannot download' && action === "Can download" && !useLocalFile ) || action === 'Deleted' ? (
                            <TouchableOpacity onPress={() => {modalVisible ? handleDismissModalPress() : handlePresentModalPress()}} className="w-2/3">
                                <SmallButton text="Download" textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon='download-outline' />
                            </TouchableOpacity>
                        ) : (
                            <View className="w-2/3">
                                <TouchableOpacity onPress={() => {modalVisible ? handleDismissModalPress() : handlePresentModalPress()}} className="w-full">
                                    <SmallButton text={ action === 'Pause' ? 'Paused' : action === 'Resume' || action === 'Downloading' ? 'Downloading' : action === 'Complete' ? 'Downloaded' : useLocalFile ? 'Downloaded' : 'error'} textColor='light-green' transparent={true} borderColor='light-green' color='light-green' icon={action === 'Complete' || useLocalFile && action ==='Download' ? 'md-checkbox-outline' : useLocalFile ? 'md-checkbox-outline' :'download-outline' } />
                                </TouchableOpacity>                                          
                            </View>                                        
                        )}                                    
                    </View>
                    {isPostContentLoading ? (
                    <View className="h-full justify-center items-center">
                        <ActivityIndicator size='large' color="black" />
                    </View>
                    ) : postContentError ? (
                        <>
                            <Text>Something went wrong</Text>
                        </>
                    ) : (
                        <>                            
                            <View className={`bg-nhs-white ${device.osName === 'iPadOS' ? 'px-5' : ''}`}>
                                <BottomTabView tabContent={postContent} />
                            </View>
                        </>
                    )}
                </View>
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
                                        <TouchableOpacity onPress={() => {navigation.navigate('Home' , { screen: 'Library Tab'}); }} className="w-1/2">
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
                                        <TouchableOpacity onPress={() => {navigation.navigate('Home' , { screen: 'Library Tab'})}} className="w-1/2">
                                            <SmallButton text="Go to Library" textColor='white' color='light-green' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : action === 'Downloading' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl">Downloading</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} is still downloading... Please wait or hide the process</Text>
                                    </View>
                                    <View className="w-full flex-row gap-2">
                                    {options.Resume.map((option, i) => (
                                        <TouchableOpacity onPress={() => {handleDownload(option, post)}} key={i} className={`w-1/2 px-4 py-2 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
                                            <Text className="text-nhs-white font-bold tracking-wide text-lg">{option}</Text>
                                        </TouchableOpacity>))}
                                    </View>
                                </View>
                            ) : action === 'Pause' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Paused</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} download has been paused. Resume the download or hide the process.</Text>
                                    </View>
                                    <View className="w-full gap-2 flex-row">
                                        {options.Pause.map((option, i) => (
                                            <TouchableOpacity onPress={() => {handleDownload(option, post)}} key={i} className={`w-1/2 px-4 py-2 rounded-full justify-center items-center ${option ==='Cancel' ? 'bg-nhs-red' : 'bg-nhs-light-green'}`}>
                                                <Text className="text-nhs-white font-bold tracking-wide text-lg">{option}</Text>
                                            </TouchableOpacity>))}
                                    </View>
                                    
                                </View>
                            ) : action === 'Resume' ? (
                                <View className="w-full mx-3">
                                    <View className="w-full my-4 justify-center items-center">
                                        <Text className="text-nhs-light-green font-bold tracking-wide text-2xl mb-1">Downloading</Text>
                                        <Text className="text-nhs-black text-md text-center">{post.title} is still downloading... Please wait or hide the process</Text>
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
                                        <TouchableOpacity onPress={() => {navigation.navigate('Home' , { screen: 'Library Tab'}); setModalVisible(false)}} className="w-1/2">
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