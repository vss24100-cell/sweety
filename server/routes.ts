import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.wishes.list.path, async (req, res) => {
    const wishes = await storage.getWishes();
    res.json(wishes);
  });

  app.post(api.wishes.create.path, async (req, res) => {
    try {
      const input = api.wishes.create.input.parse(req.body);
      const wish = await storage.createWish(input);
      res.status(201).json(wish);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
