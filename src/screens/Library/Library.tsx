import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import getAllPosts from '../../../actions/getAllPosts';
import getAllCategories from '../../../actions/getAllCategories';
import getPostCategoryByID from '../../../actions/getPostCategoryByID';
import { SmallButton } from '../../components/shared/Button';

export default function Library() {
  const { data: posts, isLoading: isPostsLoading, error: postError, refetch: postsRefetch } = useFetch(getAllPosts, '*')
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useFetch(getAllCategories, '*')
  
  const [activeCategory, setActiveCategory] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ post, setPost ] = useState([]);

  const [ isFiltered, setIsFiltered ] = useState(false)
  const [ filteredPosts, setFilteredPosts ] = useState([]);

  const handleFilters = (query) => {
    async function getCategory(query) {
      const { data: postCategories, isLoading: isPostCategoriesLoading, error: postCategoriesError, refetch: postCategoriesRefetch } = useFetch(getPostCategoryByID, query)
      setFilteredPosts(postCategories)
    }
    if ( activeCategory !== query && isFiltered){
      setIsLoading(true)
      getCategory(query)
    } else if ( activeCategory !== query && !isFiltered ) {
      setIsLoading(true)
      getCategory(query)
      setIsFiltered((current) => !current);
    } else if ( activeCategory === query && isFiltered) {
      setIsFiltered((current) => !current);
      setFilteredPosts(posts)
    } else if( activeCategory === query && !isFiltered){
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts)
    }  
  }
  return (
    <SafeAreaView className="h-full justify-center items-center bg-nhs-white">
      <View>

      <Text>Library</Text>
      </View>
      <View>
        <ScrollView>
          <View>
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator
              snapToAlignment="center"
              decelerationRate={'fast'}
              snapToInterval={3}
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({item})=>{ 
                function activeToggle(id){
                  handleFilters(id)
                  if (id === activeCategory) {
                    setActiveCategory(null)
                  } else {
                    setActiveCategory(id)
                  }
                }
                return (
                  <>
                    <TouchableOpacity 
                      className="mx-[2px]"
                      onPress={() => activeToggle(item.id)}>
                      <SmallButton 
                        text={item.title}
                        transparent={ item.id === activeCategory ? false : true }
                        textColor={ item.id === activeCategory ? 'white' : 'light-green'}
                        color={ item.id === activeCategory ? 'light-green' : ''}
                        borderColor='light-green'
                      />
                    </TouchableOpacity>
                  </>
              ) 
            }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}