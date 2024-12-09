import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

//Get Specific Product
export function GET(
  request: NextRequest,
  { params } : { params: { id: number }}) {
    // Hard code id breakpoint
    if (params.id > 10)
      return NextResponse.json({ error: 'Product not found'}, { status: 404 });
    return NextResponse.json({id: 1, name: 'Milk', price: 2.5})
  }

// Update Product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number}}) {
    const body = await request.json();
    const validation = schema.safeParse(body)

    // Zod validation Name, Price
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400})

    // No product ID found, hard code id breakpoint
    if (params.id > 10)
      return NextResponse.json({error: 'Product not found'}, {status: 400})

    // No validation error, update product (hard coded)
    return NextResponse.json({ id: 1, name: body.name, price: body.price})

  }

// Delete product
export function DELETE(
  request: NextRequest,
  { params } : { params: { id: number}}) {
    // hard limit for existing id
    if (params.id > 10)
      return NextResponse.json({error: 'Product not found'}, {status: 404})

    // Product found delete it
    return NextResponse.json({ message: 'Product Deleted'})
  }

