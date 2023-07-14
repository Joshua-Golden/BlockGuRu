import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import PageHeader from '../../components/PageHeader'

export default function AboutBlockGuRU() {
  return (
    <SafeAreaView className="flex-1 px-5 bg-nhs-white">
      <StatusBar style='dark' />
      <View className="h-full px-5">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <PageHeader title='About Block GuRU' isBackArrow/>
          <View className="w-full flex-col justify-start items-start pb-5">
            <Text className="text-lg text-center font-bold mb-6" style={{lineHeight:20}}>Block GuRU: Your Ultimate Anaesthesia Block Study Companion</Text>
            <Text className="text-md text-nhs-black mb-4">Welcome to <Text className="text-md text-nhs-light-green font-bold" >Block GuRU</Text>, the essential mobile app designed exclusively for anaesthetists seeking comprehensive guidance on different blocks and anaesthetic techniques. Our latest Alpha Version 2 combines the power of a streaming platform with written post content, providing you with an immersive learning experience.</Text>
            <Text className="text-md text-nhs-black mb-4">At Block GuRU, we strive to continually improve our app. Stay tuned as we add more blocks in future updates. We value your feedback and suggestions, so don't hesitate to reach out to us.</Text>
            <Text className="text-md text-nhs-light-green font-bold mb-4">Visit www.raguru.com for more information.</Text>
            <Text className="text-md text-nhs-black mb-4">Please note that while Block GuRU aims to be your go-to guide, it is not a replacement for standard textbooks or comprehensive knowledge of anatomy and local anaesthetic pharmacology. It serves as a valuable tool for occasional blockers, experienced practitioners seeking a refresher, and trainers looking for effective teaching aids.</Text>
            <Text className="text-md text-nhs-black mb-4">Thank you for joining us on your journey to elevate your understanding and skills in regional anaesthesia with Block GuRU.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}