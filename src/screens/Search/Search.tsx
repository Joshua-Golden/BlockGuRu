import { View, Text, SafeAreaView, FlatList, ScrollView, Alert, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'expo-image';
import filter from 'lodash.filter'

import * as SecureStore from 'expo-secure-store';
import * as Network from 'expo-network';

// APIs
import getAllPosts from '../../../actions/database/getAllPosts';
import useFetch from '../../../hooks/useFetch';
import getAllCategories from '../../../actions/database/getAllCategories';

// Components 
import Header from '../../components/shared/Header';
import Input from '../../components/shared/Input'
import SearchCard from '../../components/shared/Search/SearchCard';
import LibraryCard from '../../components/shared/Library/LibraryCard';
import { device, width } from '../../../constants/theme';

//Images
import empty from '../../assets/empty.jpg';
import { SmallButton } from '../../components/shared/Button';
import getSavedVideos from '../../../actions/save/getSavedVideos';

export default function Search({ navigation }) {
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
        postsRefetch()
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

    if (isOffline) {
      savedPosts()
    }
  }, [])

  const { data: posts, isLoading: isPostsLoading, error: postError, refetch: postsRefetch } = useFetch(getAllPosts, '*')
  
  const [ post, setPost ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(posts, (post) => {
      return contains(post, formattedQuery)
    });
    setPost(filteredData);
  }

  const contains = ({ title }, query) => {
    if (title.toLowerCase().match(query)) {
      return true;
    }
    return false;
  }

  return (
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <ScrollView 
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        contentContainerStyle={{flex: 1}}
        className="h-full">
      <View className="px-5 items-center w-full h-full">
        <View className={`w-full h-[150px] ${device.osName === 'Android' ? `top-10` : ``}`}>
          <Input icon='search' placeholder='What do you want to watch?' autoCorrect={false} value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
        </View>
        <View className="flex-col h-full w-full justify-center items-start">
          { isLoading ? (
            <>
              <View className="w-full h-full flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#000000" />
              </View>
            </>
          ) : !searchQuery ? (
            <>
              { isOffline ? (
                <>
                  <View className="h-full w-full flex-1 items-center">
                    <Text className="text-2xl font-bold text-center tracking-tighter">Can't Connect to Block GuRU</Text>
                    <Text className="text-lg text-center tracking-tighter">Try refreshing or search for downloaded videos</Text>
                      <TouchableOpacity className="px-3 py-1 bg-nhs-mid-grey" onPress={() => checkNetworkConnection()}>
                        <SmallButton textColor='pale-grey' text='Try Again'  />
                      </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View className="w-full h-full">
                    <Text className="text-2xl font-bold text-black my-2 tracking-tighter">Find what to watch next.</Text>
                    <Text className="text-lg text-black tracking-tighter">Search for videos to learn more about your favourite blocks.</Text>
                  </View>
                </>
              )}              
            </>
          ) : (
            <>
              <View className="flex-row justify-center items-start left-0">
                <Header title={searchQuery && post.length === 0 ? '' : 'Results'} isIcon={false} />
              </View>
              <View className="w-full h-full  items-start left-0">
                { searchQuery && post.length === 0 ? (
                  <>
                    <View className="top-10 items-center">
                    <View className="">
                        <Image 
                          style={{
                              width:300,
                              height: 300
                          }}
                          source={empty}
                          contentFit='cover'
                        />
                      </View>
                      <View className="justify-center items-center">
                        <Text className="text-center text-xl text-nhs-light-green font-bold"> Not Found</Text>
                        <Text className="text-center"> Sorry, the keyword you entered could not be found. Try to check again or search with other keywords.</Text>
                      </View>

                    </View>
                  </>
                ) : (
                  <>
                    { isOffline ? (
                      <>
                        <FlatList
                          data={savedPostsData}
                          scrollEnabled={false}
                          keyExtractor={(item) => item.id}
                          renderItem={({item, index}) => (
                            <>
                              <LibraryCard handleDelete={() => navigation.navigate('Post', { 'post': item })} data={item} index={index} />  
                            </>
                          )}
                          List
                        />  
                      </>
                    ) : (
                      <>
                      <FlatList
                        data={post}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index}) => (
                          <>
                            <SearchCard data={item} index={index} />  
                          </>
                        )}
                        List
                      />  
                      </>
                    )}
                  </>
                )}                
              </View>
            </>
          )}
        </View>
      </View>
        
      </ScrollView>
    </SafeAreaView>
    
  )
}