FROM node:20-alpine AS base

# --- deps: instala dependencias con cache de capa ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# --- builder: genera cliente Prisma y compila Next.js ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG R2_PUBLIC_URL
ENV R2_PUBLIC_URL=$R2_PUBLIC_URL
# Solo para que next build pueda importar env.ts. La etapa runner parte de otra imagen: no llegan a producción.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build \
    NEXTAUTH_SECRET=build-only-placeholder-secret \
    NEXTAUTH_URL=http://localhost:3000 \
    CLIENT_SLUG=build \
    CLIENT_DOMAIN=build.local \
    STRIPE_SECRET_KEY=sk_test_build_placeholder \
    STRIPE_WEBHOOK_SECRET=whsec_build_placeholder
RUN npx prisma generate
RUN npm run build

# --- runner: imagen final ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
