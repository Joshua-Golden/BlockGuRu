import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated';

import CustomHandler from './CustomHandler';
import CustomBackground from './CustomBackground';

import { sizes, spacing, ios, NHSColors } from '../../../constants/theme'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import getVideos from '../../../actions/getVideos';
import getAllCategories from '../../../actions/getAllCategories';
import getPostCategoryByID from '../../../actions/getPostCategoryByID';
import PostCard from '../../Posts/PostCard';

const BottomScreen = ({ }) => {
  const snapPointsIOS = useMemo(() => ['50%', '7%', '17%', '65%', '100%'], []);
  const snapPointsANR = useMemo(() => ['50%', '7%', '17%', '65%', '90%'], []);

  const [activeCategory, setActiveCategory] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
 
  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
    async function getVideo() {
      const posts = await getVideos();
      setPosts(posts);
    }
    getVideo()
  }, [])  

  const [ categories, setCategories ] = useState([]);
  useEffect(() => {
    async function getCategory() {
      const categories = await getAllCategories();
      setCategories(categories)
    }
    getCategory()
  }, [])

  const [ isFiltered, setIsFiltered ] = useState(false)
  const [ filteredPosts, setFilteredPosts ] = useState([]);

  const handleFilters = (query) => {
    console.log("Query " + query)
    async function getCategory(query) {
      const postCategories = await getPostCategoryByID(query);
      setFilteredPosts(postCategories)
    }
    if ( activeCategory !== query && isFiltered){
      setIsLoading(true)
      getCategory(query)
    } else if ( activeCategory !== query && !isFiltered ) {
      setIsLoading(true)
      getCategory(query)
      setIsFiltered((current) => !current);
    } else if ( activeCategory === query && isFiltered) {
      setIsFiltered((current) => !current);
      setFilteredPosts(posts)
    } else if( activeCategory === query && !isFiltered){
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts)
    }  
  }

  return (
    <BottomSheet
      index={0}
      animatedIndex={useSharedValue(0)}
      snapPoints={ios ? snapPointsIOS : snapPointsANR}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandler}>
      <View className="bg-nhs-black rounded-full p-[1.5px] my-8 mx-[35%]" />  
      <View className="mb-6">
        <FlatList
        horizontal
        scrollToItem
        showsHorizontalScrollIndicator
        snapToAlignment="center"
        decelerationRate={'fast'}
        snapToInterval={3}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item})=>{
          function activeToggle(id){
            handleFilters(id)
            if (id === activeCategory) {
              setActiveCategory(null)
            } else {
              setActiveCategory(id)
            }
          }
          let activeTextClass = item.id == activeCategory ? 'text-white': 'text-gray-700';
          return (
            <TouchableOpacity 
              key={item}
              onPress={()=> activeToggle(item.id)}
              style={{backgroundColor: item.id == activeCategory ? NHSColors['nhs-light-green'] : NHSColors['nhs-light-blue']}} 
              className="p-3 px-5 mr-2 flex-1 justify-center items-center rounded-full shadow bg-nhs-white">
              <Text className={"font-semibold text-sm " + activeTextClass}>{item.title}</Text>
            </TouchableOpacity>
          )    
        }}
        />
    </View>
    <View className="h-[80%] justify-center mt-3 mx-4">
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <BottomSheetFlatList
          scrollEnabled  
          vertical
          showsVerticalScrollIndicator
          data={filteredPosts.length === 0 ? posts : filteredPosts}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            if (Object.hasOwn(item, 'Post')) {
              return (
                <View key={item.id} className="mb-3 border-b-[1px] border-neutral-200">
                  <PostCard key={item.Post.id} item={item.Post} />
                </View>
              )
            } else {
                return (
                  <View key={item} className="mb-3 border-b-[1px] border-neutral-200">
                    <PostCard key={item.id} item={item} />
                  </View>
                )
            }          
          }}
          />              
        </Suspense>  
    </View>      
      
    </BottomSheet>
  )
}

export default BottomScreen;