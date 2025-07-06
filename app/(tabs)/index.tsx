import { images, offers } from "@/constants";
import { Fragment } from "react";
import { Button, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from 'clsx'
import CardButton from "@/Components/CardButton";
import * as Sentry from '@sentry/react-native'

export default function Index() {
  return (
  <SafeAreaView className="flex-1 bg-white">
    
    <FlatList
     data={offers}  // it takes an array or list to render
     renderItem={({item,index}) => {
      const isEven = index % 2 === 0;
      return (
        <View>
            <Pressable className={cn("offer-card",isEven ? 'flex-row-reverse': 'flex-row')} style={{backgroundColor: item.color}} android_ripple={{color: "#ffff22"}}>
               {({pressed}) => (
                <Fragment>
                  <View className="h-full w-1/2">
                    <Image source={item.image} resizeMode='contain' className="size-full" />
                  </View>
                  <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                  <Text className="h1-bold text-white font-quicksand-bold text-3xl leading-tight">{item.title}</Text>
                  <Image source={images.arrowRight} className="size-10" resizeMode='contain' tintColor={"#ffffff"}/>
                  </View>
                </Fragment>
               )}
            </Pressable>
        </View>
      )
     }} // it takes a callback function
     contentContainerClassName="pb-28 px-5"
     ListHeaderComponent={() => (
      <View className="flex-between flex-row w-full my-5 ">
      <View className="flex-start">
        <Text className="small-bold text-primary">Deliver To</Text>
        <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
          <Text className="paragraph-bold text-dark-100">India</Text>
          <Image source={images.arrowDown} className="size-3" resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      <CardButton/>
    </View>
     )}
     ListFooterComponent={() => (
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
     )}
     />

  </SafeAreaView>
  );
}
