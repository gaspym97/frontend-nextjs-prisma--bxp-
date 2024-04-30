"use client"
import NoteForm from '@/components/NoteForm'
import { useNotes } from '@/context/NoteContext'
import { useEffect } from 'react'

function HomePage() {
  const { notes, loadNotes } = useNotes()

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div>
          <NoteForm />
          {notes.map((note) => (
            <div key={note.id} className='bg-slate-400 p-4 my-2'>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default HomePage