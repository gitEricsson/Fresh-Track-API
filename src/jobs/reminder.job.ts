import cron from 'node-cron';
import Item from '../models/item.model';
import nodemailer from 'nodemailer';
import AppConfig from '../config/app.config';
import { ItemDocument } from '../models/item.model';
import userRepository from '../repositories/user.repository';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 2525,
  secure: false,
  auth: {
    user: AppConfig.brevo.username ?? '',
    pass: AppConfig.brevo.password ?? '',
  },
});

cron.schedule('0 9 * * *', async () => {
  const items: ItemDocument[] = await Item.find({
    dailyReminder: true,
    expiryDate: { $lte: new Date() },
  }).populate('userId', 'email');

  for (const item of items) {
    const user = await userRepository.findById(item.userId.toString());

    if (!user) {
      throw new Error('User not found');
    }

    const userEmail = user.email;
    await transporter.sendMail({
      from: '"Food Expiry Tracker" <noreply@example.com>',
      to: userEmail,
      subject: `Reminder: ${item.itemName} is expiring soon!`,
      text: `Your item "${item.itemName}" in category "${
        item.category
      }" is expiring on ${item.expiryDate.toDateString()}. Please take action.`,
    });
  }
});
