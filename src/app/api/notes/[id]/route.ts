import { NextResponse } from 'next/server'

interface Params {
    params: { id: string }
}

// gets an individual note
export async function GET(request: Request, { params }: Params) {

    try {
        // findFirst obtain a single note
        const note = await prisma?.note.findFirst({
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
        const note = await prisma?.note.delete({
            where: {
                id: Number(params.id)
            }
        })
        if (!note) {
            return NextResponse.json(
                { message: "note not found" },
                { status: 404 }
            )
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            )
        }
    }
}

export function PUT() {
    return NextResponse.json({
        message: "updating specific note"
    })
}