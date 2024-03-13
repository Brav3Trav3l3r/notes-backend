import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'Passwords do no match',
    },
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

UserSchema.methods.comparePasswords = async function (
  userProvided,
  hashStored,
) {
  console.log(userProvided, hashStored);
  return await bcrypt.compare(userProvided, hashStored);
};

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  comparePasswords: (pass: string, hash: string) => boolean;
}
