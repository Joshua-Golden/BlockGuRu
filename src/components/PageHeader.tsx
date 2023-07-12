import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { device } from '../../constants/theme';

// ensures all data passed through the component is the correct and amount and of the correct data type
interface PageHeaderProps {
    title: string;
    isBackArrow?: Boolean;
}

export default function PageHeader({ title, isBackArrow }: PageHeaderProps ){
  const navigation = useNavigation()
  // component renderer
  return (
    // SafeAreaView ensures all children of it are rendered within the devices visiible screen view
    <SafeAreaView className="w-full justify-center items-center">
      <View
        // if the device operating system is android, add space at the top of the screen
        className={`flex-row pb-5 justify-start items-center w-full ${device.osName === 'Android' ? 'pt-[80px]' : '' }`}>
        <>
       {/* checks if the boolean required is true or false
          if true, render the back arrow
          if false, render an empty view */}
          { isBackArrow ? (
            <>
              <TouchableOpacity onPress={() => navigation.goBack()} className="mr-5 tracking-tighter">
                <Ionicons name='arrow-back' color={'black'} size={25} />
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
          <View className="">
            <Text className="text-black font-bold text-2xl">{title}</Text>
          </View>
        </>
      </View> 
    </SafeAreaView>
  )
}