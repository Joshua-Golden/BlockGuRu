import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import PageHeader from '../../components/PageHeader'

export default function AboutHelpCenter() {
  return (
    <SafeAreaView className="flex-1 px-5 bg-nhs-white">
      <StatusBar style='dark' />
      <View className="h-full px-5">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <PageHeader title='Help Center' isBackArrow/>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}