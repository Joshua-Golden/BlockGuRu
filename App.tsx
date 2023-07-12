import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/appNavigation';

import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as ScreenOrientation from 'expo-screen-orientation'

async function lockScreenOrientaiton() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
}
export default function App() {
  lockScreenOrientaiton()

  const [ initialRouteName, setInitialRouteName ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    async function checkTerms() {
      setIsLoading(true);
      const termsAccepted = await SecureStore.getItemAsync('termsAccepted');
      if( termsAccepted === null || termsAccepted === undefined || termsAccepted.length <= 0 ) {
        await SecureStore.setItemAsync('termsAccepted', 'false');
        setInitialRouteName('Welcome');
      } else if ( termsAccepted === 'true' ) { 
        setInitialRouteName('Home');
      }
      setIsLoading(false);
    }
    checkTerms();
  }, [])

  return (
    <>
      { isLoading? (
        <>
          <View className="h-full w-full justify-center items-center">
              <ActivityIndicator size='large' color="black" />
          </View>
        </>
      ) : (
        <>
            <NavigationContainer>
              <AppNavigation initialRouteName={initialRouteName}/>
            </NavigationContainer>
        </>
      )}
    </>

  );
};
