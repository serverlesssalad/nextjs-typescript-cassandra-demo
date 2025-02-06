import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: [process.env.DB_URL], // Cassandra host URL
  localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER, // Data center name
  keyspace: process.env.CASSANDRA_KEYSPACE, // Keyspace name
  credentials: {
    username: process.env.DB_USERNAME, // Cassandra username
    password: process.env.DB_PASSWORD, // Cassandra password
  },
});

export default client;
