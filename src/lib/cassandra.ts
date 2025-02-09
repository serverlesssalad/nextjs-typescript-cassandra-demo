// utils/cassandra.ts

import { Client } from 'cassandra-driver';
import * as AWS from 'aws-sdk';
import { SigV4AuthProvider } from 'aws-sigv4-auth-cassandra-plugin'; // Import the SigV4AuthProvider

// Load credentials manually if needed
console.log(AWS.config.credentials)
if (!AWS.config.credentials) {
  console.log("access_key_id")
  console.log(process.env.AWS_ACCESS_KEY_ID)
  console.log("access_secret_key")
  console.log(process.env.AWS_SECRET_ACCESS_KEY)
  const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  AWS.config.credentials = credentials;
}

// Set up AWS SDK credentials for AWS Keyspaces (only used if connecting to AWS)
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',  // Set your region
  // Optionally, configure AWS credentials (from environment or IAM role)
});

const isAwsKeyspaces = process.env.DB_IS_AWS_KEYSPACES
  ? process.env.DB_IS_AWS_KEYSPACES === 'true'
  : true;

let client: Client;

console.log(isAwsKeyspaces)
console.log(process.env.DB_CONTACT_POINTS, process.env.DB_LOCAL_DATACENTER, process.env.DB_KEYSPACE)
// Set up Cassandra connection configuration for local and AWS Keyspaces
if (isAwsKeyspaces) {
  console.log("Aws athenticate way")
  console.log(AWS.config.credentials)
  // AWS Keyspaces connection setup
  client = new Client({
    contactPoints: [process.env.DB_CONTACT_POINTS || 'cassandra.us-east-1.amazonaws.com'],  // AWS Keyspaces endpoint
    localDataCenter: process.env.DB_LOCAL_DATACENTER || 'us-east-1',
    keyspace: process.env.DB_KEYSPACE || 'your_keyspace',
    authProvider: new SigV4AuthProvider(AWS.config.credentials), // AWS IAM for authentication
    sslOptions: { rejectUnauthorized: true }, // Enable SSL for AWS Keyspaces
  });
} else {
  // Local Cassandra connection setup
  client = new Client({
    contactPoints: [process.env.DB_CONTACT_POINTS || 'localhost'], // Localhost for local Cassandra
    localDataCenter: process.env.DB_LOCAL_DATACENTER || 'datacenter1',  // Usually 'datacenter1' for local
    keyspace: process.env.DB_KEYSPACE || 'your_keyspace', // Replace with your local keyspace
    credentials: {
      username: process.env.DB_USERNAME || 'cassandra', // Default Cassandra username
      password: process.env.DB_PASSWORD || 'cassandra', // Default password (if applicable)
    },
  });
}
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
    // First, connect to the Cassandra cluster
    await client.connect();
    console.log('Connected to Cassandra');
    
    // Ensure the keyspace and table exist after connecting
    await ensureKeyspace();
    await ensureTable();
  } catch (error) {
    console.error('Cassandra connection error:', error);
    throw error;
  }
};

// Export Cassandra client for use in API routes
export default client;
