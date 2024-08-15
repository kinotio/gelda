FROM node:20-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN npm install -g corepack@0.24.1 && corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package*.json ./

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

FROM base as production
WORKDIR /app
ENV NODE_ENV=production
RUN pnpm i --frozen-lockfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
CMD pnpm start

FROM base as dev
ENV NODE_ENV=development
RUN pnpm i --frozen-lockfile
COPY . .
CMD pnpm dev

EXPOSE 3000