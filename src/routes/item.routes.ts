import { Router } from 'express';
import ItemController from '../controllers/item.controller';
import { auth } from '../middlewares/auth';
import Guard from '../middlewares/guard';
import { Role } from '../types/enums';

const router = Router();
const guard = Guard.getInstance();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.create
);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getAll
);

// Custom routes
/**
 * @swagger
 * /api/items/not-expired:
 *   get:
 *     summary: Get all not expired items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all not expired items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/not-expired',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getNotExpired
);

/**
 * @swagger
 * /api/items/expired:
 *   get:
 *     summary: Get all expired items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all expired items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/expired',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getExpired
);

/**
 * @swagger
 * /api/items/daily-reminders:
 *   get:
 *     summary: Get all daily reminder items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all daily reminder items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/daily-reminders',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getDailyReminders
);

// Statistics routes
/**
 * @swagger
 * /api/items/stats/category-percentages:
 *   get:
 *     summary: Get category percentages
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category percentages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   percentage:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/stats/category-percentages',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getCategoryPercentages
);

/**
 * @swagger
 * /api/items/stats/expired-by-month:
 *   get:
 *     summary: Get expired items by month
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expired items by month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: number
 *                   count:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/stats/expired-by-month',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getExpiredByMonth
);

/**
 * @swagger
 * /api/items/stats/most-frequent-expired:
 *   get:
 *     summary: Get most frequent expired items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Most frequent expired items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 count:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/stats/most-frequent-expired',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getMostFrequentExpired
);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/:id',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.getById
);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/:id',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.update
);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item was successfully deleted
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/:id',
  auth,
  guard.authorize([Role.ADMIN, Role.USER]),
  ItemController.delete
);

export default router;
