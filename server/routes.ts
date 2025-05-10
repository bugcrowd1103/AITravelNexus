import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEarlyAccessSubscriberSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for early access email submissions
  app.post("/api/early-access", async (req, res) => {
    try {
      // Validate the request body using the insert schema
      const validatedData = insertEarlyAccessSubscriberSchema.parse(req.body);
      
      // Add current timestamp
      const subscriberData = {
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      // Store the subscriber data
      const result = await storage.createEarlyAccessSubscriber(subscriberData);
      
      res.status(201).json({
        success: true,
        message: "Successfully joined the early access waitlist",
        data: result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error saving early access subscriber:", error);
        res.status(500).json({
          success: false,
          message: "Failed to join waitlist. Please try again later."
        });
      }
    }
  });

  // API route to get count of subscribers (for admin purposes)
  app.get("/api/early-access/count", async (req, res) => {
    try {
      const count = await storage.getEarlyAccessSubscriberCount();
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      console.error("Error getting subscriber count:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve subscriber count"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
