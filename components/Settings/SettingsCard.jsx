import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const SettingsCard = ({ color, icon, title }) => {
  return (
    <TouchableOpacity>
        <View className="flex-row items-center rounded-2xl p-2">
            <View className={`bg-${color} p-2 justify-center items-center rounded-2xl`}>
                <Ionicons name="information-circle" size={30} color="white" />
            </View>
            <View className="justify-center items-start ml-3">
                <Text className="font-bold text-nhs-black text-xl">{title}</Text>
                <Text className="text-nhs-dark-grey text-md font-medium">Secondary Text</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default SettingsCard