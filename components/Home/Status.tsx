import { useAtomValue } from 'jotai'
import { completedAtom, uncompletedAtom } from '../../atoms'
import { Text, View } from 'react-native'
import { useMemo } from 'react'

const Status = ({ className }) => {
  const completed = useAtomValue(completedAtom)
  const uncompleted = useAtomValue(uncompletedAtom)

  const statusText = useMemo(() => {
    if (uncompleted.length > 0) {
      return `Let's get this done!`
    }
    if (completed.length > 0) {
      return `All done for today!`
    }
    return `Add a task to get started!`
  }, [completed.length, uncompleted.length])

  return (
    <View className={className}>
      <Text className="text-gray-700 text-xl mr-auto font-light">
        {statusText}
      </Text>
    </View>
  )
}

export default Status
