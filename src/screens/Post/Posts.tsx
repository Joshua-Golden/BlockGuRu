import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, StatusBar, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { customStyle, device } from '../../../constants/theme';

import { Ionicons} from '@expo/vector-icons'
import PageHeader from '../../components/PageHeader';
import PostCard from '../../components/shared/Posts/PostCard';

// All Posts component used on home screen
export default function Posts({ route, navigation }) {
  const [ posts, setPosts ] = useState(route.params.posts)

  const [ refresh, setRefresh ] = useState(false);
  const [ fetchPosts, setFetchPosts] = useState(false)
  // onRefresh function used by scrollview
  // toggles loading states
  const onRefresh = useCallback(() => {
    setRefresh(true);
    setFetchPosts(true)
  }, []);

  // function renders everytime fetchposts state has changed
  //fetches original post data passed through componnent
  useEffect(() => {
  if (fetchPosts === true) {
    try {
      setPosts(route.params.posts)
    } catch (error) {
        console.log(error.message)
    } finally {
      setFetchPosts(false)
      setRefresh(false);
    }
  }
}, [fetchPosts])

  return (
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <StatusBar barStyle='dark-content' />
      <View>
        <PageHeader title='All Posts' isBackArrow />
      </View>
      <View className="h-full w-full flex-1">
        <ScrollView
          className="w-full h-full flex-1"
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
            { refresh ? (
              <>
                <View className="w-full h-full justify-center items-center">
                  <ActivityIndicator color={'black'} size={'large'} />
                </View>
              </>
            ) : (
              <>
              <FlatList
              initialNumToRender={device.osName === 'iPadOS' ? 6 : 4}
              numColumns={device.osName === 'iPadOS' ? 3 : 2}
              showsHorizontalScrollIndicator
              decelerationRate={'fast'}
              scrollEnabled={false}
              data={posts}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal:15
              }}
              renderItem={({item, index})=>{
                return (
                  <PostCard data={item} index={index}/>
                )    
              }}
              />
              </>
            )}
          </ScrollView>
      </View>
    </SafeAreaView>
  )
}