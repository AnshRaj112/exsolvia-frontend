import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  image: string; // Cloudinary link
  githubLink?: string;
  linkedinLink?: string;
  fact: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TeamMemberSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    linkedinLink: {
      type: String,
      trim: true,
    },
    fact: {
      type: String,
      required: [true, 'Fact is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember;

