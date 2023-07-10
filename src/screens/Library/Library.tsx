import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable, RefreshControl, StatusBar, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import getSavedVideos from '../../../actions/save/getSavedVideos';
import LibraryCard from '../../components/shared/Library/LibraryCard';
import deleteSavedVideoByID from '../../../actions/save/deleteSavedVideoByID';
import deleteSavedVideos from '../../../actions/save/deleteSavedVideos';

import * as Network from 'expo-network';
import * as SecureStore from 'expo-secure-store'
import { Image } from 'expo-image';

import empty from '../../assets/empty.jpg';
import { customStyle, device } from '../../../constants/theme';


export default function Library({ navigation }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isOffline, setIsOffline ] = useState(false);
  const [ savedPostsData, setSavedPostsData ] = useState([]);

  async function checkNetworkConnection() {
    try {
      setIsLoading(true)
      const isAirplaneMode = await Network.isAirplaneModeEnabledAsync()
      if (isAirplaneMode) {
        setIsOffline(true)
      } else {
        const network = await Network.getNetworkStateAsync();
        if ( network.isConnected === true && network.isInternetReachable === true ) {
          setIsOffline(false)
        } else {
          setIsOffline(true)
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }
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
        error.message,
        [{
          text: "Try Again",
          onPress: onRefresh
        }])
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function savedPosts() {
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

  useEffect(() => {
    checkNetworkConnection()
    checkTerms()
}, [])

  async function handleDelete(id, title) {
    try {
      await deleteSavedVideoByID('posts', id)
      const videoTitle = title.replaceAll(' ', '').toLowerCase()
      await SecureStore.deleteItemAsync(videoTitle)
    } catch (error) {
      console.log(error.message)
      Alert.alert(
        'Something went wrong',
        error.message,
        [{
          text: 'Try Again',
          onPress: () => handleDelete(id, title),
        }])

    } finally {
      onRefresh()      
    }
  }

  async function deleteSavedVideose() {
    const results = await deleteSavedVideos('posts')
    console.log(results)
  }

  return (
    <SafeAreaView className="w-full h-full px-5 bg-nhs-white">
      <StatusBar barStyle='dark-content' />

      <View className={`flex-row w-full justify-between items-center p-5 mr-3 ${device.osName === 'iOS' ? '': 'mt-10'}`}>
        <View className="flex-row justify-start items-center">
          <Text style={customStyle.h2}>Library</Text>
        </View>
      </View>
      <View className="h-full w-full">
        <ScrollView
          className="w-full h-full"
          contentContainerStyle={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        >
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
            <FlatList
              data={savedPostsData}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => (
                <>
                  <LibraryCard data={item} index={index} handleDelete={() => handleDelete(item.id, item.title)} />  
                </>
              )}
              List
            />  
          )}          
        </ScrollView>            
      </View>    
    </SafeAreaView>
  )
}