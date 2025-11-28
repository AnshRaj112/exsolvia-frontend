import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      name,
      email,
      phone,
      position,
      resume,
      coverLetter,
      portfolio,
      linkedin,
      github,
      message,
    } = body;

    // Validate required fields
    if (!name || !email || !position) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and position are required' },
        { status: 400 }
      );
    }

    // Create new application
    const application = await Application.create({
      name,
      email,
      phone,
      position,
      resume,
      coverLetter,
      portfolio,
      linkedin,
      github,
      message,
      status: 'pending',
    });

    return NextResponse.json(
      { success: true, data: application },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit application',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const applications = await Application.find({})
      .sort({ createdAt: -1 }); // Most recent first
    
    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch applications',
      },
      { status: 500 }
    );
  }
}

