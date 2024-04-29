import { NextResponse } from 'next/server'

export function GET() {
    return NextResponse.json({
        message: "getting individual note"
    })
}

export function DELETE() {
    return NextResponse.json({
        message: "deleting specific note"
    })
}

export function PUT() {
    return NextResponse.json({
        message: "updating specific note"
    })
}