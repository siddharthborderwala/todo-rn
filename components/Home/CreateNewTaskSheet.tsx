import { useSetAtom } from 'jotai'
import { useCallback, useRef, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import colors from 'tailwindcss/colors'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Icons from '@expo/vector-icons/Ionicons'
import { todoMapAtom } from '../../atoms'
import { generateId } from '../../utils'

const CreateNewTaskSheet: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(undefined)

  const bottomSheetRef = useRef(null)
  const setTodoMap = useSetAtom(todoMapAtom)

  const onCancel = useCallback(() => {
    // clear error
    setError(undefined)
    // reset input value
    setInputValue('')
    // close bottom sheet
    onClose()
  }, [])

  const onSave = useCallback(() => {
    const cleanInputValue = inputValue.trim()

    if (!cleanInputValue) {
      setError('Please enter a task name')
      return
    } else {
      setError(undefined)
    }
    // create new todo item
    const id = generateId()
    // set todo item in todoMap
    setTodoMap((current) => {
      current[id] = {
        title: inputValue.trim(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        draft: false
      }
    })
    // reset input value
    setInputValue('')
    // close bottom sheet
    onClose()
  }, [inputValue, onClose, setTodoMap])

  if (!isOpen) {
    return null
  }

  return (
    <BottomSheet
      index={0}
      detached={true}
      ref={bottomSheetRef}
      onClose={onCancel}
      enablePanDownToClose={true}
      snapPoints={[160]}
      keyboardBehavior="interactive"
      backgroundStyle={{ backgroundColor: colors.gray[200] }}
      style={{
        shadowColor: colors.gray[900],
        shadowOffset: {
          width: 0,
          height: -4
        },
        shadowOpacity: 0.05,
        shadowRadius: 4
      }}
    >
      <View className="px-4 bg-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-2xl text-gray-800">Create Task</Text>
        </View>
        <BottomSheetTextInput
          value={inputValue}
          onChangeText={setInputValue}
          autoFocus={true}
          style={{
            marginTop: 12,
            backgroundColor: colors.gray[50],
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            fontSize: 16,
            color: colors.gray[900]
          }}
        />
        {error ? (
          <View className="flex-row space-x-2 items-center my-2">
            <Icons name="ios-warning" size={24} color={colors.gray[500]} />
            <Text className="text-gray-500">{error}</Text>
          </View>
        ) : null}
        <View className="mt-2 flex flex-row justify-between">
          <Button title="Cancel" color={colors.red[500]} onPress={onCancel} />
          <Button title="Save" color={colors.green[500]} onPress={onSave} />
        </View>
      </View>
    </BottomSheet>
  )
}

export default CreateNewTaskSheet
