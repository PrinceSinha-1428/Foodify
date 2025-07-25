import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import {useDebouncedCallback} from 'use-debounce'

const SearchBar = () => {
    const params = useLocalSearchParams<{query: string}>();
    const [query, setQuery] = useState(params.query);

    const handleSearch = (text: string) => {
        setQuery(text);
        if(!text) router.setParams({query: undefined})
    }
    const handleSubmit = () => {
        if(query.trim()) router.setParams({query})
    }
  return (
    <View className='searchbar'>
        <TextInput
         className='flex-1 p-5' 
         placeholder='Search for pizzas, burgers....'
         placeholderTextColor="#A0A0A0"
         value={query}
         onChangeText={handleSearch}
         onSubmitEditing={handleSubmit}
         returnKeyType='search'
          />
          <TouchableOpacity className='pr-5' onPress={() => router.setParams({query})}>
            <Image source={images.search} className='size-6' resizeMode='contain' tintColor={'#565F6D'} />
          </TouchableOpacity>
    </View>
  )
}
export default SearchBar