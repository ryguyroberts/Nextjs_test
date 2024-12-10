import { NextRequest, NextResponse, userAgent } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

//Get Specific Product
export async function GET(
  request: NextRequest,
  { params } : { params: { id: string }}) {
    
    //find product id w/ prisma
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!product)
      return NextResponse.json({ error: 'Product not found'}, { status: 404 });
    return NextResponse.json(product);
  }


  

// Update Product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string}}) {
    const body = await request.json();
    const validation = schema.safeParse(body)

    // Zod validation Name, Price
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400})

    // find product w/ prisma
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id)}
    });


    // No product ID found, hard code id breakpoint
    if (!product)
      return NextResponse.json({error: 'Product not found'}, {status: 400})

    // No validation error, update product
    const updatedProduct = await prisma.product.update({
      where: { id : product.id},
      data: {
        name : body.name,
        price: body.price
      }
    });

    return NextResponse.json(updatedProduct);
  }

// Delete product
export async function DELETE(
  request: NextRequest,
  { params } : { params: { id: string}}) {

    //Check product ID
    const product = await prisma.product.findUnique({
      where: {id : parseInt(params.id)}
    });

    if (!product)
      return NextResponse.json({error: 'Product not found'}, {status: 404});

    // Product found delete it
    await prisma.product.delete({
      where: { id: product.id}
    });

    return NextResponse.json({ message: 'Product Deleted'});
  }

