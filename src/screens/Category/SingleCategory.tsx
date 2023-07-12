import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, StatusBar, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

// APIs
import useFetch from '../../../hooks/useFetch';
import getAllPosts from '../../../actions/database/getAllPosts';
// Components
import CategoryCard from '../../components/shared/Categories/CategoryCard';
import PageHeader from '../../components/PageHeader';

export default function SingleCategory({ route, navigation }) {
  // deconstructs the data that is passed through the component
  const { category } = route.params

  // passes the function API get all posts to be handled and returned through the useFetch hooks
  // passes the parameter of * to get every result that is found
  const { data: posts, isLoading: isPostsLoading, error: postsError, refetch: postsRefetch } = useFetch(getAllPosts, '*')

  // sets local state variables to be used by the component
  const [ refresh, setRefresh ] = useState(false);
  const [ fetchCategory, setFetchCategory] = useState(false)

  // onRefresh function to set be used in the scrollview
  const onRefresh = useCallback(() => {
      setRefresh(true);
      setFetchCategory(true)
  }, []);

  // function that runs everytime the dependency fetchCategory has changed state
  // function checks if the value of fetchcategory is of boolean true
  // runs try catch finally block to reset the object parameters to the original values passed
  // finally toggles the states declared above
  useEffect(() => {
    if (fetchCategory === true) {
      try {
        category['Region ID'] = route.params.category["Region ID"]
        category.id = route.params.category.id
        category.title = route.params.category.title
      } catch (error) {
        console.log(error.message)
      } finally {
        setFetchCategory(false)
        setRefresh(false);
      }
    }    
}, [fetchCategory])

// Filter for postCategories
// declares new variable postCategories as an array to store the data that is filtered
const postCategories = new Array
const filterCategories = (category, posts) => {
    try {
      // deconstructs the array separating all items found inside
      // for each item that is found, if the ID parameter of the current item is the same as the current category ID parameter
      // push the current item to the array postCategories
      // catches any error found and prints it to console
      posts.map(post => {
        if (post.category_id === category.id) {
            postCategories.push(post)
        }    
      })
    } catch (error){
      console.log(error.message)
    }
}
// calls filter function
filterCategories(category, posts)

// component renderer
  return (
    // SafeAreaView ensures all children of it are rendered within the devices visiible screen view
    <SafeAreaView className="w-full h-full bg-nhs-white">
      {/* changes status bar to dark mode */}
      <StatusBar barStyle='dark-content' />
      <View className="w-full px-5">
        <PageHeader title={category.title} isBackArrow/>
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
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  marginHorizontal:15,
                }}
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