import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import usestore from '../store/store';

function EditNote() {
  const { id } = useParams();
  const note = usestore((state) => state.notes.find((n) => n.id === id));
  const editNote = usestore((state) => state.editnote);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (note) {
      reset({
        title: note.title || note.topic || '',
        username: note.username || '',
        tweeturl: note.tweeturl || '',
        youtubeurl: note.youtubeurl || '',
        url: note.url || '',
        description: note.description || '',
        about: note.about || '',
        note: note.note || '',
        tags: Array.isArray(note.tags) ? note.tags.join(', ') : note.tags || '',
        readlater: note.readlater || false,
        type: note.type || 'document',
      });
    }
  }, [note, reset]);

  const onSubmit = (data) => {
    const updatedNote = {
      title: data.title,
      username: data.username,
      tweeturl: data.tweeturl,
      youtubeurl: data.youtubeurl,
      url: data.url,
      description: data.description,
      about: data.about,
      note: data.note,
      tags: data.tags
        ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [],
      readlater: data.readlater || false,
      type: data.type,
    };

    editNote(id, updatedNote);
    navigate('/');
  };

  if (!note) {
    return (
      <div className="p-6 text-center text-red-600">
        ⚠️ Note not found. It may have been deleted.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Edit Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register('title')} placeholder="Title or Topic" className="input" />
        <input {...register('username')} placeholder="Username (for Tweet)" className="input" />
        <input {...register('tweeturl')} placeholder="Tweet URL" className="input" />
        <input {...register('youtubeurl')} placeholder="YouTube URL" className="input" />
        <input {...register('url')} placeholder="Website URL" className="input" />

        <textarea {...register('description')} placeholder="Description" className="textarea" />
        <textarea {...register('about')} placeholder="About" className="textarea" />
        <textarea {...register('note')} placeholder="Note content" className="textarea" />

        <input {...register('tags')} placeholder="Tags (comma-separated)" className="input" />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('readlater')} />
          Mark as Read Later
        </label>

        <select {...register('type')} disabled className="input bg-gray-100 cursor-not-allowed">
          <option value="tweet">Tweet</option>
          <option value="video">Video</option>
          <option value="document">Document</option>
          <option value="link">Link</option>
        </select>

        <div className="flex gap-4 mt-4">
          <input
            type="submit"
            value="Save Changes"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          />
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
