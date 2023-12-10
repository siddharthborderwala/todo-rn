import * as Crypto from 'expo-crypto'

export const generateId = (length = 8) => {
  return Crypto.randomUUID()
}
