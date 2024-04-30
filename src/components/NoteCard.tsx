import { GET } from '@/app/api/notes/route'
import { Note } from '@/interfaces/interfaces'

function NoteCard({ note }: { note: Note }) {

    // function to delete each note
    async function deleteNote(id: string) {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div key={note.id} className='bg-slate-400 p-4 my-2 flex justify-between'>
            <div>
                <h1 className='text-xl font-bold'>{note.title}</h1>
                <p>{note.content}</p>
            </div>
            <div className='flex gap-x-2'>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    )
}
export default NoteCard