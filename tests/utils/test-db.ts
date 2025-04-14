import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
}

export interface TestDBData {
  users: User[];
}

const TEST_DB_PATH = path.join(process.cwd(), 'tests', 'test-db.json');

export class TestDB {
  private static instance: TestDB;
  private data: TestDBData;

  private constructor() {
    this.data = this.loadDB();
  }

  static getInstance(): TestDB {
    if (!TestDB.instance) {
      TestDB.instance = new TestDB();
    }
    return TestDB.instance;
  }

  private loadDB(): TestDBData {
    try {
      const data = fs.readFileSync(TEST_DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, create it with initial data
      const initialData: TestDBData = {
        users: [
          {
            id: '1',
            email: 'test@example.com',
            password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu',
            name: 'Test User'
          }
        ]
      };
      this.saveDB(initialData);
      return initialData;
    }
  }

  private saveDB(data: TestDBData): void {
    fs.writeFileSync(TEST_DB_PATH, JSON.stringify(data, null, 2));
  }

  // User methods
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(user => user.email === email);
  }

  createUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: Date.now().toString()
    };
    this.data.users.push(newUser);
    this.saveDB(this.data);
    return newUser;
  }

  // Reset database to initial state
  reset(): void {
    const initialData: TestDBData = {
      users: [
        {
          id: '1',
          email: 'test@example.com',
          password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu',
          name: 'Test User'
        }
      ]
    };
    this.saveDB(initialData);
    this.data = initialData;
  }
} 