import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import * as Network from 'expo-network'
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native';

// Assets
import anesthetic from '../../assets/anesthetic.png';
import UHB_Logo from '../../assets/logos/UHB/uhb2-trans.png';
import Pajunk from '../../assets/logos/Pajunk/png/PA.png';

import { customStyle, width, height } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { BigButton } from '../../components/shared/Button';

export default function Welcome( ) {
    const navigation = useNavigation();

    // declares variable states for page loading
    const [ isLoading, setIsLoading ] = useState( true );
    const [ isOffline, setIsOffline ] = useState( true );

  // checks if device has active network connection
  // if yes setoffline to false
  // if no set offline to true
    async function checkNetworkConnection() {
        try {
             setIsLoading(true)
            const network = await Network.getNetworkStateAsync();
            if ( network.isConnected === true && network.isInternetReachable === true ) {
                setIsOffline(false)
            } else {
                setIsOffline(true)
            }
        } catch (error) {
          console.log(error);
          Alert.alert(error.message)
        } finally {
          setIsLoading(false)
        }
      }
    
  // checks Terms acceptance
  // looks in application encrypted storage for key 'termsAccepted' and pulls value
  // if value is usable, check if device is online
  // if online navigate to welcome screen if the value is false | navigate to library screen from home route if true
    async function checkTerms() {
        setIsLoading(true)
        try {
            checkNetworkConnection()            
            const termsAccepted = await SecureStore.getItemAsync('termsAccepted');
            if( termsAccepted === null || termsAccepted === undefined || termsAccepted.length <= 0 ) {
                await SecureStore.setItemAsync('termsAccepted', 'false');
                if (isOffline) {
                    navigation.navigate('Home' , { screen: 'Library Tab'});
                } else {
                    navigation.navigate('Welcome');
                } 
            } else if ( termsAccepted === 'true' ) { 
                if (isOffline) {
                    navigation.navigate('Home' , { screen: 'Library Tab'});
                } else {
                    navigation.navigate('Home');
                }
            }
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Something went wrong',
                'There seems to be an unknown network error',
                [{
                    text: 'Dismiss'
                }]
            )
        } finally {
            setIsLoading(false)

        }
    }
    // functions that runs every time the screen is rendered
    // calls function for checknetworkconnection and check terms
    useEffect(() => {
        checkNetworkConnection();
        checkTerms();
    }, [])

  return (
    // renders different views based on loading states and usable data
    <>
    {isLoading ?
        <>
            <View className="h-full w-full justify-center items-center">
                <ActivityIndicator size='large' color="black" />
            </View>
        </>
    :
        <View className="relative h-full w-full justify-end items-center bg-nhs-white">
            <View className="h-[30%] w-full bottom-0">
                <LinearGradient 
                    colors={['transparent', 'rgba(32,24,24,0.8)']}
                    className="absolute left-0 top-0 right-0 bottom-0 h-full"
                    />
            </View>
            <View className="absolute bottom-0 h-full justify-end mx-4">
                    <View className="justify-center items-center bg-nhs-white">
                        <Image 
                            style={{
                                width:300,
                                height: 300
                            }}
                            source={anesthetic}
                            contentFit='cover'
                        />
                    </View>
                <View className="items-center">
                    <View className="mb-3 justify-start items-center">
                        <Text className="text-center text-2xl font-[600]">Welcome to </Text>
                        <Text className="text-center text-3xl font-[900]">Block GuRU</Text>
                        <View className="py-1" />
                        <Text className="text-center text-md -mb-2"> Brought to you by: </Text>
                    </View>
                    <View className="w-full items-center">
                        <Image 
                            style={{
                                width:230,
                                height:60,
                            }}
                            source={UHB_Logo}
                            contentFit='contain'
                        />
                        <Image 
                            style={{
                                width:180,
                                height: 40
                            }}
                            source={Pajunk}
                            contentFit='contain'
                        />
                    </View>
                </View>
                <View className="mt-5 mb-[50px]">
                    <View className="flex-row gap-2 justify-center items-center p-3">
                        <View className="w-[40px] rounded-full bg-nhs-light-green px-3 py-1"></View>
                        <View className="w-[5px] rounded-full bg-nhs-light-blue p-1"></View>
                        <View className="w-[5px] rounded-full bg-nhs-light-blue p-1"></View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Termsandconditions')}>
                        <BigButton text='Get Started' textColor='light-green' color='light-green'/>    
                    </TouchableOpacity>                  
                </View>
                
            </View>
        </View>
    }
    </>
  )
}