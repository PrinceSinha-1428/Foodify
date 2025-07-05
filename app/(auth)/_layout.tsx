import { Slot } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _AuthLayout() {
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text>_layout</Text>
      <Slot/>
    </SafeAreaView>
  )
}