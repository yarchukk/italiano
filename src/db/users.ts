import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, firstName?: string, username?: string) {
  const result = await db.insert(users)
    .values({
      uid,
      email,
      firstName,
      username,
    })
    .onConflictDoUpdate({
      target: users.uid,
      set: {
        email,
        firstName,
        username,
      },
    })
    .returning();

  return result[0];
}
