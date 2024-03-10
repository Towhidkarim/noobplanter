'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import db from '../db/migrate';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export default async function LoginAuth({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const userdata = await db
      .select({ username: users.name })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (!userdata[0])
      return {
        ok: false,
        message: "User doesn't exist",
      };
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return {
      ok: true,
      message: 'Succesfully Logged in, Redirecting to Dashboard',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { message: 'Invalid Email or Password', ok: false };

          default:
            return { message: 'Something Went Wrong', ok: false };
        }
      }
      throw error;
    }
  }
}
