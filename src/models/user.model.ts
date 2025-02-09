import mongoose, { Document, Schema } from 'mongoose';
import { Role } from '../types/enums';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           enum:
 *             - User
 *             - Admin
 *           description: The user's role
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         role: User
 */

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: Role;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true,
    default: Role.USER,
  },
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
