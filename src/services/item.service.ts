import mongoose from 'mongoose';
import ItemRepository from '../repositories/item.repository';
import { ItemDocument } from '../models/item.model';

class ItemService {
  async create(userId: string, data: Partial<ItemDocument>) {
    return ItemRepository.create({
      ...data,
      userId: new mongoose.Types.ObjectId(userId),
    });
  }

  async getAll(userId: string) {
    return ItemRepository.getAll(userId);
  }

  async getById(userId: string, id: string) {
    return ItemRepository.getById(userId, id);
  }

  async update(userId: string, id: string, data: Partial<ItemDocument>) {
    return ItemRepository.update(userId, id, data);
  }

  async delete(userId: string, id: string) {
    return ItemRepository.delete(userId, id);
  }

  async getNotExpired(userId: string) {
    return ItemRepository.getNotExpired(userId);
  }

  async getExpired(userId: string) {
    return ItemRepository.getExpired(userId);
  }

  async getDailyReminders(userId: string) {
    return ItemRepository.getDailyReminders(userId);
  }

  async getCategoryPercentages(userId: string) {
    return ItemRepository.getCategoryPercentages(userId);
  }

  async getExpiredByMonth(userId: string) {
    return ItemRepository.getExpiredByMonth(userId);
  }

  async getMostFrequentExpired(userId: string) {
    return ItemRepository.getMostFrequentExpired(userId);
  }
}

export default new ItemService();
