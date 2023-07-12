import { View, Text, ActivityIndicator, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { Image } from 'expo-image';

import * as SecureStore from 'expo-secure-store';
import * as ScreenOrientation from 'expo-screen-orientation'
import * as Network from 'expo-network';

// API
import getAllPosts from '../../../actions/database/getAllPosts';
import getAllRegions from '../../../actions/database/getAllRegions';
import getAllTechniques from '../../../actions/database/getAllTechniques';

// Components
import HeroPost from '../../components/shared/Posts/HeroPost';
import AllPosts from '../../components/shared/Posts/AllPosts';
import Techniques from '../../components/shared/Techniques/Techniques';

// Images
import UHB_Logo from '../../assets/logos/UHB/uhb2-trans-white.png';

// Icons
import { Ionicons } from '@expo/vector-icons';
import BlockRegions from '../../components/shared/Regions/BlockRegions';
import { SmallButton } from '../../components/shared/Button';
import { RefreshControl } from 'react-native';
import removeSavedVideos from '../../../actions/save/removeSavedVideos';

export default function Home({ navigation }) {
  // declares local states for component to use
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isOffline, setIsOffline ] = useState(false);

  // asynchronous function that checks for device current network connection
  // if true, set offline state to false
  // if false, set offline state to true
  // if caught error, render alert box
  // toggles page loading state
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
      Alert.alert(
        "Something went wrong",
        "Theres been an unknown network error",
        [{
          text:'Try again',
          onPress:(() => checkNetworkConnection())
        }]
        )
    } finally {
      setIsLoading(false)
    }
  }
  // async function to check if app terms have been accepted
  // searches local encrypted storage for the key 'termsAccepted' and pulls the value
  // if value is true, do nothing
  // if value is false, navigate to welcome screen
