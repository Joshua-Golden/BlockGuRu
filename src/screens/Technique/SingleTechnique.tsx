import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, StatusBar, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { customStyle, device } from '../../../constants/theme';

import { Ionicons} from '@expo/vector-icons'
import CategoryCard from '../../components/shared/Categories/CategoryCard';
import getPostCategoryByID from '../../../actions/database/getPostCategoryByID';
import useFetch from '../../../hooks/useFetch';
import getAllPosts from '../../../actions/database/getAllPosts';
import PageHeader from '../../components/PageHeader';

export default function SingleTechnique({ route, navigation }) {
  // set variable state to value passed initially through component
  const [ technique, setTechnique ] = useState(route.params.technique)

  // uses useFetch hook to return api request for all posts
  // deconstructs result
  const { data: posts, isLoading: isPostsLoading, error: postsError, refetch: postsRefetch } = useFetch(getAllPosts, '*')
  
  const [ refresh, setRefresh ] = useState(false);
  const [ fetchTechnique, setFetchTechnique] = useState(false)
  // onRefresh function used by scrollview
  const onRefresh = useCallback(() => {
      setRefresh(true);
      setFetchTechnique(true)
  }, []);

  // functions calls every time fetchtechnique state has changed
  useEffect(() => {
    if (fetchTechnique === true) {
      try {
        setTechnique(route.params.technique)
      } catch (error) {
          console.log(error.message)
      } finally {
        setFetchTechnique(false)
          setRefresh(false);
      }
    }
    
  }, [fetchTechnique])

  // filters posts and techniques
  // if technique_id found in post matches current technique id then push to array
  const postTechniques = new Array
  const filterPosts= (technique, posts) => {
      try {
        posts.map(post => {
          if (technique.id === post.technique_id) {
            postTechniques.push(post)
          }    
        })
      } catch (error){
        console.log(error.message)

      } finally {
        
      }  
  }
  filterPosts(technique, posts)

  return (
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <StatusBar barStyle='dark-content' />
      <View className="w-fulll px-4">
        <PageHeader title={technique.title} isBackArrow />
      </View>
      <View className="h-full w-full flex-1">
        <ScrollView
          className="w-full h-full flex-1"
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
            <View>
              <FlatList 
                data={postTechniques}
                scrollEnabled={false}
                numColumns={ device.osName === 'iPadOS' ? 3 : 2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  marginHorizontal: 15,
                }}
                renderItem={({item, index}) => (
                  <>
                    <CategoryCard data={item} index={index} />
                  </>
                )}
              /> 
            </View>
          </ScrollView>
      </View>
    </SafeAreaView>
  )
}