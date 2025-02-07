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

// Function to ensure the keyspace exists
const ensureKeyspace = async () => {
  const keyspace = process.env.DB_KEYSPACE || 'your_keyspace';
  const query = `SELECT * FROM system_schema.keyspaces WHERE keyspace_name = '${keyspace}'`;

  const result = await client.execute(query);
  if (result.rowLength === 0) {
    // Keyspace doesn't exist, create it
    const createKeyspaceQuery = `
      CREATE KEYSPACE IF NOT EXISTS ${keyspace}
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
    `;
    await client.execute(createKeyspaceQuery);
    console.log(`Keyspace '${keyspace}' created.`);
  } else {
    console.log(`Keyspace '${keyspace}' already exists.`);
  }
};

// Function to ensure the words table exists
const ensureTable = async () => {
  const keyspace = process.env.DB_KEYSPACE || 'your_keyspace';
  const query = `SELECT * FROM ${keyspace}.words`;

  try {
    await client.execute(query); // Try to query the table
    console.log("Table 'words' exists.");
  } catch (error) {
    // If table doesn't exist, create it
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${keyspace}.words (
        id UUID PRIMARY KEY,
        word TEXT
      );
    `;
    await client.execute(createTableQuery);
    console.log(`Table 'words' created in keyspace '${keyspace}'.`);
  }
};

// Connect to Cassandra
export const connectToCassandra = async () => {
  try {
    // Ensure the keyspace and table exist before connecting
    await ensureKeyspace();
    await ensureTable();

    await client.connect();
    console.log('Connected to Cassandra');
  } catch (error) {
    console.error('Cassandra connection error:', error);
    throw error;
  }
};

// Export Cassandra client for use in API routes
export default client;
