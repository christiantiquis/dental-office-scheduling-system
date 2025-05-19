# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.15.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

################################################################################
# Stage 1: Install only production dependencies
FROM base as deps

COPY package*.json ./
RUN npm ci --omit=dev

################################################################################
# Stage 2: Build the backend application
FROM base as build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

################################################################################
# Stage 3: Final runtime image with minimal dependencies
FROM node:${NODE_VERSION}-alpine AS final
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Use non-root user for better security
USER node

# Copy only what's needed for runtime
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node package*.json ./

EXPOSE 3001

CMD ["node", "dist/index.js"]