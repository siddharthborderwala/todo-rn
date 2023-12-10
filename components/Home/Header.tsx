import { Pressable, Text, View } from 'react-native'
import Icons from '@expo/vector-icons/Ionicons'
import { green } from 'tailwindcss/colors'

const Header = ({ openCreateNewTaskSheet }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="font-bold text-4xl text-gray-900">suprtask</Text>
      <Pressable
        role="button"
        onPress={openCreateNewTaskSheet}
        accessibilityLabel="Create Task"
      >
        <View>
          <Icons name="add-circle" size={40} color={green[400]} />
        </View>
      </Pressable>
    </View>
  )
}

export default Header
