import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";


export function GET(request: NextRequest) {
  // Fetch users from fake "DB"
  return NextResponse.json([
    {id: 1, name: 'milk', price: 2.5},
    {id: 2, name: 'bread', price: 3.5},
  ])
}

// Create product
export async function POST(request : NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  //Zod validation
  if(!validation.success) 
    return NextResponse.json(validation.error.errors, { status : 400})
  
  // Id would be generated by DB
  return NextResponse.json({ id: 1, name: body.name, price: body.price }, { status : 201 })
}

