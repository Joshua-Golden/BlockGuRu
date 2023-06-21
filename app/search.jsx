import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors, ios } from '../constants/theme';

import filter from 'lodash.filter'

// Icons
import { Ionicons,MaterialIcons } from '@expo/vector-icons';

import getVideos from '../actions/getVideos';
import PostCard from '../components/Posts/PostCard';

const Search = ({ title, route }) => {
  const containerStyle = "my-2 flex-row justify-center items-center rounded-md px-3 bg-nhs-pale-grey"
  const textInputStyle = "text-lg flex-1 py-2 mb-1 pl-2 text-nhs-dark-grey"

  const [ isLoading, setIsLoading ] = useState(false);
  const [ fullData, setFullData ] = useState([])

  const [ posts, setPosts ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('')
  useEffect(() => {
    setIsLoading(true)
    async function getVideo() {
      const posts = await getVideos();
      setFullData(posts)
      setPosts(posts);
    }
    setIsLoading(false)
    getVideo()
  }, [])  
  
  const handleSearch = (query) => {
    console.log(query)
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    console.log(fullData)
    const filteredData = filter(fullData, (post) => {
      return contains(post, formattedQuery)
    });
    setPosts(filteredData);
  }

  const contains = ({ title }, query) => {
    if (title.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }
  
  if ( isLoading ) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={'medium'} color={"#000"} />
      </View>
    )
  }
  return ( 
    <View className="flex-1">
    {/* Status Bar */}
    <StatusBar />
    {/* Navigation */}
    <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-10" : "py-4"}`}>
        <View className="flex-col mx-5">
            <Text className="font-bold text-2xl text-nhs-black">Search</Text>
            <TouchableWithoutFeedback>
            <View className={`${containerStyle}`}>
              <View className="justify-center items-center" pointerEvents="none">
                <Ionicons name="search" size={25}/>
              </View>
              <TextInput
                className={`${textInputStyle}`}
                clearButtonMode='always'
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={`What do you want to watch?`}
                value={searchQuery}
                onChangeText={(query) => {
                  handleSearch(query)
                }}
              />
            </View>
            </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>

    <View className="bg-nhs-white px-5">
      <View className="bg-nhs-white mb-2">
        <Text className="font-bold text-lg text-nhs-black">Results</Text>
      </View>
      <View className="h-full w-full justify-center mt-2 bg-nhs-white">
        <FlatList 
          data={posts}
          keyExtractor={(item) => item.title}
          renderItem={({item}) => (
            <PostCard item={item} />
          )}
        />
      </View>
    </View>

</View>

)
};

export default Search;