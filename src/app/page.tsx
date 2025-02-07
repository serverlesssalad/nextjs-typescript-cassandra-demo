// pages/index.tsx
'use client';

import { useEffect, useState } from 'react';

const Home = () => {
  const [words, setWords] = useState<any[]>([]);
  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch('/api/words');
      const data = await response.json();
      setWords(data);
    };

    fetchWords();
  }, []);

  const handleAddWord = async () => {
    if (newWord) {
      await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: newWord }),
      });
      setNewWord('');
      // Re-fetch words after adding a new one
      const response = await fetch('/api/words');
      const data = await response.json();
      setWords(data);
    }
  };

  return (
    <div>
      <h1>Words</h1>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word.word}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        placeholder="Add a new word"
      />
      <button onClick={handleAddWord}>Add Word</button>
    </div>
  );
};

export default Home;
