import { View, Text, ScrollView, Linking } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import PageHeader from '../../components/PageHeader'
import { TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'

import Catalogues01 from '../../assets/Catalogues_01.jpg';
import Catalogues02 from '../../assets/Catalogues_02.jpg';


// function that creates a navigatable link that can be used inside comopnent
const OpenExternalLink = ({ url, children, styles }) => {
  const onPress = () => Linking.canOpenURL(url).then(() => {
    Linking.openURL(url);
  })

  // returns the a button with the link on it 
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className={styles}>{children}</Text>
    </TouchableOpacity>
  )
}
export default function AdditionalResources() {
  return (
    <SafeAreaView className="flex-1 px-5 bg-nhs-white">
      <StatusBar style='dark' />
      <View className="h-full px-5">
        <PageHeader title='Additional Resources' isBackArrow/>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="flex-col justify-start items-start">
            <Text className="text-xl font-bold">Equipment Catalogues</Text>
            <Text className="text-md">A selection of catalogues are available from Pajunk's web pages.</Text>

            <OpenExternalLink url="https://panjunk.com/" styles='text-md w-full font-bold text-nhs-light-blue text-center text-nhs-black mb-4'>www.pajunk.com</OpenExternalLink>
            <Text className="text-md">or email</Text>
            <Text className="text-md">info@pajunk.com</Text>

            <View className="w-full justify-center items-start my-4">
              <Image
                source={Catalogues01}
                style={{
                    width:500,
                    height:300,
                }}
                contentFit='cover'
              />
              <View className="py-1"/>
              <Image
                source={Catalogues02}
                style={{
                  width:500,
                  height:300,
                }}
                contentFit='cover'
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}