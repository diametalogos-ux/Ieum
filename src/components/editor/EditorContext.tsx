'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { InvitationData } from '@/types/invitation'

export type PaletteKey = 'pink' | 'beige' | 'green' | 'gray' | 'purple'

type ListKey = 'gallery' | 'transport' | 'notices' | 'accounts'

type EditorContextValue = {
  data: InvitationData
  palette: PaletteKey
  isDirty: boolean
  setPalette: (p: PaletteKey) => void
  update: <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => void
  updateCouple: (patch: Partial<InvitationData['couple']>) => void
  updateCeremony: (patch: Partial<InvitationData['ceremony']>) => void
  toggleFeature: (key: keyof InvitationData['features'], value?: boolean) => void
  markSaved: () => void
  addItem: <K extends ListKey>(list: K, item: InvitationData[K][number]) => void
  updateItem: <K extends ListKey>(
    list: K,
    id: string,
    patch: Partial<InvitationData[K][number]>
  ) => void
  removeItem: (list: ListKey, id: string) => void
  moveItem: (list: ListKey, id: string, direction: 'up' | 'down') => void
}

const EditorContext = createContext<EditorContextValue | null>(null)

type ProviderProps = {
  initialData: InvitationData
  initialPalette?: PaletteKey
  children: ReactNode
}

export function EditorProvider({
  initialData,
  initialPalette = 'pink',
  children,
}: ProviderProps) {
  const [data, setData] = useState<InvitationData>(initialData)
  const [palette, setPalette] = useState<PaletteKey>(initialPalette)
  const [isDirty, setIsDirty] = useState(false)

  const update = useCallback(
    <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }))
      setIsDirty(true)
    },
    []
  )

  const updateCouple = useCallback((patch: Partial<InvitationData['couple']>) => {
    setData((prev) => ({ ...prev, couple: { ...prev.couple, ...patch } }))
    setIsDirty(true)
  }, [])

  const updateCeremony = useCallback((patch: Partial<InvitationData['ceremony']>) => {
    setData((prev) => ({ ...prev, ceremony: { ...prev.ceremony, ...patch } }))
    setIsDirty(true)
  }, [])

  const toggleFeature = useCallback(
    (key: keyof InvitationData['features'], value?: boolean) => {
      setData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [key]: value ?? !prev.features[key],
        },
      }))
      setIsDirty(true)
    },
    []
  )

  const handleSetPalette = useCallback((p: PaletteKey) => {
    setPalette(p)
    setIsDirty(true)
  }, [])

  const markSaved = useCallback(() => setIsDirty(false), [])

  const addItem = useCallback(
    <K extends ListKey>(list: K, item: InvitationData[K][number]) => {
      setData((prev) => ({
        ...prev,
        [list]: [...(prev[list] as InvitationData[K]), item],
      }))
      setIsDirty(true)
    },
    []
  )

  const updateItem = useCallback(
    <K extends ListKey>(
      list: K,
      id: string,
      patch: Partial<InvitationData[K][number]>
    ) => {
      setData((prev) => ({
        ...prev,
        [list]: (prev[list] as { id: string }[]).map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      }))
      setIsDirty(true)
    },
    []
  )

  const removeItem = useCallback((list: ListKey, id: string) => {
    setData((prev) => ({
      ...prev,
      [list]: (prev[list] as { id: string }[]).filter((item) => item.id !== id),
    }))
    setIsDirty(true)
  }, [])

  const moveItem = useCallback(
    (list: ListKey, id: string, direction: 'up' | 'down') => {
      setData((prev) => {
        const items = [...(prev[list] as { id: string }[])]
        const idx = items.findIndex((i) => i.id === id)
        if (idx === -1) return prev
        const target = direction === 'up' ? idx - 1 : idx + 1
        if (target < 0 || target >= items.length) return prev
        ;[items[idx], items[target]] = [items[target], items[idx]]
        return { ...prev, [list]: items }
      })
      setIsDirty(true)
    },
    []
  )

  const value = useMemo(
    () => ({
      data,
      palette,
      isDirty,
      setPalette: handleSetPalette,
      update,
      updateCouple,
      updateCeremony,
      toggleFeature,
      markSaved,
      addItem,
      updateItem,
      removeItem,
      moveItem,
    }),
    [
      data,
      palette,
      isDirty,
      handleSetPalette,
      update,
      updateCouple,
      updateCeremony,
      toggleFeature,
      markSaved,
      addItem,
      updateItem,
      removeItem,
      moveItem,
    ]
  )

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}
