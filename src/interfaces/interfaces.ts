export interface Note {
    id: string,
    title: string,
    content: string
}

export type CreateNote = Omit<Note, 'id'>