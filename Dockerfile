# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock, if applicable)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Set the environment variables if needed
# ENV DB_URL=cassandra-db-hostname
# ENV DB_USERNAME=cassandra-user
# ENV DB_PASSWORD=cassandra-password
# ENV CASSANDRA_LOCAL_DATACENTER=datacenter1
# ENV CASSANDRA_KEYSPACE=college

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run", "dev"]