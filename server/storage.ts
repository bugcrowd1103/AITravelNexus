import { users, type User, type InsertUser, type EarlyAccessSubscriber, type InsertEarlyAccessSubscriber } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Early access subscribers methods
  createEarlyAccessSubscriber(subscriber: InsertEarlyAccessSubscriber & { createdAt: string }): Promise<EarlyAccessSubscriber>;
  getEarlyAccessSubscriberByEmail(email: string): Promise<EarlyAccessSubscriber | undefined>;
  getEarlyAccessSubscriberCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private earlyAccessSubscribers: Map<number, EarlyAccessSubscriber>;
  currentId: number;
  currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.earlyAccessSubscribers = new Map();
    this.currentId = 1;
    this.currentSubscriberId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createEarlyAccessSubscriber(
    subscriberData: InsertEarlyAccessSubscriber & { createdAt: string }
  ): Promise<EarlyAccessSubscriber> {
    // Check if email already exists
    const existingSubscriber = await this.getEarlyAccessSubscriberByEmail(subscriberData.email);
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.currentSubscriberId++;
    
    // Create a properly typed subscriber object
    const subscriber: EarlyAccessSubscriber = { 
      id,
      name: subscriberData.name,
      email: subscriberData.email,
      receiveUpdates: subscriberData.receiveUpdates === undefined ? true : subscriberData.receiveUpdates,
      createdAt: subscriberData.createdAt
    };
    
    this.earlyAccessSubscribers.set(id, subscriber);
    return subscriber;
  }
  
  async getEarlyAccessSubscriberByEmail(email: string): Promise<EarlyAccessSubscriber | undefined> {
    return Array.from(this.earlyAccessSubscribers.values()).find(
      (subscriber) => subscriber.email === email
    );
  }
  
  async getEarlyAccessSubscriberCount(): Promise<number> {
    return this.earlyAccessSubscribers.size;
  }
}

export const storage = new MemStorage();
