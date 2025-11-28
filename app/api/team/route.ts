import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET() {
  try {
    await connectDB();
    const teamMembers = await TeamMember.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: teamMembers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

