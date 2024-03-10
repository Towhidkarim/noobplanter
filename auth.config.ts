import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import db from './lib/db/migrate';
import { users } from './lib/db/schema';
import { eq } from 'drizzle-orm';
import z from 'zod';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });
        const { email, password } = credentials;
        const parsedData = schema.safeParse({ email, password });
        if (!parsedData.success) return null;
        const userdata = await db
          .select()
          .from(users)
          .where(eq(users.email, parsedData.data.email))
          .limit(1);
        if (!userdata[0]) return null;
        const passIsCorrect = await bcrypt.compare(
          parsedData.data.password,
          userdata[0].password
        );
        if (passIsCorrect)
          return {
            id: userdata[0].id.toString(),
            name: userdata[0].name,
            email: userdata[0].email,
          };
        else return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/user/signin',
  },
} satisfies NextAuthConfig;
