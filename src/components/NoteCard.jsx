import React from 'react';
import { useNavigate } from 'react-router-dom';
import usestore from '../store/store';

function NoteCard({ note }) {
  const remove = usestore((state) => state.removenote);
  const navigate = useNavigate();

  const handleShare = () => {
    const link = `${window.location.origin}/note/${note.id}`;
    navigator.clipboard.writeText(link);
    alert("🔗 Link copied!");
  };

  const renderPreview = () => {
    switch (note.type) {
      case 'tweet':
        return (
          <div className="text-sm text-blue-600">
            <p>@{note.username}</p>
            <a
              href={note.tweeturl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View Tweet
            </a>
          </div>
        );

      case 'video': {
        const getVideoId = (url) => {
          const regExp = /(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/;
          const match = url.match(regExp);
          return match ? match[1] : null;
        };
        const videoId = getVideoId(note.youtubeurl);
        return videoId ? (
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="YouTube thumbnail"
            className="w-full rounded-md mt-2"
          />
        ) : (
          <p className="text-red-500 text-sm">Invalid YouTube URL</p>
        );
      }

      case 'document':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {note.description?.slice(0, 150)}...
          </div>
        );

      case 'link': {
        try {
          const domain = new URL(note.url).hostname;
          return (
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}`}
                alt="favicon"
                className="w-4 h-4"
              />
              <a
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {domain}
              </a>
            </div>
          );
        } catch (e) {
          return <p className="text-red-500 text-sm">Invalid URL</p>;
        }
      }

      default:
        return <p className="text-sm text-gray-400">Unknown type</p>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-3 border hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{note.title || note.topic}</h3>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
          {note.type}
        </span>
      </div>

      {note.readlater && (
        <span className="inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
          🔖 Read Later
        </span>
      )}

      <div>{renderPreview()}</div>

      {note.tags && Array.isArray(note.tags) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {note.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-700">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t mt-3">
        <div className="space-x-2 text-sm">
          <button
            onClick={() => navigate(`/edit/${note.id}`)}
            className="text-blue-600 hover:underline"
          >
            ✏ Edit
          </button>
          <button
            onClick={() => remove(note.id)}
            className="text-red-600 hover:underline"
          >
            ❌ Delete
          </button>
        </div>
        <button
          onClick={handleShare}
          className="text-sm text-gray-600 hover:text-black"
        >
          📤 Share
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
