import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

export default function CategoryScroll({ categoryData }) {
  const { postCategories, postCategoriesError, isPostCategoriesLoading, postCategoriesRefetch } = categoryData
  return (
    <View className="w-full items-start">
        <FlatList
        horizontal
        showsHorizontalScrollIndicator
        decelerationRate={'fast'}
        data={postCategories}
        keyExtractor={item => item.Category.id}
        renderItem={({item, index})=>{
            return (
            <>
                <View className="mr-3">
                    <CategoryItem data={item.Category} index={index}/>
                </View>
            </>
            )
        }}
        />
  </View>
  )
}