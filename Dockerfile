# Use a lighter version of Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "dev"]