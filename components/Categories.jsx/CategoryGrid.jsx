import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform } from 'react-native';
import { NHSColors } from '../../constants/theme';

const CategoryGrid = ({ data }) => {
  const categories = data
  const [activeCategory, setActiveCategory] = useState(1);

  return (
        <FlatList
          scrollToItem
          numColumns={2}
          vertical
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item})=>{
            isActive = item.id==activeCategory;
            let activeTextClass = isActive? 'text-white': 'text-gray-700';
            return (
              <TouchableOpacity 
              onPress={()=> setActiveCategory(item.id)}
              style={{backgroundColor: isActive? NHSColors['nhs-light-green'] : NHSColors['nhs-light-blue']}} 
              className="flex-1 m-1 h-40 justify-center items-center rounded-md shadow bg-nhs-white">
                <Text className={"font-semibold text-xl  " + activeTextClass}>{item.title}</Text>
              </TouchableOpacity>
            )    
          }}
        />

  )
}

export default CategoryGrid;