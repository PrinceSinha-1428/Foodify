import CustomButton from '@/Components/CustomButton'
import CustomInput from '@/Components/CustomInput'
import { signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import * as Sentry from '@sentry/react-native'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email: '',password: ''});
  const submit = async () => {
    const {email,password} = form;
    if(!email || !password) return Alert.alert("Error","Please Enter Valid Email Address and Password")
    setIsSubmitting(true);
    try{
      //todo appwrite signin function
      await signIn({email,password})
      router.push('/');
    } catch(error: any){
      Alert.alert("Error",error.message);
      Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
        <CustomInput placeholder='Enter Your Email' value={form.email} onChangeText={(text) => setForm((prev) => ({...prev , email: text}))} label='Email' keyboardType='email-address'/>
        <CustomInput placeholder='Enter Your Password' value={form.password} onChangeText={(text) => setForm((prev) => ({...prev , password: text}))} label='Password' secureTextEntry={true}/>
        <CustomButton title='Sign in' isLoading={isSubmitting} onPress={submit}/>
        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>Don't have an account ?</Text>
          <Link href={'/(auth)/sign-up'} className='base-bold text-primary'>Sign Up</Link>
        </View>
    </View>
  )
}
export default SignIn