# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project files
COPY . .

COPY certs/sf-class2-root.crt /app/sf-class2-root.crt

# Expose the application port
EXPOSE 3000

# Set up the entrypoint
CMD ["npm", "run", "dev"]