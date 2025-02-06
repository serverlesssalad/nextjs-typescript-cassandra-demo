import { Request, Response } from 'express';
import cassandraClient from '../lib/cassandra'; // Importing the Cassandra client

// Health check route for Cassandra connection
export default async function healthCheck(req: Request, res: Response) {
  try {
    // Execute a simple query to test the connection
    await cassandraClient.execute('SELECT now() FROM system.local');
    return res.status(200).json({ status: 'healthy' });
  } catch (error) {
    // Catch any errors during the query execution
    return res.status(500).json({ status: 'unhealthy', details: error.message });
  }
}
