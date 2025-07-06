import seed from '@/lib/seed'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const search = () => {
  return (
    <SafeAreaView>
      <Text>search</Text>
      <Button title='seed' onPress={() => {
        console.log("seeding")
        seed().catch((error) => console.log("failed to seed database",error))}} />
    </SafeAreaView>
  )
}
export default search