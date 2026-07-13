FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

FROM base AS build
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
