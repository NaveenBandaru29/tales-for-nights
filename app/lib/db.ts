import { Tale, User } from '../types';
import TaleModel from '../models/Tale';
import UserModel from '../models/User';

// In a real application, you would use a proper database
// This is a simple in-memory database for demonstration purposes
class Database {
  private tales: Tale[] = [];
  private users: User[] = [];

  constructor() {
    // Initialize with some demo data
    this.seedData();
  }

  private seedData() {
    // Add an admin user
    this.users.push(
      new UserModel({
        username: 'admin',
        // In a real app, this would be hashed
        password: 'admin',
        isAdmin: true,
      })
    );

    // Add some sample tales
    this.tales.push(
      new TaleModel({
        title: 'The Lost Key',
        description: 'A short story about finding what was always there.',
        content: 'Once upon a time, there was a young girl named Lily who lost her favorite key...',
      }),
      new TaleModel({
        title: 'Mountain Echo',
        description: 'A tale of adventure in the high mountains.',
        content: 'The mountain peaks gleamed with snow as Marco began his ascent...',
      }),
      new TaleModel({
        title: 'The Forgotten Letter',
        description: 'A mysterious letter changes everything.',
        content: 'Sarah found the yellowed envelope tucked between the pages of an old book...',
      })
    );
  }

  // Tale methods
  getAllTales(): Tale[] {
    return [...this.tales];
  }

  getTaleById(id: string): Tale | undefined {
    return this.tales.find((tale) => tale._id === id);
  }

  createTale(taleData: Omit<Tale, 'id' | 'createdAt' | 'updatedAt'>): Tale {
    const newTale = new TaleModel({
      ...taleData,
    });
    this.tales.push(newTale);
    return newTale;
  }

  updateTale(id: string, taleData: Partial<Tale>): Tale | null {
    const index = this.tales.findIndex((tale) => tale._id === id);
    if (index === -1) return null;

    const updatedTale = {
      ...this.tales[index],
      ...taleData,
      updatedAt: new Date().toISOString(),
    };

    this.tales[index] = updatedTale;
    return updatedTale;
  }

  deleteTale(id: string): boolean {
    const initialLength = this.tales.length;
    this.tales = this.tales.filter((tale) => tale._id !== id);
    return initialLength !== this.tales.length;
  }

  // User methods
  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  validateCredentials(username: string, password: string): User | null {
    const user = this.getUserByUsername(username);
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
}

// Export a singleton instance
export const db = new Database();