// utils/cassandra.ts

import { Client } from 'cassandra-driver';

// Set up connection options
const client = new Client({
  contactPoints: [process.env.DB_CONTACT_POINTS || 'localhost'],
  localDataCenter: process.env.DB_LOCAL_DATACENTER || 'datacenter1',
  keyspace: process.env.DB_KEYSPACE || 'your_keyspace',  // Replace with your keyspace name
  credentials: {
    username: process.env.DB_USERNAME || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password'
  }
});

// Connect to Cassandra
export const connectToCassandra = async () => {
  try {
    await client.connect();
    console.log('Connected to Cassandra');
  } catch (error) {
    console.error('Cassandra connection error:', error);
    throw error;
  }
};

// Export Cassandra client for use in API routes
export default client;
