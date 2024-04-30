import { Note } from '@prisma/client'

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>

// all data types will be optional
export type UpdateNote = Partial<CreateNote>