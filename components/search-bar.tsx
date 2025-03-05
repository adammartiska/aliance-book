import { Search } from 'lucide-react-native';
import React from 'react';
import { TextInput, View } from 'react-native';

export type SearchBarProps = {
  searchText: string;
  onSearch: (query: string) => void;
};

const SearchBar = ({ searchText, onSearch }: SearchBarProps) => {
  return (
    <View className="my-4 h-16 flex-row items-center justify-center rounded-t-lg bg-white px-4 py-2 shadow-sm">
      <Search color="black" size={18} />
      <TextInput
        value={searchText}
        onChangeText={onSearch}
        placeholder="Search ..."
        className="ml-2 flex-1 text-xl text-gray-800"
        autoComplete="off"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
