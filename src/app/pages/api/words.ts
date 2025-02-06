import { Request, Response } from 'express';
import cassandraClient from '../lib/cassandra'; // Importing the Cassandra client

// Interface for Word
interface WordModel {
  word: string;
}

// Interface for Word Update
interface WordUpdateModel {
  word?: string;
}

export default async function handler(req: Request, res: Response) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.word_id) {
        // Get a word by ID
        try {
          const wordId = req.query.word_id as string;
          const query = 'SELECT * FROM words WHERE word_id = ?';
          const result = await cassandraClient.execute(query, [wordId], { prepare: true });
          
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Word not found' });
          }
          
          return res.status(200).json({ word: result.rows[0].word });
        } catch (error) {
          return res.status(500).json({ error: 'Error fetching word' });
        }
      } else {
        // Get all words
        try {
          const query = 'SELECT * FROM words';
          const result = await cassandraClient.execute(query);

          return res.status(200).json(result.rows.map((row) => ({ word: row.word })));
        } catch (error) {
          return res.status(500).json({ error: 'Error fetching words' });
        }
      }

    case 'POST':
      // Create a new word
      try {
        const { word }: WordModel = req.body;
        const query = 'INSERT INTO words (word) VALUES (?)';
        await cassandraClient.execute(query, [word], { prepare: true });

        return res.status(201).json({ word });
      } catch (error) {
        return res.status(500).json({ error: 'Error creating word' });
      }

    case 'PUT':
      if (req.query.word_id) {
        // Update a word by ID
        try {
          const wordId = req.query.word_id as string;
          const { word }: WordUpdateModel = req.body;
          const query = 'UPDATE words SET word = ? WHERE word_id = ?';
          await cassandraClient.execute(query, [word, wordId], { prepare: true });

          return res.status(200).json({ word });
        } catch (error) {
          return res.status(500).json({ error: 'Error updating word' });
        }
      }
      return res.status(400).json({ error: 'Word ID is required for update' });

    case 'DELETE':
      if (req.query.word_id) {
        // Delete a word by ID
        try {
          const wordId = req.query.word_id as string;
          const query = 'DELETE FROM words WHERE word_id = ?';
          await cassandraClient.execute(query, [wordId], { prepare: true });

          return res.status(200).json({ message: 'Word deleted successfully' });
        } catch (error) {
          return res.status(500).json({ error: 'Error deleting word' });
        }
      }
      return res.status(400).json({ error: 'Word ID is required for deletion' });

    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
