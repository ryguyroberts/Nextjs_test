import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";


export async function GET(
  request : NextRequest,
  { params }: { params: { id: string}}) {

    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!user)
      return NextResponse.json({ error: 'User not Found'}, { status: 404});
    return NextResponse.json(user);
  }


// Update Function
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number}}) {
    const body = await request.json();
    // No name validation
    const validation = schema.safeParse(body)

    // Zod validation
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400})

    // // No matching id (Hard limit with no real DB)
    if (params.id > 10)
      return NextResponse.json({ error: 'User not found'}, { status: 400})

    return NextResponse.json({ id: 1, name: body.name})
  }

  // Delete a user
  export function DELETE(
    request: NextRequest,
  { params }: { params: { id: number}}) {
    // In real DB check for user, hard limit
    if (params.id > 10)
      return NextResponse.json({ error : 'User not found'}, { status: 404 })

    // user found -> delete em
    return NextResponse.json({ message: 'User deleted'})
  }