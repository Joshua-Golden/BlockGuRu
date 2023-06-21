import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import { NHSColors, ios } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
  return (
    <View className="top-0 absolute">
        {/* Status Bar */}
        <StatusBar />
        {/* Navigation */}
        <SafeAreaView className={"flex border-b-[1px] border-neutral-200"+ ios? "py-4" : "py-5"}>
            <View className="flex-row justify-between items-center mx-5">
                <View className="p-4" />
                <Text className="font-bold text-lg text-nhs-black">Block GuRu</Text>
                <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.navigate('settings')}>
                    <Ionicons name='settings' color={NHSColors['nhs-blue']} size={20}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    </View>
  )
}

export default Header;