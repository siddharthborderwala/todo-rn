import { useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native'
import { useAtomValue, useSetAtom } from 'jotai'
import * as Haptics from 'expo-haptics'
import Icons from '@expo/vector-icons/Ionicons'

import Header from './Header'
import Status from './Status'
import CreateNewTaskSheet from './CreateNewTaskSheet'
import EditTaskSheet from './EditTaskSheet'
import { completedAtom, todoMapAtom, uncompletedAtom } from '../../atoms'

const HomePage = () => {
  const [isCreateTaskSheetOpen, setIsCreateTaskSheetOpen] = useState(false)
  const [editTaskId, setEditTaskId] = useState(undefined)

  const setTodoMap = useSetAtom(todoMapAtom)

  const completed = useAtomValue(completedAtom)
  const showCompleted = completed.length > 0

  const uncompleted = useAtomValue(uncompletedAtom)
  const showUncompleted = uncompleted.length > 0

  const handleChangeCompletedStatus = useCallback(
    (itemId: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

      setTodoMap((current) => {
        const task = current[itemId]
        if (task) {
          task.isCompleted = !task.isCompleted
          task.updatedAt = new Date().toISOString()
        }
      })
    },
    [setTodoMap]
  )

  return (
    <KeyboardAvoidingView behavior="padding">
      <View className="px-4 py-6 h-full">
        <Header openCreateNewTaskSheet={() => setIsCreateTaskSheetOpen(true)} />
        <Status className="mt-2" />
        {showCompleted || showUncompleted ? (
          <ScrollView className="mt-6 space-y-4 h-full">
            <View className="space-y-3">
              {showUncompleted ? (
                <View>
                  <View className="bg-green-200 rounded-md self-start px-2 py-1">
                    <Text className="text-green-900">Todo</Text>
                  </View>
                  <View className="mt-2 space-y-2">
                    {uncompleted.map((item) => (
                      <View
                        className="bg-gray-100 rounded-xl flex flex-row items-center px-2 py-2 space-x-2"
                        key={item.id}
                      >
                        <Pressable
                          role="button"
                          onPress={() => handleChangeCompletedStatus(item.id)}
                        >
                          <View>
                            {item.isCompleted ? (
                              <Icons
                                name="checkmark-circle"
                                size={28}
                                color="#22C55E"
                              />
                            ) : (
                              <Icons
                                name="ellipse-outline"
                                size={28}
                                color="gray"
                              />
                            )}
                          </View>
                        </Pressable>
                        <Pressable
                          className="flex-1 w-full"
                          role="button"
                          onPress={() => {
                            setEditTaskId(item.id)
                          }}
                        >
                          <Text className="text-gray-900 text-lg w-full">
                            {item.title}
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
              {showCompleted ? (
                <View className="">
                  <View className="bg-green-200 rounded-md self-start px-2 py-1">
                    <Text className="text-green-900">Completed</Text>
                  </View>
                  <View className="space-y-2 mt-2">
                    {completed.map((item) => (
                      <Pressable
                        key={item.id}
                        role="button"
                        onPress={() => {
                          setEditTaskId(item.id)
                        }}
                      >
                        <View className="bg-gray-100 rounded-xl flex flex-row items-center px-2 py-2 space-x-2">
                          <Pressable
                            role="button"
                            onPress={(e) => {
                              e.stopPropagation()
                              handleChangeCompletedStatus(item.id)
                            }}
                          >
                            <View>
                              {item.isCompleted ? (
                                <Icons
                                  name="checkmark-circle"
                                  size={28}
                                  color="#22C55E"
                                />
                              ) : (
                                <Icons
                                  name="ellipse-outline"
                                  size={28}
                                  color="gray"
                                />
                              )}
                            </View>
                          </Pressable>

                          <Text className="text-gray-900 text-lg w-full">
                            {item.title}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          </ScrollView>
        ) : null}
      </View>
      <CreateNewTaskSheet
        isOpen={isCreateTaskSheetOpen}
        onClose={() => setIsCreateTaskSheetOpen(false)}
      />
      <EditTaskSheet
        isOpen={editTaskId !== undefined}
        onClose={() => setEditTaskId(undefined)}
        taskId={editTaskId}
      />
    </KeyboardAvoidingView>
  )
}

export default HomePage
