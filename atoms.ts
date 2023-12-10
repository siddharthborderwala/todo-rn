import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'

export type Task = {
  title: string
  isCompleted: boolean
  draft: boolean
  createdAt: string
  updatedAt: string
}

export const todoMapAtom = atomWithImmer<Record<string, Task>>({})

const latestFirst = (a: Task, b: Task) => {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
}

export const completedAtom = atom((get) => {
  const todoMap = get(todoMapAtom)
  return Object.entries(todoMap)
    .filter(([, item]) => item.isCompleted && !item.draft)
    .map(([id, item]) => ({ id, ...item }))
    .sort(latestFirst)
})

export const uncompletedAtom = atom((get) => {
  const todoMap = get(todoMapAtom)
  return Object.entries(todoMap)
    .filter(([, item]) => !item.isCompleted && !item.draft)
    .map(([id, item]) => ({ id, ...item }))
    .sort(latestFirst)
})
