import { View, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NHSColors } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const SearchInput = ({  }) => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    const containerStyle = "my-2 flex-row justify-center items-center rounded-md px-3 bg-nhs-pale-grey"
    const textInputStyle = "text-lg flex-1 py-2 mb-1 pl-2 text-nhs-dark-grey"

    return (
        <View className={`${containerStyle}`}>
          <View className="justify-center items-center" pointerEvents="none">
            <Ionicons name={`search`} size={25}/>
          </View>
          <TextInput
            className={`${textInputStyle}`}
            placeholder={`What do you want to watch?`}
            value={search}
            onChangeText={setSearch}
          />
        </View>
    );
  };

export default SearchInput;