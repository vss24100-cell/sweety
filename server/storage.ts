import { db } from "./db";
import {
  wishes,
  type Wish,
  type InsertWish,
} from "@shared/schema";

export interface IStorage {
  getWishes(): Promise<Wish[]>;
  createWish(wish: InsertWish): Promise<Wish>;
}

export class DatabaseStorage implements IStorage {
  async getWishes(): Promise<Wish[]> {
    return await db.select().from(wishes).orderBy(wishes.createdAt);
  }

  async createWish(insertWish: InsertWish): Promise<Wish> {
    const [wish] = await db.insert(wishes).values(insertWish).returning();
    return wish;
  }
}

export const storage = new DatabaseStorage();
