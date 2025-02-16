import { Response } from 'express';
import ItemService from '../services/item.service';
import { AuthRequest } from '../middlewares/auth';

class ItemController {
  async create(req: AuthRequest, res: Response) {
    try {
      const item = await ItemService.create(req.user.id, req.body);
      res.status(201).json(item);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: AuthRequest, res: Response) {
    try {
      const items = await ItemService.getAll(req.user.id);
      res.status(200).json(items);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const item = await ItemService.getById(req.user.id, req.params.id);
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json(item);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const item = await ItemService.update(
        req.user.id,
        req.params.id,
        req.body
      );
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json(item);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const item = await ItemService.delete(req.user.id, req.params.id);
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getNotExpired(req: AuthRequest, res: Response) {
    try {
      const items = await ItemService.getNotExpired(req.user.id);
      res.status(200).json(items);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getExpired(req: AuthRequest, res: Response) {
    try {
      const items = await ItemService.getExpired(req.user.id);
      res.status(200).json(items);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getDailyReminders(req: AuthRequest, res: Response) {
    try {
      const items = await ItemService.getDailyReminders(req.user.id);
      res.status(200).json(items);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getCategoryPercentages(req: AuthRequest, res: Response) {
    try {
      const stats = await ItemService.getCategoryPercentages(req.user.id);
      res.status(200).json(stats);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getExpiredByMonth(req: AuthRequest, res: Response) {
    try {
      const stats = await ItemService.getExpiredByMonth(req.user.id);
      res.status(200).json(stats);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getMostFrequentExpired(req: AuthRequest, res: Response) {
    try {
      const stats = await ItemService.getMostFrequentExpired(req.user.id);
      res.status(200).json(stats);
    } catch (error: unknown) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new ItemController();
