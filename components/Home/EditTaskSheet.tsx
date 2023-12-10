import { useAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import colors from 'tailwindcss/colors'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Icons from '@expo/vector-icons/Ionicons'
import { Task, todoMapAtom } from '../../atoms'

const EditTaskSheet: React.FC<{
  isOpen: boolean
  onClose: () => void
  taskId: string | undefined
}> = ({ isOpen, onClose, taskId }) => {
  const [todoMap, setTodoMap] = useAtom(todoMapAtom)
  const task = todoMap[taskId] as Task | undefined

  const [inputValue, setInputValue] = useState(task?.title ?? '')
  const [error, setError] = useState(undefined)

  const bottomSheetRef = useRef(null)

  const onCancel = useCallback(() => {
    // clear error
    setError(undefined)
    // reset input value
    setInputValue('')
    // close bottom sheet
    onClose()
  }, [])

  const onSave = useCallback(() => {
    if (!taskId) {
      return
    }
    const cleanInputValue = inputValue.trim()
    if (!cleanInputValue) {
      setError('Please enter a task name')
      return
    } else {
      setError(undefined)
    }
    // set todo item in todoMap
    setTodoMap((current) => {
      const task = current[taskId]
      if (task) {
        task.title = cleanInputValue
        task.updatedAt = new Date().toISOString()
      }
    })
    // reset input value
    setInputValue('')
    // close bottom sheet
    onClose()
  }, [inputValue, taskId, setTodoMap, onClose])

  useEffect(() => {
    if (task?.title) {
      setInputValue(task.title)
    }
  }, [task?.title])

  if (!isOpen || !task) {
    return null
  }

  return (
    <BottomSheet
      index={0}
      detached={true}
      ref={bottomSheetRef}
      onClose={onCancel}
      snapPoints={[160]}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: colors.gray[200], opacity: 1 }}
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
        <Text className="font-bold text-2xl text-gray-800">Edit Task</Text>
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

export default EditTaskSheet
