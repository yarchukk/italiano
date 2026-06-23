import { db } from "./index.ts";
import { users } from "./schema.ts";
import { eq } from "drizzle-orm";

export async function getOrCreateUser(uid: string, email: string, name: string, username?: string) {
  const existingUsers = await db.select().from(users).where(eq(users.uid, uid));
  
  if (existingUsers.length > 0) {
    return existingUsers[0];
  }

  const [newUser] = await db.insert(users).values({
    uid,
    email,
    firstName: name,
    username: username || '',
  }).returning();

  return newUser;
}