import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ModalPortal } from'react-native-modals'
import AppNavigation from './navigation/appNavigation';


export default function App() {
  
  return (
    <NavigationContainer>
      <AppNavigation />
      <ModalPortal />
    </NavigationContainer>
  );
};
