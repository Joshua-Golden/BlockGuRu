import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import * as Network from 'expo-network'
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native';

// Assets
import anesthetic from '../../assets/anesthetic.png';
import NHS_Logo_Blue from '../../assets/logos/NHS/NHS-blue-white.jpg';
import Pajunk from '../../assets/logos/Pajunk/png/PA.png';
import { customStyle, width, height } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { BigButton } from '../../components/shared/Button';

export default function Welcome( ) {
    const navigation = useNavigation();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ isOffline, setIsOffline ] = useState( true );

    async function checkNetworkConnection() {
        try {
          setIsLoading(true)
          const isAirplaneMode = await Network.isAirplaneModeEnabledAsync()
          if (isAirplaneMode) {
            setIsOffline(true)
          } else {
            const network = await Network.getNetworkStateAsync();
            if ( network.isConnected === true && network.isInternetReachable === true ) {
              setIsOffline(false)
            } else {
              setIsOffline(true)
            }
          }
        } catch (error) {
          console.log(error);
          Alert.alert(error.message)
        } finally {
          setIsLoading(false)
        }
      }
    
    async function checkTerms() {
        setIsLoading(true)
        try {
            checkNetworkConnection()
            if (isOffline) {
                navigation.navigate('Home' , { screen: 'librarytab'});
            } else {
                const termsAccepted = await SecureStore.getItemAsync('termsAccepted');
                if( termsAccepted === null || termsAccepted === undefined || termsAccepted.length <= 0 ) {
                    await SecureStore.setItemAsync('termsAccepted', 'false');
                    navigation.navigate('Welcome');    
                } else if ( termsAccepted === 'true' ) { 
                    navigation.navigate('Home');
                }
            }
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Something went wrong',
                error.message,
                [{
                    text: 'Try Again',
                    onPress: () => checkTerms(),
                }]
            )
        } finally {
            setIsLoading(false)

        }
    }

    useEffect(() => {
        checkNetworkConnection();
        checkTerms();
    }, [])

  return (
    <>
    {isLoading ?
        <>
            <View className="h-full w-full justify-center items-center">
                <ActivityIndicator size='large' color="black" />
            </View>
        </>
    :
        <View className="flex-1 justify-center items-center bg-nhs-white">
            <View className="flex-1 justify-center items-center bg-nhs-white">
                <Image 
                    style={{
                        width:300,
                        height: 300
                    }}
                    source={anesthetic}
                    contentFit='cover'
                />
            </View>


            <View className="h-[30%] w-full justify-center items-center">
                <LinearGradient 
                    colors={['transparent', 'rgba(32,24,24,0.8)']}
                    className="absolute left-0 top-0 right-0 bottom-0 h-full"
                    />
            </View>

            <View className="absolute h-full justify-end mx-4">
                <View className="h-[30%] justify-around items-center">
                    <View className="justify-start items-center">
                        <Text style={customStyle.title}>Welcome to Block GuRu</Text>
                        <Text style={customStyle.p}> The number 1 app to learn about Anesthesiology.</Text>
                        <Text style={customStyle.p}> Brought to you by: </Text>
                    </View>

                    {/* Logo Box */}
                    <View className="flex-row h-[50%] my-8 justify-around items-center">
                        <Image 
                            style={{
                                width: 80,
                                height: 80
                            }}
                            source={NHS_Logo_Blue}
                            contentFit='contain'
                        />
                        <View className="px-2"><Text>and</Text></View>
                        <Image 
                            style={{
                                width:200,
                                height: 200
                            }}
                            source={Pajunk}
                            contentFit='contain'
                        />
                    </View>
                </View>
                <View className="mb-[35px]">
                    <View className="flex-row gap-2 justify-center items-center p-3">
                        <View className="w-[40px] rounded-full bg-nhs-light-green px-3 py-1"></View>
                        <View className="w-[5px] rounded-full bg-nhs-light-blue p-1"></View>
                        <View className="w-[5px] rounded-full bg-nhs-light-blue p-1"></View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('termsandconditions')}>
                        <BigButton text='Get Started' color='light-green'/>    
                    </TouchableOpacity>                  
                </View>
                
            </View>
        </View>
    }
    </>
  )
}