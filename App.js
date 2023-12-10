import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import HomePage from './components/Home'

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <HomePage />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