// toggles page loading state
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
    } finally {
      setIsLoading(false)
    }
  }
  // onRefresh function used by ScrollView
  // checks for internet connection
  // if yes, fetch apis
  // if no, do nothing
  // catch errors and display alert box for network error
  // toggles page loading states
  const onRefresh = useCallback(() => {
    try {
      setIsLoading(true);
      checkNetworkConnection()
      if (isOffline === false) {
        postsRefetch()
        regionsRefetch()
      }
    } catch(error) {
      console.log(error.message)
      Alert.alert(
        "Something went wrong",
        "There has been an unknown network error",
        [{
          text: "Try Again",
          onPress: onRefresh
        }])
    } finally {
      setIsLoading(false);
    }
  }, []);

  // function that runs every screen render
  // checks network connection
  // checks terms
  useEffect(() => {
    checkNetworkConnection()
    checkTerms()
  }, [])

  // uses useFetch hook to pass APIs to make requests and return responses
  // deconstructs reponses into local variables
  const { data: posts, isLoading: isPostsLoading, error: postError, refetch: postsRefetch } = useFetch(getAllPosts, '*')
  const { data: regions, isLoading: isRegionsLoading, error: regionsError, refetch: regionsRefetch } = useFetch(getAllRegions, '*')
  const { data: techniques, isLoading: isTechniquesLoading, error: techniquesError, refetch: techniquesRefetch } = useFetch(getAllTechniques , '*')

  return (
    // renders different views based on loading states, network states, and if the deconstructed variables declared above are usable or not
    <>
      { isLoading ? (
        <>
          <View className="w-full h-full flex-1 justify-center items-center">
            {/* Status Bar */}
            <StatusBar translucent backgroundColor="transparent" />
              <View className={`absolute top-0 z-20 justify-center items-center w-full`}>
                <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                  <View className="w-[180] h-[45]">
                    <Image
                      source={UHB_Logo}
                      style={{
                        width:'100%',
                        height:'100%',
                        }}
                      contentFit='cover'
                    />
                  </View>
                  <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.navigate('Information')}>
                    <Ionicons name='ios-ellipsis-horizontal-circle' color='white' size={25}/>
                  </TouchableOpacity>
                </View>          
              </View>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        </>
      ) : isOffline ? (
        <>
          <View className="h-full w-full flex-1 justify-center items-center">
            {/* Status Bar */}
            <StatusBar translucent backgroundColor="transparent" />
            <View className={`absolute z-20 top-0 justify-center items-center w-full`}>
              <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                <View className="w-[180] h-[45]">
                  <Image
                    source={UHB_Logo}
                    style={{
                      width:'100%',
                      height:'100%',
                      }}
                    contentFit='cover'
                  />
                </View>
                <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.navigate('Information')}>
                  <Ionicons name='ios-ellipsis-horizontal-circle' color='white' size={25}/>
                </TouchableOpacity>
              </View>          
            </View>
            <Text>Can't Connect to Block GuRU</Text>
            <TouchableOpacity onPress={() => checkNetworkConnection()}>
              <SmallButton textColor='black' text='Try Again'  />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View className="flex-1 h-full pb-5 bg-white">
            <ScrollView className="flex-1 min-h-[300]"
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
            >
              {/* Status Bar */}
              <StatusBar translucent backgroundColor="transparent" />
              <View className={`absolute z-20 justify-center items-center w-full`}>
                <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                  <View className="w-[180] h-[45]">
                    <Image
                      source={UHB_Logo}
                      style={{
                        width:'100%',
                        height:'100%',
                        }}
                      contentFit='cover'
                    />
                  </View>
                  <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.navigate('Information')}>
                    <Ionicons name='ios-ellipsis-horizontal-circle' color='white' size={25}/>
                  </TouchableOpacity>
                </View>          
              </View>

              <View className="flex-1">
                <View className="w-full h-[450px] justify-center items-center">
                  {isPostsLoading ? (                  
                    <View className="h-full justify-center items-center">
                      <ActivityIndicator size='large' color="black" />
                    </View>
                    ) : postError ? (
                      <Text>Something went wrong</Text>
                    ) : typeof posts !== undefined && posts !== null && posts.length !== null && posts.length > 0 ? (
                      <>
                        <HeroPost postData={{ posts, isPostsLoading, postError, postsRefetch }} />
                      </>
                    ) : (
                      <>
                        <Text>No data available</Text>
                      </>
                    )}
                </View>
              </View>

              <View className="flex-1">
                <View className="">
                  {isRegionsLoading ? (             
                      <View className="h-full justify-center items-center">
                        <ActivityIndicator size='large' color="black" />
                      </View>
                    ) : regionsError ? (
                      <Text>Something went wrong</Text>
                    ) : typeof regions !== undefined && regions !== null && regions.length !== null && regions.length > 0 ? (
                      <>
                        <View className="w-full items-starts my-2">
                          <BlockRegions regionData={{ regions, isRegionsLoading, regionsError, regionsRefetch }} />
                        </View>
                      </>
                    ) : (
                      <>
                        <Text>No data available</Text>
                      </>
                    )}
                </View>          
                <View className="">
                  {isTechniquesLoading ? (             
                      <View className="h-full justify-center items-center">
                        <ActivityIndicator size='large' color="black" />
                      </View>
                    ) : techniquesError ? (
                      <Text>Something went wrong</Text>
                    ) : typeof techniques !== undefined && techniques !== null && techniques.length !== null && techniques.length > 0 ? (
                      <>
                        <View className="w-full items-starts my-2">
                          <Techniques techniqueData={{ techniques, isTechniquesLoading, techniquesError, techniquesRefetch }} />
                        </View>
                      </>
                    ) : (
                      <>
                        <Text>No data available</Text>
                      </>
                    )}
                </View>          
              </View>

              <View className="flex-1">
                <View className="">
                  {isPostsLoading ? (             
                      <View className="h-full justify-center items-center">
                        <ActivityIndicator size='large' color="black" />
                      </View>
                    ) : postError ? (
                      <Text>Something went wrong</Text>
                    ) : typeof posts !== undefined && posts !== null && posts.length !== null && posts.length > 0 ? (
                      <>
                        <View className="w-full items-starts my-2">
                          <AllPosts postData={{ posts, isPostsLoading, postError, postsRefetch }} />
                        </View>
                      </>
                    ) : (
                      <>
                        <Text>No data available</Text>
                      </>
                    )}
                </View>         
              </View>         
            </ScrollView>
          </View>
        </>
      )}
    </>
  )
}
