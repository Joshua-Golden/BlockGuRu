import { View, Text, ActivityIndicator, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { Image } from 'expo-image';

// API
import getAllPosts from '../../../actions/getAllPosts';
import getAllCategories from '../../../actions/getAllCategories';
import getPostCategoryByID from '../../../actions/getPostCategoryByID';

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

export default function Home({ navigation }) {

  const { data: posts, isLoading: isPostsLoading, error: postError, refetch: postsRefetch } = useFetch(getAllPosts, '*')
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useFetch(getAllCategories, '*')
  const params = [ 2, 12, 23]
  const { data: postCategories, isLoading: isPostCategoriesLoading, error: postCategoriesError, refetch: postCategoriesRefetch } = useFetch(getPostCategoryByID, params)

  return (
    <>
    <View className="flex-1 h-full pb-5">
      <ScrollView className="flex-1">
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
              ) : typeof posts !== "undefined" && posts !== null && posts.length !== null && posts.length > 0 ? (
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
              ) : typeof posts !== "undefined" && posts !== null && posts.length !== null && posts.length > 0 ? (
                <>
                  <SectionHeader title='Featured Posts' buttonTitle='View All' onPress={() => {}} isButton={true}/>
                  <FeaturedPosts postData={{ posts, isPostsLoading, postError, postsRefetch }} />
                </>
              ) : (
                <>
                  <Text>No data available</Text>
                </>
              )}
          </View>

          <View className="flex-1">
            {isPostsLoading ? (             
                <View className="h-full justify-center items-center">
                  <ActivityIndicator size='large' color="black" />
                </View>
              ) : postError ? (
                <Text>Something went wrong</Text>
              ) : typeof posts !== "undefined" && posts !== null && posts.length !== null && posts.length > 0 ? (
                <>
                  <SectionHeader title='Newest Releases' buttonTitle='View All' onPress={() => {}} isButton={true}/>
                  <NewReleases postData={{ posts, isPostsLoading, postError, postsRefetch }} />
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
            ) : typeof categories !== 'undefined' && categories !== null && categories.length !== null && categories.length > 0 ? (
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
  )
}
