import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform } from 'react-native';
import { NHSColors } from '../../constants/theme';

const PostCategories = ({ data }) => {
  const categories = data
  const [activeCategory, setActiveCategory] = useState(1);

  return (
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
          className="p-3 px-5 mr-2 flex-1 justify-center items-center rounded-full shadow bg-nhs-white">
            <Text className={"font-semibold text-sm " + activeTextClass}>{item.title}</Text>
          </TouchableOpacity>
        )    
      }}
    />

  )
}

export default PostCategories;