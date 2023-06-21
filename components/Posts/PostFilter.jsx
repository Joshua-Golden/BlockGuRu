import { View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import PostCategories from './PostCategories'
import PostList from './PostList'

import { NHSColors, ios } from '../../constants/theme';

import filter from 'lodash.filter'

const PostFilter = ({ posts, categories }) => {
    const [activeCategory, setActiveCategory] = useState(1);
    const [ searchFilter, setFilterQuery ] = useState('')
    const [ fullData, setFullData ] = useState([])
    
    const handleFilters = (query) => {
        console.log(query)
        setFilterQuery(query)
        setActiveCategory(query)
        const filteredData = filter(fullData, (posts) => {
        return contains(posts, query)
        })
        setPosts(filteredData)
    }

    const contains = ({ category }, query) => {
        if (category.includes(query)) {
        return true
        };
        
        return false;
    }


return (
    <>
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
            isActive = item.id==activeCategory;
            let activeTextClass = isActive? 'text-white': 'text-gray-700';
            return (
                <TouchableOpacity 
                    onPress={()=> handleFilters(item.id)}
                    style={{backgroundColor: isActive? NHSColors['nhs-light-green'] : NHSColors['nhs-light-blue']}} 
                    className="p-3 px-5 mr-2 flex-1 justify-center items-center rounded-full shadow bg-nhs-white">
                    <Text className={"font-semibold text-sm " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
            )    
        }}
        />
    </View>
    <View className="h-[80%] justify-center mt-3 mx-4">
    <BottomSheetFlatList
        scrollEnabled  
        vertical
        showsVerticalScrollIndicator
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
            return (
            <View className="mb-3 border-b-[1px] border-neutral-200">
                <PostList data={item} />
            </View>
            )
        }}
        />        
    </View>
    </>
)
}

export default PostFilter