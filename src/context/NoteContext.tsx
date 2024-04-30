"use client"
import { createContext, useContext, useState } from 'react'
import { CreateNote } from '@/interfaces/interfaces'
import { Note } from '@prisma/client'

export const NoteContext = createContext<{
    notes: Note[],
    selectedNote: Note | null,
    setSelectedNote: (note: Note | null) => void,
    loadNotes: () => Promise<void>,
    createNote: (note: CreateNote) => Promise<void>,
    deleteNote: (id: number) => Promise<void>,
}>({
    notes: [],
    selectedNote: null,
    setSelectedNote: (note: Note | null) => { },
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
    // if you click on the edit button, this selectedNote
    // is stored with the note you want to edit
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

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
        <NoteContext.Provider value={{ notes, selectedNote, setSelectedNote, loadNotes, createNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
    )
}