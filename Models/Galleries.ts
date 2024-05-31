// create a new model for the gallery
// code ?

import { Schema, model } from 'mongoose';

const gallerySchema = new Schema({
  fileUrl : {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('gallery', gallerySchema);