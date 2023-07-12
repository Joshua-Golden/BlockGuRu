import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import SectionHeader from '../SectionHeader'
import filter from 'lodash.filter';
import CategoryCard from './CategoryCard';

import { useNavigation } from '@react-navigation/native';
import { device } from '../../../../constants/theme';

// currently not in use
export default function CategoryList({ categoryData, postData, postCategoriesData }) {
  const navigation = useNavigation();
  const { categories, isCategoriesLoading, categoriesError, categoriesRefetch } = categoryData
  const { posts, isPostsLoading, postError, postsRefetch } = postData
  const { postCategories, isPostsCategoriesLoading, postCategoriesError, postCategoriesRefetch } = postCategoriesData
  const categoryPosts = new Array

  const filterCategories = (categories, posts) => {
    try {
      categories.map(category => {
        posts.map(post => {
          if (category.id === 12 && post.category_id === 12) {
            categoryPosts.push([category,post])
          }
        })      
      })
    } catch (error){
      console.log(error.message)
      // categoriesRefetch()
      // postCategoriesRefetch()

    } finally {
      
    }  
  }

  filterCategories(categories, postCategories)
  return (
  <>
    <SectionHeader title={categoryPosts[0][0].title} buttonTitle='View All' onPress={() => navigation.navigate('Category', { category: categoryPosts[0][0], postCategories: categoryPosts[0][1] })} isButton={true}/>
    <FlatList 
      data={categoryPosts}
      scrollEnabled={false}
      keyExtractor={(item) => item[0].id}
      contentContainerStyle={{
        marginVertical:15,
        marginHorizontal: 20,
      }}
      renderItem={({item, index}) => (
        <>
          <View className="my-3">
            <FlatList 
              data={device.osName === 'iPadOS' ? item[1] : item[1]}
              scrollEnabled={false}
              numColumns={device.osName === 'iPadOS' ? 3 : 2}
              keyExtractor={(data) => data.Post.id}
              style={{
                marginTop: 5,
              }}
              renderItem={({item}) => (
                <>
                  <CategoryCard data={item} index={index} />
                </>
              )}
            />      
          </View>
        </>
      )}
      List
    />            
  </>
  )
}