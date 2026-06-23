import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email'),
  firstName: text('first_name'),
  username: text('username'),
  xp: integer('xp').default(0).notNull(),
  streak: integer('streak').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const vocabulary = pgTable('vocabulary', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  italian: text('italian').notNull(),
  ukrainian: text('ukrainian').notNull(),
  pronunciation: text('pronunciation'),
});

export const phrases = pgTable('phrases', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  italian: text('italian').notNull(),
  ukrainian: text('ukrainian').notNull(),
  pronunciation: text('pronunciation'),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
});

export const progress = pgTable('progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  lessonId: integer('lesson_id')
    .references(() => lessons.id)
    .notNull(),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
});

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  itemId: integer('item_id').notNull(), // ID of vocabulary or phrase
  itemType: varchar('item_type', { length: 50 }).notNull(), // 'vocabulary' or 'phrase'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  progress: many(progress),
  favorites: many(favorites),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
}));
