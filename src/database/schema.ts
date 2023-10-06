import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

// TABLE: --------- USERS ----------
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  phone: text('phone'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TABLE: --------- POSTS ----------
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  content: text('content'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
});
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// TABLE: --------- NOTES ----------
export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updateAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`
  ),
});
export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;
