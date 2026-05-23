/**
 * Why cache connection globally in development?
 * Because Next.js hot reload:
 * reloads modules often
 * creates duplicate DB connections
 * This solves it.
 */

import clientPromise from "./mongodb";

export async function getDatabase() {
  const client = await clientPromise;

  return client.db(process.env.MONGODB_DB);
}
