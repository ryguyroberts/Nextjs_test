import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
 const users = await prisma.user.findMany()
  // Fetch users from a db
  return NextResponse.json(users);
}

// Create function
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  // Zod validation
  if(!validation.success)
    return NextResponse.json(validation.error.errors, { status : 400 })

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if(user)
    return NextResponse.json({ error: 'User already exists'}, { status: 400 })

  // Create user with Prisma
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email
    }
  })

  return NextResponse.json(newUser, { status: 201 })
}