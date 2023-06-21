import React, { useState } from "react";
import { TouchableOpacity, FlatList, Text, View } from "react-native";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      className={`py-3 px-4 mr-2 rounded-md + ${name === activeTab ? 'bg-nhs-light-green': 'bg-nhs-light-blue'}`}
      onPress={onHandleSearchType}
    >
      <Text className={`text-sm font-bold + ${name === activeTab ? 'text-nhs-white' : 'text-gray-700'}`}>{name}</Text>
    </TouchableOpacity>
  );
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View className="my-2 mx-3">
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Tabs;