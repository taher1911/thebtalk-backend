// create a new model for the user
// code ?

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profileImage : {
    type: String,
  },
  requestNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  code : {
    type: String,
    length: 4,
  },
  inviteNumber : 
  {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('User', userSchema);