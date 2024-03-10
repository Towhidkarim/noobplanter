'use server';
import { eq } from 'drizzle-orm';
import db from '../db/migrate';
import { users } from '../db/schema';
import bcrypt from 'bcryptjs';
export default async function SignUpAuth({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const data = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (data[0]) {
    return { ok: false, message: 'Username With Email Already Exists' };
  } else
    try {
      const saltRounds = 10;
      const passwordHash = bcrypt.hashSync(password, saltRounds);
      await db.insert(users).values({
        name: username,
        email,
        password: passwordHash,
        role: 'user',
      });
      return {
        ok: true,
        message: 'Registration Succesfull!, Redirecting to Sign in page',
      };
    } catch (error) {
      return { ok: false, message: 'Something went wrong' };
    }
}
