import { promises as fs } from "node:fs";
import path from "node:path";

import type { Order } from "../types";

const DB_PATH = path.join(process.cwd(), "db", "data.json");


class OrderService {
  private async readData(): Promise<Order[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private async writeData(data: Order[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async create(order: Omit<Order, "id">) {
    const data = await this.readData();

    const newOrder: Order = {
      ...order,
      id: String(Math.random() * 100),
    };

    data.push(newOrder);

    await this.writeData(data);
  }

  async get(): Promise<Order[]> {
    const data = await this.readData();
    return data;
  }

  async getById(id: string): Promise<Order | null> {
    const data = await this.readData();
    return data.find((order) => order.id === id) || null;
  }

  async update(id: string, updates: Partial<Omit<Order, "id">>): Promise<Order | null> {
    const data = await this.readData();

    const index = data.findIndex((order) => order.id === id);

    if (index === -1) return null;

    data[index] = { ...data[index], ...updates } as Order;
    await this.writeData(data);
    return data[index];
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.readData();
    const index = data.findIndex((order) => order.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    await this.writeData(data);
    return true;
  }
}

export const orderService = new OrderService();