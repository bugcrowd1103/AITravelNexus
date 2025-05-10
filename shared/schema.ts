import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const earlyAccessSubscribers = pgTable("early_access_subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  receiveUpdates: boolean("receive_updates").default(true),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEarlyAccessSubscriberSchema = createInsertSchema(earlyAccessSubscribers).pick({
  name: true,
  email: true,
  receiveUpdates: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEarlyAccessSubscriber = z.infer<typeof insertEarlyAccessSubscriberSchema>;
export type EarlyAccessSubscriber = typeof earlyAccessSubscribers.$inferSelect;
