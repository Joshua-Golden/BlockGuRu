import { View, Text, ActivityIndicator, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { Image } from 'expo-image';

import * as SecureStore from 'expo-secure-store';
import * as Network from 'expo-network';

// API
import getAllPosts from '../../../actions/database/getAllPosts';
import getAllCategories from '../../../actions/database/getAllCategories';
import getPostCategoryByID from '../../../actions/database/getPostCategoryByID';

// Components
import HeroPost from '../../components/shared/Posts/HeroPost';
import CategoryList from '../../components/shared/Categories/CategoryList';
import NewReleases from '../../components/shared/Posts/NewReleases';
import FeaturedPosts from '../../components/shared/Posts/FeaturedPosts';
import SectionHeader from '../../components/shared/SectionHeader';

// Images
import NHS_Logo_Blue from '../../assets/logos/NHS/NHS-blue-white.jpg';

// Icons
import { Ionicons } from '@expo/vector-icons';
import BlockRegions from '../../components/shared/Categories/BlockRegions';
import getAllRegions from '../../../actions/database/getAllRegions';
import { SmallButton } from '../../components/shared/Button';
import { RefreshControl } from 'react-native';

export default function Home({ navigation }) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isOffline, setIsOffline ] = useState(false);

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
        postsRefetch()
        postCategoriesRefetch()
        categoriesRefetch()
        regionsRefetch()
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
  useEffect(() => {    
    checkNetworkConnection()
    checkTerms()
  }, [])

  const { data: posts, isLoading: isPostsLoading, error: postError, refetch: postsRefetch } = useFetch(getAllPosts, '*')
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useFetch(getAllCategories, '*')
  const { data: regions, isLoading: isRegionsLoading, error: regionsError, refetch: regionsRefetch } = useFetch(getAllRegions, '*')
  const params = [ 2, 12, 23]
  const { data: postCategories, isLoading: isPostCategoriesLoading, error: postCategoriesError, refetch: postCategoriesRefetch } = useFetch(getPostCategoryByID, params)

  return (
    <>
      { isLoading ? (
        <>
          <View className="w-full h-full flex-1 justify-center items-center">
            {/* Status Bar */}
            <StatusBar translucent backgroundColor="transparent" />
              <View className={`absolute top-0 z-20 justify-center items-center w-full`}>
                <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                  <View className="w-[80] h-full">
                    <Image
                      source={NHS_Logo_Blue}
                      style={{
                        width:'100%',
                        height:'100%',
                        }}
                      contentFit='cover'
                    />
                  </View>
                  <TouchableOpacity className="flex-row justify-center items-center" onPress={() => {}}>
                    <Ionicons name='settings' color='white' size={25}/>
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
                <View className="w-[80] h-full">
                  <Image
                    source={NHS_Logo_Blue}
                    style={{
                      width:'100%',
                      height:'100%',
                      }}
                    contentFit='cover'
                  />
                </View>
                <TouchableOpacity className="flex-row justify-center items-center" onPress={() => {}}>
                  <Ionicons name='settings' color='white' size={25}/>
                </TouchableOpacity>
              </View>          
            </View>
            <Text>Can't Connect to Block GuRU</Text>
            <TouchableOpacity onPress={() => checkNetworkConnection()}>
              <SmallButton text='Try Again'  />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View className="flex-1 h-full pb-5">
            <ScrollView className="flex-1 min-h-[300]"
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
            >
              {/* Status Bar */}
              <StatusBar translucent backgroundColor="transparent" />
              <View className={`absolute z-20 justify-center items-center w-full`}>
                <View className={`flex-row justify-between items-center top-[60] w-[90%] h-full`}>
                  <View className="w-[80] h-full">
                    <Image
                      source={NHS_Logo_Blue}
                      style={{
                        width:'100%',
                        height:'100%',
                        }}
                      contentFit='cover'
                    />
                  </View>
                  <TouchableOpacity className="flex-row justify-center items-center" onPress={() => {}}>
                    <Ionicons name='settings' color='white' size={25}/>
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
                  {isPostsLoading ? (             
                      <View className="h-full justify-center items-center">
                        <ActivityIndicator size='large' color="black" />
                      </View>
                    ) : postError ? (
                      <Text>Something went wrong</Text>
                    ) : typeof posts !== undefined && posts !== null && posts.length !== null && posts.length > 0 ? (
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
              </View>

              <View className="">
                {isCategoriesLoading && isPostCategoriesLoading  || isCategoriesLoading || isPostCategoriesLoading ? (             
                    <View className="h-full justify-center items-center">
                      <ActivityIndicator size='large' color="black" />
                    </View>
                  ) : categoriesError && postCategoriesError ? (
                    <Text>Something went wrong</Text>
                  ) : typeof categories !== undefined && categories !== null && categories.length !== null && categories.length > 0 ? (
                    <>
                      <CategoryList categoryData={{ categories, isCategoriesLoading, categoriesError, categoriesRefetch }} postData={{ postCategories, isPostCategoriesLoading, postCategoriesError, postCategoriesRefetch }}/>
                    </>
                  ) : (
                  <>
                    <Text>No data available</Text>
                  </>
                )}
              </View>          
            </ScrollView>
          </View>
        </>
      )}
    </>
  )
}
