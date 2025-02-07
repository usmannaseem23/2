import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client'; // Corrected import
import { OrderData } from '../../../../type'; // Define your types for order data

// Handle the POST request to save the order
export async function POST(req: Request) {
  try {
    const data: OrderData = await req.json(); // Parse JSON from the request body

    const { fullName, email, address, phone, totalAmount, products } = data;

    // Validate input
    if (!fullName || !email || !address || !phone || !totalAmount || !products || products.length === 0) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save the order in Sanity
    const order = await client.create({
      _type: 'order',
      fullName,
      email,
      address,
      phone,
      totalAmount,
      products,
    });

    return NextResponse.json(
      { message: 'Order created successfully', order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}
