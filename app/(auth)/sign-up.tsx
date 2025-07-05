import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'

const SignUp = () => {
  return (
    <View className='text-4xl flex justify-center items-center'>
      <Text>SignUp</Text>
      <Button title='Sign-In' onPress={() => router.push('/(auth)/sign-in')} />
    </View>
  )
}
export default SignUp