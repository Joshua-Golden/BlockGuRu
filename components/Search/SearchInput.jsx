import { View, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NHSColors } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const SearchInput = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    return (
      <View className="px-3">
        <View className="flex-row justify-center items-center rounded-sm">
          <View className="" pointerEvents="none">
            <Ionicons name="search" size={20}/>
          </View>
          <TextInput
            className="bg-nhs-pale-grey flex-1 px-4 py-1 "
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
    );
  };

export default SearchInput;