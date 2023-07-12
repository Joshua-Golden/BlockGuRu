import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable, RefreshControl, StatusBar, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

// APIs
import removeSavedPost from '../../../actions/save/removeSavedPost';
import getSavedVideos from '../../../actions/save/getSavedVideos';
import removeSavedVideoByID from '../../../actions/save/removeSavedVideoByID';
import removeSavedVideos from '../../../actions/save/removeSavedVideos';

// Modules
import * as Network from 'expo-network';
import * as SecureStore from 'expo-secure-store'
import { Image } from 'expo-image';

// Assets and Components
import empty from '../../assets/empty.jpg';
import LibraryCard from '../../components/shared/Library/LibraryCard';
import PageHeader from '../../components/PageHeader';


export default function Library({ navigation }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isOffline, setIsOffline ] = useState(false);
  const [ savedPostsData, setSavedPostsData ] = useState([]);

  // Check if device is connected to the internet
  // Changes [isOffline] state dependent on the result ( true / false )
  // While asynchronous function is running, isLoading state is toggled for page loading
  async function checkNetworkConnection() {
    try {
      setIsLoading(true)
      const network = await Network.getNetworkStateAsync();
      if ( network.isConnected === true && network.isInternetReachable === true ) {
        setIsOffline(false)
      } else {
        setIsOffline(true)
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Checks the encrypted storage system for the key 'termsAccepted'
  // If true, navigate user to Home page
  // If false, navigate user to Welcome page to Accept terms
  // While asynchronous function is running, isLoading state is toggled for page loading
  async function checkTerms() {
    try {
      setIsLoading(true)
      const termsAccepted = await SecureStore.getItemAsync('termsAccepted');
      if( termsAccepted === null || termsAccepted === undefined || termsAccepted.length <= 0 ) {
          await SecureStore.setItemAsync('termsAccepted', 'false');
          navigation.navigate('Welcome');    
      } else if ( termsAccepted === 'true' ) { 
          navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error)
      Alert.alert(
          'Something went wrong',
          error.message,
          [{
              text: 'Try Again',
              onPress: () => checkTerms(),
          }]
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Callback to refresh the page from the ScrollView
  // If the function is called it checks for a network connection
  // If there is an active connection, run the API to check for locally saved posts
  // If no connection, raise an Alert
  // While function is running, isLoading state is toggled for page loading
  const onRefresh = useCallback(() => {
    try {
      setIsLoading(true);
      checkNetworkConnection()
      if (isOffline === false) {
        savedPosts()
      }
    } catch(error) {
      console.log(error.message)
      Alert.alert(
        "Something went wrong",
        "An unknown network error has occured. ",
        [{
          text: "Try Again"
        }])
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Asynchronous function to check local storage for saved posts
  // The result that is returned gets put into a global variable for the component to use
  // While asynchronous function is running, isLoading state is toggled for page loading
  async function savedPosts() {
    console.log('check')
    try {
      setIsLoading(true)
      const results = await getSavedVideos('posts')
      setSavedPostsData(results)
    } catch (error) {
      console.log(error.message)
      Alert.alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  // Asynchronous function to remove the queried post from local storage
  // Uses post title as key
  // The key is saved as a lowercase string with no spaces and symbols
  // Runs an inline function to format the title correctly then saves  it to variable videoTitle
  // If there is an error raise an Alert.
  async function handleDelete(id, title) {
    console.log(id, title)
    try {
      await removeSavedVideoByID('posts', id)
      const videoTitle = title.replaceAll(' ', '').toLowerCase()
      await removeSavedPost(videoTitle)
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

  // Function to navigate to the Video Player when called
  // Takes in the parameter post that is needed for this route 
  function handlePlay( post ) {
    try {
      navigation.navigate( 'VideoPlayer', {post: post} )
    } catch (error) {
      console.log(error.message)
    }
  }

  // Function that runs on every time the page rerenders 
  // Runs the savedPosts function that checks for locally saved data
  // Checks network connection to see if there still is an active connection
  // Also checks the terms to see if they are not set.
  useEffect(() => {
    savedPosts()
    checkNetworkConnection()
    checkTerms()
  }, [])

  // Component render
  return (
    // SafeAreaView ensures that the content inside  of the block will only render inside the Devices viewable screen
    <SafeAreaView className="flex-1 h-full bg-nhs-white">
      <ScrollView 
        className="flex-1"
        // refresh control that calls the onRefresh function when the user has pulled down from the top of the scrollview
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
      <View className="px-5 items-center w-full h-full">
        {/* Page Header  */}
        <View className="w-full">
          <PageHeader title='My Library' isBackArrow={false}/>
        </View>
        <View className="h-full w-full">
          {/* Checks if there is any saved data in the array 
            if yes, render the saved data in a flat list
            if no, render no empty library */}
          { savedPostsData.length === 0 ? (
            <View className="h-full items-center">
              <View className="items-center">
                <Image 
                  style={{
                      width:300,
                      height: 300
                  }}
                  source={empty}
                  contentFit='cover'
                />
              </View>
              <Text className="text-center text-xl text-nhs-light-green font-bold">Your Library is Empty</Text>
              <Text className="text-center">Looks like you haven't downloaded any videos at all.</Text>
              <Text className="text-center">Maybe try pulling down to refresh.</Text>
            </View>
          ) : (
            <View className="w-full items-start">
              {/* Renders the component LibraryCard to list all current saved posts data */}
              <FlatList
                data={savedPostsData}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  marginVertical:15,
                }}
                renderItem={({item, index}) => (
                  <>
                    <LibraryCard
                      key={index}
                      data={item}
                      handleDelete={() => handleDelete(item.post.id, item.post.title)} 
                      handlePlay={() => handlePlay(item)} 
                    />  
                  </>
                )}
                List
              />
            </View>
          )}
          </View>      
        </View>      
      </ScrollView>
    </SafeAreaView>
  )
}