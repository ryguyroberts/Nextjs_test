import { NextRequest, NextResponse } from "next/server";

export function GET(
  request : NextRequest,
  { params }: { params: { id: number}}) {
    if (params.id > 10)
      return NextResponse.json({ error: 'User not Found'}, { status: 404});
    return NextResponse.json({id: 1, name: 'Ryan'});
  }


// Update Function
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number}}) {
    const body = await request.json();
    // No name validation
    if (!body.name)
      return NextResponse.json({ error: 'Name is required'}, { status: 400})

    // No matching id (Hard limit with no real DB)
    if (params.id > 10)
      return NextResponse.json({ error: 'User not found'}, { status: 400})

    return NextResponse.json({ id: 1, name: body.name})
  }