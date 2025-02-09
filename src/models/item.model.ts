import mongoose, { Document, Schema } from 'mongoose';
import { Category } from '../types/enums';

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - itemName
 *         - category
 *         - expiryDate
 *         - userId
 *       properties:
 *         itemName:
 *           type: string
 *           description: The name of the item
 *         category:
 *           type: string
 *           description: The category of the item
 *         expiryDate:
 *           type: string
 *           format: date
 *           description: The expiry date of the item
 *         datePurchased:
 *           type: string
 *           format: date
 *           description: The date the item was purchased
 *         notes:
 *           type: string
 *           description: Additional notes about the item
 *         dailyReminder:
 *           type: boolean
 *           description: Whether to send daily reminders for the item
 *       example:
 *         itemName: Milk
 *         category: Bakery
 *         expiryDate: 2023-10-10
 *         datePurchased: 2023-09-10
 *         notes: Organic
 *         dailyReminder: false
 */

export interface ItemDocument extends Document {
  itemName: string;
  category: string;
  expiryDate: Date;
  datePurchased?: Date;
  notes?: string;
  userId: mongoose.Types.ObjectId;
  dailyReminder: boolean;
}

const ItemSchema: Schema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: Object.values(Category), required: true },
  expiryDate: { type: Date, required: true },
  datePurchased: { type: Date },
  notes: { type: String },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  dailyReminder: { type: Boolean, default: false },
});

const Item = mongoose.model<ItemDocument>('Item', ItemSchema);

export default Item;
