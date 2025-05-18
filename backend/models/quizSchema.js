import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 4;
        },
        message: 'Questions must have exactly 4 options.',
      },
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return this.options.includes(v);
        },
        message: 'Answer must be one of the provided options.',
      },
    },
    division: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);