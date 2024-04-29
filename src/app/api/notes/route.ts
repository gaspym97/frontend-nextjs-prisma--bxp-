import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET() {

    const notes = await prisma.note.findMany()
    return NextResponse.json(notes)
}

export async function POST(request: Request) {

    // store the data in the expected properties
    const { title, content } = await request.json()

    // create new note
    const newNote = await prisma.note.create({
        data: {
            title,
            content
        }
    })
    return NextResponse.json(newNote)
}