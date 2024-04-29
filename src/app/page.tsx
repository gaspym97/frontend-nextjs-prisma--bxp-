async function loadNotes() {
  const res = await fetch("http://localhost:3000/api/notes")
  const data = await res.json()
  return data
}
async function HomePage() {
  const notes = await loadNotes()

  return (
    <>
      <div>
        {
          notes.map((note) => (
            <div key={note.id}>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default HomePage