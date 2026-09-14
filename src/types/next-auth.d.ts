import type { DefaultSession, DefaultUser } from 'next-auth';
import type { Role } from '@prisma/client';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      firstName: string;
      lastName: string;
      phone: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string | null;
  }
}