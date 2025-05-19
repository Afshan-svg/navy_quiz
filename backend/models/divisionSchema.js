import mongoose from 'mongoose';

const divisionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      data: Buffer, 
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Division', divisionSchema);