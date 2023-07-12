import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, StatusBar, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { customStyle, device } from '../../../constants/theme';

import { Ionicons} from '@expo/vector-icons'
import useFetch from '../../../hooks/useFetch';
import getCategoryByRegionID from '../../../actions/database/getCategoryByRegionID';
import BlockRegionsCard from '../../components/shared/Regions/BlockRegionsCard';
import PageHeader from '../../components/PageHeader';

export default function SingleRegion({ route, navigation }) {
  // deconstructs the data that is passed through the component
  const { region } = route.params
  // passes the function API get all posts to be handled and returned through the useFetch hooks
  // passes the parameter of * to get every result that is found
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useFetch(getCategoryByRegionID, region.id)

  // sets local state variables to be used by the component
  const [ refresh, setRefresh ] = useState(false);
  const [ fetchRegion, setFetchRegion] = useState(false)
  // onRefresh function to set be used in the scrollview
  const onRefresh = React.useCallback(() => {
      setRefresh(true);
      categoriesRefetch()
      setFetchRegion(true)
  }, []);

  // function that runs everytime the dependency fetchCategory has changed state
  // function checks if the value of fetchcategory is of boolean true
  // runs try catch finally block to reset the object parameters to the original values passed
  // finally toggles the states declared above
  useEffect(() => {
    if (fetchRegion === true) {
        try {
          region.id = route.params.region.id
          region.title = route.params.region.title
          console.log(region)
        } catch (error) {
            console.log(error.message)
        } finally {
          setFetchRegion(false)
          setRefresh(false);
        }
    }
}, [fetchRegion])

// component renderer
  return (
    // SafeAreaView ensures all children of it are rendered within the devices visiible screen view
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <StatusBar barStyle='dark-content' />      
      <View className="w-full px-4">
        <PageHeader title={region.title} isBackArrow />
      </View>
      <View className="h-full w-full flex-1">
        <ScrollView
          className="w-full h-full flex-1"
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
            { isCategoriesLoading ? (
              <>
                <View className="w-full h-full justify-center items-center">
                  <ActivityIndicator size="large" color="black" />
                </View>              
              </>
            ) : (
              <>
                <View>
                  <FlatList 
                    data={categories}
                    scrollEnabled={false}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                      marginHorizontal: 15,
                    }}
                    renderItem={({item, index}) => (
                      <>
                        <BlockRegionsCard data={item} index={index} />
                      </>
                    )}
                  /> 
                </View>
              </>
            )}
          </ScrollView>
      </View>
    </SafeAreaView>
  )
}