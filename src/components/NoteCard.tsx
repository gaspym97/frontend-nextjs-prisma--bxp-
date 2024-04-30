import { Note } from '@/interfaces/interfaces'

function NoteCard({ note }: { note: Note }) {
    return (
        <div key={note.id} className='bg-slate-400 p-4 my-2 flex justify-between'>
            <div>
                <h1 className='text-xl font-bold'>{note.title}</h1>
                <p>{note.content}</p>
            </div>
            <div className='flex gap-x-2'>
                <button
                    onClick={() => {
                        console.log('clicked')
                    }}
                >
                    Delete
                </button>
                <button>Edit</button>
            </div>
        </div>
    )
}
export default NoteCard