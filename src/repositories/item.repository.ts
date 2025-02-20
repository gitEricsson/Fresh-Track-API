import Item, { ItemDocument } from '../models/item.model';
import { Types } from 'mongoose';

class ItemRepository {
  private static instance: ItemRepository;

  static getInstance(): ItemRepository {
    if (!this.instance) {
      this.instance = new ItemRepository();
    }
    return this.instance;
  }

  async create(item: Partial<ItemDocument>): Promise<ItemDocument> {
    return await Item.create(item);
  }

  async getAll(userId: string): Promise<ItemDocument[]> {
    return await Item.find({ userId });
  }

  async getById(userId: string, id: string): Promise<ItemDocument | null> {
    return await Item.findOne({ _id: id, userId });
  }

  async update(
    userId: string,
    id: string,
    data: Partial<ItemDocument>
  ): Promise<ItemDocument | null> {
    return await Item.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
    });
  }

  async delete(userId: string, id: string): Promise<ItemDocument | null> {
    return (await Item.findOneAndDelete({
      _id: id,
      userId,
    })) as unknown as ItemDocument | null;
  }

  async getNotExpired(userId: string): Promise<ItemDocument[]> {
    return await Item.find({ userId, expiryDate: { $gt: new Date() } });
  }

  async getExpired(userId: string): Promise<ItemDocument[]> {
    return await Item.find({ userId, expiryDate: { $lte: new Date() } });
  }

  async getDailyReminders(userId: string): Promise<ItemDocument[]> {
    return await Item.find({ userId, dailyReminder: true });
  }

  async getCategoryPercentages(
    userId: string
  ): Promise<{ category: string; percentage: number }[]> {
    const objectIdUserId = new Types.ObjectId(userId);
    const totalItems = await Item.countDocuments({ userId: objectIdUserId });
    return await Item.aggregate([
      { $match: { userId: objectIdUserId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      {
        $project: {
          category: '$_id',
          percentage: { $multiply: [{ $divide: ['$count', totalItems] }, 100] },
        },
      },
    ]);
  }

  async getExpiredByMonth(
    userId: string
  ): Promise<{ _id: number; count: number }[]> {
    const objectIdUserId = new Types.ObjectId(userId);
    return await Item.aggregate([
      { $match: { userId: objectIdUserId, expiryDate: { $lte: new Date() } } },
      { $group: { _id: { $month: '$expiryDate' }, count: { $sum: 1 } } },
    ]);
  }

  async getMostFrequentExpired(
    userId: string
  ): Promise<{ _id: string; count: number }[]> {
    const objectIdUserId = new Types.ObjectId(userId);

    return await Item.aggregate([
      { $match: { userId: objectIdUserId, expiryDate: { $lte: new Date() } } },
      { $group: { _id: '$itemName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
  }
}

export default ItemRepository.getInstance();
