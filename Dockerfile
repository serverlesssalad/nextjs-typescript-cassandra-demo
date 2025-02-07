# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project files
COPY . .

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Set the entrypoint
CMD ["npm", "start"]