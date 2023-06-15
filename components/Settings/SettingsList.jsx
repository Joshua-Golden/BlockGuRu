import { View, Text } from 'react-native'
import React from 'react'
import SettingsCard from './SettingsCard'
import { ScrollView } from 'react-native-gesture-handler'

const SettingsList = () => {
  return (
    <View>
        <ScrollView className="h-full">
            <View className="p-2 mb-3 rounded-2xl bg-nhs-pale-grey">
                <SettingsCard color="nhs-light-blue" icon="" title="About"/>
                <View className="rounded-full border-b-[1px] border-nhs-white my-2" />
                <SettingsCard color="nhs-light-blue" icon="" title="Security"/>
                <View className="rounded-full border-b-[1px] border-nhs-white my-2" />
                <SettingsCard color="nhs-light-blue" icon="" title="Data Saver"/>
            </View>
        </ScrollView>
    </View>
  )
}

export default SettingsList;