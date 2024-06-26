import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/libs/prisma'

interface Params {
    params: { id: string }
}

// gets an individual note
export async function GET(request: Request, { params }: Params) {

    try {
        // findFirst obtain a single note
        const note = await prisma.note.findFirst({
            where: {
                id: Number(params.id)
            }
        })
        // if note not found then
        if (!note) {
            return NextResponse.json(
                { message: "note not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(note)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const deletedNote = await prisma.note.delete({
            where: {
                id: Number(params.id)
            }
        })
        if (!deletedNote) {
            return NextResponse.json(
                { message: "note not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(deletedNote)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === "P2025") {
                return NextResponse.json(
                    { message: "note not found" },
                    { status: 404 }
                )
            }
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    }
}

export async function PUT(request: Request, { params }: Params) {

    try {
        const { title, content } = await request.json()

        const updatedNote = await prisma.note.update({
            where: {
                id: Number(params.id)
            },
            data: {
                title,
                content,
            }
        })
        return NextResponse.json(updatedNote)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === "P2025") {
                return NextResponse.json(
                    { message: "note not found" },
                    { status: 404 }
                )
            }
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    }
}