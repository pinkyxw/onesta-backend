import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const farmers = sqliteTable('farmers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});

// export const fields = sqliteTable('fields', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   location: text('location').notNull(),
//   farmerId: integer('farmer_id').notNull().references(() => farmers.id),
// }, (table) => ({
//   nameLocationUnique: primaryKey(table.name, table.location),
// }));

// export const fruits = sqliteTable('fruits', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull().unique(),
// });

// export const varieties = sqliteTable('varieties', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   fruitId: integer('fruit_id').notNull().references(() => fruits.id),
// }, (table) => ({
//   fruitVarietyUnique: primaryKey(table.name, table.fruitId),
// }));

// export const harvests = sqliteTable('harvests', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   date: text('date').notNull(),
//   amount: integer('amount').notNull(),
//   varietyId: integer('variety_id').notNull().references(() => varieties.id),
//   fieldId: integer('field_id').notNull().references(() => fields.id),
// });

// export const clients = sqliteTable('clients', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
// });
