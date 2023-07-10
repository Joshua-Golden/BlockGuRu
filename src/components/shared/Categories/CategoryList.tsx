import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import SectionHeader from '../SectionHeader'
import filter from 'lodash.filter';
import CategoryCard from './CategoryCard';

import { useNavigation } from '@react-navigation/native';

export default function CategoryList({ categoryData, postData }) {
  const navigation = useNavigation();
  const { categories, isCategoriesLoading, categoriesError, categoriesRefetch } = categoryData
  const { postCategories, isPostsLoading, postError, postCategoriesRefetch } = postData

  const categoryPosts = new Array

  const filterCategories = (categories, posts) => {
    try {
      categories.map(category => {
        posts.map(post => {
          if (category.id === post[0].category_id) {
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
    <FlatList 
      data={categoryPosts}
      scrollEnabled={false}
      keyExtractor={(item) => item[0].id}
      renderItem={({item, index}) => (
        <>
          <SectionHeader title={item[0].title} buttonTitle='View All' onPress={() => navigation.navigate('Category', { category: item[0], postCategories: categoryPosts[index][1] })} isButton={true}/>
          <>
            <FlatList 
              data={item[1].slice(0,4)}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={(item) => item.Post.id}
              renderItem={({item}) => (
                <>
                  <CategoryCard data={item} index={index} />
                </>
              )}
            />            
          </>
        </>
      )}
      List
    />            
  </>
  )
}