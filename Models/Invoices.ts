// create a new model for the invoices
// code ?

import { Schema, model } from 'mongoose';

const invoicesSchema = new Schema({
  fileUrl : {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  isPayed: {
    type: String,
    default: false,
  },
  salary:{
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('invoices', invoicesSchema);