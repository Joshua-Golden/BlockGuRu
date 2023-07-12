import { View, Text, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';

import PageHeader from '../../components/PageHeader';

import UHB_Logo from '../../assets/logos/UHB/uhb2-trans.png';
import { Ionicons } from '@expo/vector-icons';

export default function Information() {
    const navigation = useNavigation()

    // gets current year from device
    const currentyear = new Date().getFullYear()
    return (
        <SafeAreaView className="flex-1 bg-nhs-white">
            <StatusBar style='dark' />
            <View className="h-full px-5">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <PageHeader title='Information' isBackArrow/>
                <View className="w-full flex-col justify-start items-start">
                    <TouchableOpacity onPress={() => navigation.navigate('AboutBlockGuRU')} className="flex-row w-full justify-between items-center pb-5">
                        <Text className="text-lg font-medium tracking-tighter">About Block GuRU</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutBlockGuRU')} className="">
                            <Ionicons name="chevron-forward" color={'black'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutTermsAndConditions')} className="flex-row w-full justify-between items-center pb-5">
                        <Text className="text-lg font-medium tracking-tighter">Terms and Conditions</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutTermsAndConditions')} className="">
                            <Ionicons name="chevron-forward" color={'black'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutPrivacyPolicy')} className="flex-row w-full justify-between items-center pb-5">
                        <Text className="text-lg font-medium tracking-tighter">Privacy Policy</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutPrivacyPolicy')} className="">
                            <Ionicons name="chevron-forward" color={'black'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutHelpCenter')} className="flex-row w-full justify-between items-center pb-5">
                        <Text className="text-lg font-medium tracking-tighter">Help Center</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutHelpCenter')} className="">
                            <Ionicons name="chevron-forward" color={'black'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AdditionalResources')} className="flex-row w-full justify-between items-center pb-5">
                        <Text className="text-lg font-medium tracking-tighter">Additional Resources</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AdditionalResources')} className="">
                            <Ionicons name="chevron-forward" color={'black'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Acknowledgements')} className="flex-row w-full justify-between items-center pb-5">
                        <Text className="text-lg font-medium tracking-tighter">Acknowledgements</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Acknowledgements')} className="">
                            <Ionicons name="chevron-forward" color={'black'} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View className="w-full gap-3 items-center">
                    <Text className="text-xl font-bold -mb-3">Block GuRU</Text>
                    <Text className="text-md">Copyright <Text>{'\u00A9'}</Text>{currentyear}</Text>
                    <Image
                        source={UHB_Logo}
                        style={{
                            width:230,
                            height:60,
                        }}
                        contentFit='cover'
                    />
                </View>
        </ScrollView>
        </View>
    </SafeAreaView>
  )
}