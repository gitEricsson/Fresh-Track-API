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
    user:
      AppConfig.brevo.username ||
      (() => {
        throw new Error('Brevo username is not set in the configuration');
      })(),
    pass:
      AppConfig.brevo.password ||
      (() => {
        throw new Error('Brevo password is not set in the configuration');
      })(),
  },
});

cron.schedule('0 9 * * *', async () => {
  try {
    console.log('Reminder job started');
    const items = await Item.aggregate([
      {
        $match: {
          dailyReminder: true,
          expiryDate: { $lte: new Date() },
        },
      },
      {
        $group: {
          _id: '$userId',
          items: { $push: '$$ROOT' },
        },
      },
    ]);

    for (const userItems of items) {
      const user = await userRepository.findById(userItems._id.toString());

      if (!user) {
        console.error(`User not found for ID: ${userItems._id}`);
        continue;
      }

      const userEmail = user.email;
      const itemList = userItems.items
        .map(
          (item: ItemDocument) =>
            `Item: ${item.itemName}, Category: ${
              item.category
            }, Expiry Date: ${item.expiryDate.toDateString()}`
        )
        .join('\n');

      await transporter.sendMail({
        from: '"Food Expiry Tracker" <noreply@ericsson.com>',
        to: userEmail,
        subject: 'Reminder: Items expiring soon!',
        text: `The following items are expiring soon:\n\n${itemList}\n\n\nThis is an automated message. Please do not reply.`,
      });

      console.log(`Reminder email sent to ${userEmail}`);
    }

    console.log('Reminder job completed');
  } catch (error) {
    console.error('Error in reminder job:', error);
  }
});
