# Use the official Node.js image with a lighter variant
FROM node:alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the application (if necessary)
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run", "dev"]