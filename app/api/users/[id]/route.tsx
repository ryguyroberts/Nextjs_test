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
  { params }: { params: { id: string}}) {
    const body = await request.json();
    // No name validation
    const validation = schema.safeParse(body)

    // Zod validation
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400})

    // Check user ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id)}
    })

    if (!user)
      return NextResponse.json({ error: 'User not found'}, { status: 400})
    
    // update in Prisma
    const updatedUser = await prisma.user.update({
      where: { id: user.id},
      data: {
        name: body.name,
        email: body.email
      }
    })

    return NextResponse.json(updatedUser)
  }

  // Delete a user
  export async function DELETE(
    request: NextRequest,
  { params }: { params: { id: string}}) {
    // Check user ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id)}
    })

    if (!user)
      return NextResponse.json({ error : 'User not found'}, { status: 404 })

    // user found -> delete em
    await prisma.user.delete({
      where: { id: user.id}
    })

    return NextResponse.json({ message: "user deleted"})
  }