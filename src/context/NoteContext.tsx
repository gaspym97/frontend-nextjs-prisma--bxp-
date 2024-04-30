"use client"
import { createContext, useContext, useState } from 'react'
import { Note } from '@/interfaces/interfaces'

export const NoteContext = createContext<{
    notes: any[],
    loadNotes: () => Promise<void>,
    createNote: (note: Note) => Promise<void>,
}>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (note: Note) => { }
})

export const useNotes = () => {
    const context = useContext(NoteContext)
    if (!context) {
        throw new Error('useNotes must be used inside a NotesProvider')
    }
    return context
}

// Provider
export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<any[]>([])

    async function loadNotes() {
        const res = await fetch("api/notes")
        const data = await res.json()
        setNotes(data)
    }

    async function createNote(note: Note) {
        const res = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const newNote = await res.json()
        console.log(newNote)
        setNotes([...notes, newNote])
    }

    return (
        <NoteContext.Provider value={{ notes, loadNotes, createNote }}>
            {children}
        </NoteContext.Provider>
    )
}