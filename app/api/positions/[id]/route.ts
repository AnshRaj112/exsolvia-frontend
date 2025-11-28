import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Position from '@/models/Position';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;

    // Instead of deleting, we'll deactivate the position
    const position = await Position.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Position not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: position },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete position',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    const { title, isActive } = body;

    const updateData: { title?: string; isActive?: boolean } = {};
    if (title !== undefined) {
      updateData.title = title.trim();
    }
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    const position = await Position.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Position not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: position },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating position:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update position',
      },
      { status: 500 }
    );
  }
}

