import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
  text,
  json,
  boolean,
  decimal,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 55 }).notNull(),
  email: varchar('email', { length: 55 }).unique().notNull(),
  password: varchar('password', { length: 300 }).notNull(),
  role: varchar('role', { length: 8, enum: ['user', 'admin'] }).notNull(),
  createdAt: date('createdAt').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 55 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 300 }),
  category: varchar('category', { length: 55 }).notNull(),
  price: integer('price').notNull(),
  description: text('description'),
  addedBy: integer('addedBy').references(() => users.id),
});

export const productsInsertSchema = createInsertSchema(products);
export const productsSelectSchema = createSelectSchema(products);

export const plants = pgTable('plants', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 30 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }),
  optimalWater: integer('optimalWater'),
  optimalHumidity: integer('optimalHumidity'),
  optimalSunlight: integer('optimalSunlight'),
  health: integer('health'),
  ownerID: integer('ownerID').references(() => users.id),
});
export const plantsInsertSchema = createInsertSchema(plants);
export const plantsSelectSchema = createSelectSchema(plants);

export const orders = pgTable('orders', {
  orderID: serial('orderID').primaryKey().notNull(),
  orderBy: integer('orderBy').references(() => users.id),
  orderDetails:
    json('orderDetails').$type<
      { name: string; count: number; id: number; price: number }[]
    >(),
  orderDate: date('orderDate').defaultNow(),
  status: varchar('status', {
    enum: ['processing', 'cancelled', 'confirmed', 'delivering', 'delivered'],
    length: 20,
  }).default('processing'),
  amountTotal: integer('amountTotal').notNull(),
  paid: boolean('paid').default(false),
});

export const orderInsertSchema = createInsertSchema(orders, {
  orderDetails: z.array(
    z.object({
      name: z.string(),
      count: z.number().min(0),
      id: z.number(),
      price: z.number().min(0),
    })
  ),
});
export const orderSelectSchema = createSelectSchema(orders);

export const environmentStatus = pgTable('environmentStatus', {
  temperature: decimal('temperature').notNull(),
  humidity: decimal('humidity').notNull(),
  sunlight: decimal('sunlight').notNull(),
});
