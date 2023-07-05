import { View, Text, SafeAreaView, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../components/shared/Input'
import getAllPosts from '../../../actions/database/getAllPosts';

import filter from 'lodash.filter'
import Header from '../../components/shared/Header';
import SearchCard from '../../components/shared/Search/SearchCard';
import useFetch from '../../../hooks/useFetch';
import getAllCategories from '../../../actions/database/getAllCategories';
import { ios, width } from '../../../constants/theme';

export default function Search() {
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
      <ScrollView className="h-full">
      <View className="mx-5 items-center h-full">
        <View className={`w-full h-[150px] ${!ios ? `top-10` : ``}`}>
          <Input icon='search' placeholder='What do you want to watch?' autoCorrect={false} value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
        </View>
        <View className="flex-col h-full justify-center items-start left-0">
          <View className="flex-row justify-center items-start left-0">
            {searchQuery ? (
            <Header title="Results" isIcon={false} />

            ) : (
              <Header title="Top Searches" isIcon={false} />
            )}
          </View>
          <View className="w-full h-full justify-center items-start left-0">
            { searchQuery && post.length === 0 ? (
              <>
                <View className="justify-center items-center">
                  <View className="">

                  </View>
                  <View className="justify-center items-center">
                    <Text className="text-center text-xl text-nhs-light-green font-bold"> Not Found</Text>
                    <Text className="text-center"> Sorry, the keyword you entered could not be found. Try to check again or search with other keywords.</Text>
                  </View>

                </View>
              </>
            ) : (
              <FlatList
                data={post.length === 0 ? posts : post}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                  <>
                    <SearchCard data={item} index={index} />  
                  </>
                )}
                List
              />  
            )}
              
          </View>
        </View>
      </View>
        
      </ScrollView>
    </SafeAreaView>
    
  )
}