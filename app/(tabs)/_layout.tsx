import { Redirect, Slot } from 'expo-router'

export default function _RootLayout() {
    const isAuthenticated = true;
    if(!isAuthenticated) return <Redirect href={'/(auth)/sign-in'} />
  return (
   <Slot/>
  )
}