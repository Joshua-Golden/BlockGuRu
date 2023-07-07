import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, StatusBar, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { customStyle, device } from '../../../constants/theme';

import { Ionicons} from '@expo/vector-icons'
import CategoryCard from '../../components/shared/Categories/CategoryCard';
import getPostCategoryByID from '../../../actions/database/getPostCategoryByID';
import useFetch from '../../../hooks/useFetch';

export default function SingleCategory({ route, navigation }) {

  const { category } = route.params
  const { data: postCategories, isLoading: isPostCategoriesLoading, error: postCategoriesError, refetch: postCategoriesRefetch } = useFetch(getPostCategoryByID, category.id)

  const [ error, setError ] = useState(false);

  const [ refresh, setRefresh ] = useState(false);
  const [ fetchCategory, setFetchCategory] = useState(false)
  const onRefresh = React.useCallback(() => {
      setRefresh(true);
      setFetchCategory(true)
  }, []);

  useEffect(() => {
    if (fetchCategory === true) {
        try {
          category['Region ID'] = route.params.category["Region ID"]
          category.id = route.params.category.id
          category.title = route.params.category.title
          console.log(category)
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        } finally {
          setFetchCategory(false)
            setRefresh(false);
        }
    }
    
}, [fetchCategory])


  return (
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <StatusBar barStyle='dark-content' />
      <View className={`flex-row w-full items-center p-5 mr-3 ${device.osName === 'iOS' ? '': 'mt-10'}`}>
        <TouchableOpacity onPress={() => navigation.goBack()}  className="mr-3">
          <Ionicons name='arrow-back' color={'black'} size={25}/>
        </TouchableOpacity>
        <View className="flex-row justify-start items-center">
          <Text style={customStyle.h2}>{category.title}</Text>
        </View>
      </View>
      <View className="h-full w-full flex-1">
        <ScrollView
          className="w-full h-full flex-1"
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
            <View>
              <FlatList 
                data={postCategories}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(item) => item.Post.id}
                renderItem={({item, index}) => (
                  <>
                    <CategoryCard data={item} index={index} />
                  </>
                )}
              /> 
            </View>
          </ScrollView>
      </View>
    </SafeAreaView>
  )
}