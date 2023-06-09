import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'


import { categories, coffeeItems } from '../constants';
import PostCard from '../components/posts/postCard';

import { NHSColors } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';


const Home = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(1);
  return (
    // Top Nav
    <View className="flex-1 bg-nhs-white">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Navigation */}
      <SafeAreaView className={"flex bg-nhs-white border-b-[1px] border-neutral-200"+ ios? "py-4" : "py-5"}>
        <View className="mx-7 flex-row justify-between items-center">
          <View className="p-4"/>
          <Image
            source={require('../assets/images/NHS-blue.jpg')} 
            style={{
              width:100,
              height:50,
              resizeMode: 'contain'
            }}
          />
          <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.navigate('settings')}>
            <Ionicons name='settings' color={NHSColors['nhs-blue']} size={30}/>
          </TouchableOpacity>
          

        </View>
      </SafeAreaView>

      {/* Categories  */}
      <View className="mx-3">
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
              onPress={()=> setActiveCategory(item.id)}
              style={{backgroundColor: isActive? NHSColors['nhs-light-green'] : NHSColors['nhs-light-blue']}} 
              className="p-4 px-5 mr-2 rounded-full shadow bg-nhs-white">
                <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
              </TouchableOpacity>
            )    
          }}
        />
      </View>

      {/* Post Cards */}
      <View className="flex-1 justify-center mt-3 mx-4">
        <FlatList
          showsVerticalScrollIndicator
          data={coffeeItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View className="mb-3 border-b-[1px] border-neutral-200">
                <PostCard  item={item} />
              </View>
            )
          }}
        />        
      </View>
        
    </View>
  )
}

export default Home;