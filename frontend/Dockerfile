# Stage 1: Build the app
FROM node:22.15.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built app
FROM node:22.15.0-alpine

WORKDIR /usr/src/app

# Install "serve" globally
RUN npm install -g serve

# Copy built app from previous stage
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]