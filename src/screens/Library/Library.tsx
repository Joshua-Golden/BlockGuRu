import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import getSavedVideos from '../../../actions/save/getSavedVideos';
import LibraryCard from '../../components/shared/Library/LibraryCard';
import deleteSavedVideoByID from '../../../actions/save/deleteSavedVideoByID';
import deleteSavedVideos from '../../../actions/save/deleteSavedVideos';

import SecureStore from 'expo-secure-store'
import { Image } from 'expo-image';
import empty from '../../assets/empty.jpg';
import { customStyle, ios } from '../../../constants/theme';


export default function Library() {
  const [ refresh, setRefresh ] = useState(false);
  const onRefresh = React.useCallback(() => {
      setRefresh(true);
      setFetchVideos(true)
      setRefresh(false);

    }, []);

  const [ videos, setVideos ] = useState([])
  const [ fetchVideos, setFetchVideos ] = useState(false)
  const [ error, setError ] = useState('')

  useEffect(() => {
    async function getVideos() {
      try {
        const results = await getSavedVideos('posts')
        setVideos(results)
      } catch (error) {
        console.log(error.message)
        setError(error.message)
      } finally {
        setFetchVideos(false)
      }
    }
    getVideos()
    if (fetchVideos === true) {
      getVideos()
    }

}, [fetchVideos])

  async function handleDelete(id, title) {
    try {
      await deleteSavedVideoByID('posts', id)
      const videoTitle = title.replaceAll(' ', '').toLowerCase()
      await SecureStore.deleteItemAsync(videoTitle)
    } catch (error) {
      console.log(error.message)
      setError(error.message)

    } finally {
      onRefresh()      
    }
  }

  async function deleteSavedVideose() {
    const results = await deleteSavedVideos('posts')
    console.log(results)
  }


  console.log(videos)

  return (
    <SafeAreaView className="w-full h-full px-5 bg-nhs-white">
      <View className={`flex-row w-full justify-between items-center p-5 mr-3 ${ios ? '': 'mt-10'}`}>
        <View className="flex-row justify-start items-center">
          <Text style={customStyle.h2}>Library</Text>
        </View>
      </View>
        <View className="h-full w-full">
          <ScrollView
            className="h-full"
            contentContainerStyle={{ flex: 1 }}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
          >
            <View>

            </View>
          { videos.length === 0 ? (
            <View className="h-full justify-center items-center">
              <View className="justify-center  items-center">
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
              <Text className="text-center">Looks like you haven't donwloaded any videos at all.</Text>
              <Text className="text-center">Maybe try refreshing. Pull down to refresh</Text>
            </View>
          ) : (
            <FlatList
              data={videos}
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