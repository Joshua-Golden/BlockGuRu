import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, StatusBar, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { customStyle, device } from '../../../constants/theme';

import { Ionicons} from '@expo/vector-icons'
import useFetch from '../../../hooks/useFetch';
import getCategoryByRegionID from '../../../actions/database/getCategoryByRegionID';
import BlockRegionsCard from '../../components/shared/Categories/BlockRegionsCard';

export default function SingleRegion({ route, navigation }) {
  const { region } = route.params
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: categoriesRefetch } = useFetch(getCategoryByRegionID, region.id)

  const [ refresh, setRefresh ] = useState(false);
  const [ fetchRegion, setFetchRegion] = useState(false)
  const onRefresh = React.useCallback(() => {
      setRefresh(true);
      categoriesRefetch()
      setFetchRegion(true)
  }, []);

  useEffect(() => {
    if (fetchRegion === true) {
        try {
          region.id = route.params.region.id
          region.title = route.params.region.title
          console.log(region)
        } catch (error) {
            console.log(error.message)
            Alert.alert(
              'Something went wrong',
              error.message,
              [{
                text: 'Try again',
                onPress: () => onRefresh(),
              }])
        } finally {
          setFetchRegion(false)
            setRefresh(false);
        }
    }
    
}, [fetchRegion])


  return (
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <StatusBar barStyle='dark-content' />
      <View className={`flex-row w-full items-center p-5 mr-3 ${device.osName === 'iOS' ? '': 'mt-10'}`}>
        <TouchableOpacity onPress={() => navigation.goBack()}  className="mr-3">
          <Ionicons name='arrow-back' color={'black'} size={25}/>
        </TouchableOpacity>
        <View className="flex-row justify-start items-center">
          <Text style={customStyle.h2}>{region.title}</Text>
        </View>
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