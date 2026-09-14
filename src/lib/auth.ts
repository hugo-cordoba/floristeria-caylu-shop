import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { checkRateLimitByIp } from '@/lib/rate-limit';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Limita intentos por IP antes de tocar bcrypt/BD. Se responde
        // igual que credenciales invalidas (null), sin distinguir el
        // motivo, para no dar pistas a quien prueba fuerza bruta.
        const rateLimit = checkRateLimitByIp('login', { limit: 10, windowMs: 15 * 60 * 1000 });
        if (!rateLimit.allowed) return null;

        const email = credentials.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // `user` solo llega en el login inicial; el resto de veces el rol
      // ya vive en el token. Si cambias el rol de alguien en BD, no se
      // reflejará hasta que vuelva a iniciar sesión (limitación normal de
      // JWT sessions; se puede forzar con session.update() si hace falta).
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
      }
      // updateProfile() llama a session.update(data) tras guardar, para que
      // el nombre/teléfono se vean al instante sin tener que reloguear.
      if (trigger === 'update' && session) {
        token.firstName = session.firstName;
        token.lastName = session.lastName;
        token.phone = session.phone;
        token.email = session.email;
        token.name = `${session.firstName} ${session.lastName}`.trim();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};