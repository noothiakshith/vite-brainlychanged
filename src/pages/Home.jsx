import React from 'react';
import notestore from '../store/store';
import NoteCard from '../components/NoteCard';

function Home() {
  const allnotes = notestore((state) => state.notes);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🧠 My Second Brain</h1>

      {allnotes.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No notes found. Start by adding your first note!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allnotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
