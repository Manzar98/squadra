# Step 1: Build the Next.js app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Serve the Next.js app
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the build output and dependencies from the builder image
COPY --from=builder /app /app

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
