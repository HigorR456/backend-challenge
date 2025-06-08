# Build stage
FROM node:22.16.0-alpine as build

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code and build
COPY . .
RUN yarn prisma generate && yarn build

# Production stage
FROM node:22.16.0-alpine

# Install postgresql-client for migrations
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/prisma ./prisma

# Copy entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Environment variables
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["./entrypoint.sh"]