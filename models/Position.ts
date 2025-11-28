import mongoose, { Schema, Document } from 'mongoose';

export interface IPosition extends Document {
  title: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PositionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Position title is required'],
      trim: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.models.Position || mongoose.model<IPosition>('Position', PositionSchema);

export default Position;

