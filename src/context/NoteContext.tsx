"use client"
import { createContext, useContext, useState } from 'react'
import { CreateNote } from '@/interfaces/interfaces'
import { Note } from '@prisma/client'

export const NoteContext = createContext<{
    notes: Note[],
    loadNotes: () => Promise<void>,
    createNote: (note: CreateNote) => Promise<void>,
    deleteNote: (id: number) => Promise<void>,
}>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (note: CreateNote) => { },
    deleteNote: async (id: number) => { }
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
    const [notes, setNotes] = useState<Note[]>([])

    async function loadNotes() {
        const res = await fetch("api/notes")
        const data = await res.json()
        setNotes(data)
    }

    async function createNote(note: CreateNote) {
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

    async function deleteNote(id: number) {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        // logic to delete notes
        // conserve all notes different to the given argument
        setNotes(notes.filter((note) => note.id != id))
    }

    return (
        <NoteContext.Provider value={{ notes, loadNotes, createNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
    )
}