import React from 'react';
import { useForm } from 'react-hook-form';
import notestore from '../store/store';
import { useNavigate } from 'react-router-dom';

function Tweets() {
  const { register, handleSubmit } = useForm();
  const addnote = notestore((state) => state.addnote);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    addnote({
      username: data.username,
      tweeturl: data.tweeturl,
      description: data.description,
      about: data.about,
      tags: data.tags.split(',').map(tag => tag.trim()), // tag input cleanup
      readlater: data.readlater ? true : false,
      type: "tweet"
    });
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🧵 Add Tweet Note</h2>

      <input
        {...register('username')}
        placeholder="Twitter username (e.g. dan_abramov)"
        className="w-full px-4 py-2 border rounded-md"
      />

      <input
        type="url"
        {...register('tweeturl')}
        placeholder="Tweet URL"
        className="w-full px-4 py-2 border rounded-md"
      />

      <textarea
        {...register('description')}
        placeholder="What is this tweet about?"
        className="w-full px-4 py-2 border rounded-md"
      />

      <textarea
        {...register('about')}
        placeholder="Why did you save this tweet?"
        className="w-full px-4 py-2 border rounded-md"
      />

      <input
        {...register('tags')}
        placeholder="Tags (comma separated)"
        className="w-full px-4 py-2 border rounded-md"
      />

      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register('readlater')} />
        <span>Mark as Read Later</span>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Tweet Note
      </button>
    </form>
  );
}

export default Tweets;
