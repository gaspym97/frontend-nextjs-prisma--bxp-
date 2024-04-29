import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET() {
    try {
        const notes = await prisma.note.findMany()
        return NextResponse.json(notes)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    }
}

export async function POST(request: Request) {

    try {
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
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    }
}