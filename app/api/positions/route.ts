import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Position from '@/models/Position';

export async function GET() {
  try {
    await connectDB();
    const positions = await Position.find({ isActive: true })
      .sort({ title: 1 }); // Sort alphabetically
    
    return NextResponse.json(
      { success: true, data: positions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch positions',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Position title is required' },
        { status: 400 }
      );
    }

    // Check if position already exists (case-insensitive)
    const existingPosition = await Position.findOne({ 
      title: { $regex: new RegExp(`^${title.trim()}$`, 'i') },
    });

    if (existingPosition) {
      // If position exists but is inactive, reactivate it
      if (!existingPosition.isActive) {
        existingPosition.isActive = true;
        await existingPosition.save();
        return NextResponse.json(
          { success: true, data: existingPosition },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Position already exists' },
        { status: 400 }
      );
    }

    const position = await Position.create({
      title: title.trim(),
      isActive: true,
    });

    return NextResponse.json(
      { success: true, data: position },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create position',
      },
      { status: 500 }
    );
  }
}

