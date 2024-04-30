"use client"
import { createContext, useContext, useState } from 'react'
import { CreateNote, UpdateNote } from '@/interfaces/interfaces'
import { Note } from '@prisma/client'
import { Update } from 'next/dist/build/swc'

export const NoteContext = createContext<{
    notes: Note[],
    selectedNote: Note | null,
    setSelectedNote: (note: Note | null) => void,
    loadNotes: () => Promise<void>,
    createNote: (note: CreateNote) => Promise<void>,
    deleteNote: (id: number) => Promise<void>,
    updateNote: (id: number, note: UpdateNote) => Promise<void>,
}>({
    notes: [],
    selectedNote: null,
    setSelectedNote: (note: Note | null) => { },
    loadNotes: async () => { },
    createNote: async (note: CreateNote) => { },
    deleteNote: async (id: number) => { },
    updateNote: async (id: number, note: UpdateNote) => { }
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
        const res = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        // logic to delete notes
        // conserve all notes different to the given argument
        setNotes(notes.filter((note) => note.id != id))
    }

    async function updateNote(id: number, note: UpdateNote) {
        const res = await fetch(`api/notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setNotes(notes.map(note => note.id === id ? data : note))
    }

    return (
        <NoteContext.Provider
            value={{
                notes, selectedNote, setSelectedNote, loadNotes, createNote, deleteNote, updateNote
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}