import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  // Fetch users from a db
  return NextResponse.json([
    { id: 1, name: 'Ryan'},
    { id: 2, name: 'John'},
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if(!body.name)
    return NextResponse.json({error: 'Name is required'}, { status : 400 })

  // Id would come from DB
  return NextResponse.json({ id: 1, name: body.name}, { status: 201 })
}