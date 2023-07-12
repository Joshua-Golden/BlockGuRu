import { View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { device, customStyle } from '../../../constants/theme';

import * as SecureStore from 'expo-secure-store';
import * as Network from 'expo-network'

// shared
import { BigButton } from '../../components/shared/Button';
import PageHeader from '../../components/PageHeader';

export default function TermsAndConditions({}) {
  const navigation = useNavigation();

  // declares states to be used by component
  const [ isLoading, setIsLoading ] = useState( true );
  const [ isOffline, setIsOffline ] = useState(false);

  // functions that checks if the device has an active network connection
  // if yes, set offline state to false
  // if no, set offline state to true
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
  // checks local encrypted storage to see if the user has accepted terms
  // checks using key 'termsAccepted'
  // checks if the value returned is usable 
  // if yes, and the device is offline, navigate to the library screen from the home route
  // if no, navigate to the welcome screen

  // if the terms are accepted, and the there is a network connection, navigate to the library screen from the home route
  // if not, navigate to the home route
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
            'An unknown error has occured.',
            [{
                text: 'Try Again',
                onPress: () => checkTerms(),
            }]
        )
    } finally {
        setIsLoading(false)
    }
  }
  
  // function that runs every time the screen is rerendered
  useEffect(() => {
    checkNetworkConnection()
    checkTerms();
  }, [])
  
  // callback for the accepted terms button
  // if the value in the argument is true
  // sets the local encrypted storage key for termsAccepted and passes the value true
  // routes to home on success
  // if false navigate to back to welcome screen
  const handleTerms = async (terms) => {
    if (terms) {
      await SecureStore.setItemAsync('termsAccepted', 'true');    
      navigation.navigate('Home')  
    }
    else {
      await SecureStore.setItemAsync('termsAccepted', 'false');    
      navigation.navigate('Welcome')  
    }
  }
  return (
    <>
    {/* checks if the page is currently loading
      if yes, render activity loader
      if no render the terms view */}
    { isLoading ? (
     <>
      <View className="h-full w-full justify-center items-center">
          <ActivityIndicator size='large' color="black" />
      </View>     
     </> 
    ) : (
      <>
        <View className="flex-1 bg-nhs-white justify-center items-center">
          {/* Status Bar */}
          <StatusBar />
          {/* Navigation */}
          <View className="w-full px-5">
            <PageHeader title='Terms and Conditions' isBackArrow />
          </View>
          <View className="flex-1 justify-center items-center px-5">
            <ScrollView className="flex-1">
            <View className="w-full flex-col justify-start items-start pb-5">
              <Text className="text-2xl font-bold text-nhs-light-green">Introduction</Text>
              <Text className="text-md text-nhs-black mb-4">This App is exactly what it says it is - it’s a guide. It doesn’t set out to replace a standard text book. It certainly isn’t a substitute for a sound knowledge of anatomy and local anaesthetic pharmacology. It’s more of a guide to the occasional blocker, a refresher to the more experienced, and a teaching aid to the trainer. It’s a source of tips and advice which we wished had been around when we started using ultrasound. We are a busy hospital with a heavy teaching commitment. Therefore we choose to use nerve stimulation in conjunction with ultrasound as we feel it adds another layer of safety to the patient, and reassurance to the operator. </Text>

              <Text className="text-2xl font-bold text-nhs-light-green">Disclaimer</Text>
              <Text className="text-md text-nhs-black mb-4">YOU ACKNOWLEDGE AND AGREE THAT PRODUCTS PURCHASED FROM US CONTAIN CONTENT RELATING TO THE PERFORMANCE OF MEDICAL PROCEDURES AND TECHNIQUES. WE NEITHER MAKE NOR GIVE ANY STATEMENT, REPRESENTATION, ASSURANCE OR WARRANTY IN RESPECT OF SUCH MEDICAL PROCEDURES AND TECNIQUES AND YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT RELIED ON ANY SUCH STATEMENT, REPRESENTATION, ASSURANCE OR WARRANTY IN ENTERING INTO ANY CONTRACT AND WILL NOT RELY ON ANY SUCH STATEMENT, REPRESENTATION, ASSURANCE OR WARRANTY WHEN UTILISING ANY PRODUCT OR ANYTHING CONTAINED THEREIN.</Text>
              <Text className="text-md text-nhs-black mb-4">1.2 Our entire liability for losses you suffer as result of any act or omission by us in connection with these terms and conditions and the performance of any Contract is strictly limited to the purchase price of the Product you purchased.</Text>
              <Text className="text-md text-nhs-black mb-4">1.3 Nothing in these terms and conditions excludes or limits in any way our liability for;</Text>
              <Text className="text-md text-nhs-black ">(a) death or personal injury caused by our negligence;</Text>
              <Text className="text-md text-nhs-black ">(b) fraud or fraudulent misrepresentation; or</Text>
              <Text className="text-md text-nhs-black mb-4">(c) any matter for which it would be illegal for us to exclude, or attempt to exclude, our liability.</Text>
              <Text className="text-md text-nhs-black mb-4">1.4 We are not responsible for any special, indirect or consequential losses which happen as a side effect of the main loss or damage, including but not limited to loss of income or revenue, loss of business, loss of profits or contracts, loss of anticipated savings, loss of data and waste of management or office time, all however arising and whether caused by tort (including, without limitation, negligence), breach of contract or otherwise.</Text>

              <Text className="text-2xl font-bold text-nhs-light-green">Copyright</Text>
              <Text className="text-md">All intellectual property rights in this application (including, without limitation, any copyright and database rights) are owned by University Hospitals Birmingham NHS Trust Foundation ("UHB") or its licensors, unless otherwise stated.</Text>
            
            </View>
            </ScrollView>
            <SafeAreaView className={`${device.brand === 'Apple' ? 'my-1' : 'my-4' }`}>
              <View className="flex-row justify-around items-center">
                <TouchableOpacity onPress={() => handleTerms(false)} className="w-[40%]">
                  <BigButton text='Decline' color='light-blue' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTerms(true)} className="w-[40%]">
                  <BigButton text='Accept' color='light-green' />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          
          </View>
        </View>
      </>
    )}
    </>
  )
}