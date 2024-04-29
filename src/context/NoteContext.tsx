'use client'
import { createContext } from 'react'

const NoteContext = createContext({})

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    return <NoteContext.Provider key={{}}>{children}</NoteContext.Provider>
}
