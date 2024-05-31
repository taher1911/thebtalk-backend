// create a new model for the notification
// code ?

import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model('notification', notificationSchema);