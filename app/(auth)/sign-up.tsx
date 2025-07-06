import CustomButton from '@/Components/CustomButton'
import CustomInput from '@/Components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { View, Text, Alert } from 'react-native'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name: '',email: '',password: ''});
  const submit = async () => {
    const {name, email, password} = form;
    if(!name || !email || !password) return Alert.alert("Error","Please Enter Valid Email Address and Password")
    setIsSubmitting(true);
    try{
      //todo appwrite signup functions
      await createUser({ email, name, password })
      router.push('/');
    } catch(error: any){
      Alert.alert("Error",error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-3'>
        <CustomInput placeholder='Enter Your Full Name' value={form.name} onChangeText={(text) => setForm((prev) => ({...prev , name: text}))} label='Name' keyboardType='default' />
        <CustomInput placeholder='Enter Your Email' value={form.email} onChangeText={(text) => setForm((prev) => ({...prev , email: text}))} label='Email' keyboardType='email-address'/>
        <CustomInput placeholder='Enter Your Password' value={form.password} onChangeText={(text) => setForm((prev) => ({...prev , password: text}))} label='Password' secureTextEntry={true}/>
        <CustomButton title='Sign Up' isLoading={isSubmitting} onPress={submit}/>
        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>Already have an account ?</Text>
          <Link href={'/(auth)/sign-in'} className='base-bold text-primary'>Sign In</Link>
        </View>
    </View>
  )
}
export default SignUp