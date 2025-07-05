import { SplashScreen, Stack } from "expo-router";
import '../global.css'
import { useEffect } from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({ // for using custom fonts
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });
  // useEffect for Loading
  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync()
  },[fontsLoaded,error])
  return <Stack screenOptions={{ headerShown: false}} />;
}
