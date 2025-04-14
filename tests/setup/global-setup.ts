import { TestDB } from '../utils/test-db';

export default async function globalSetup() {
  // Initialize test database
  const testDB = TestDB.getInstance();
  testDB.reset();
} 