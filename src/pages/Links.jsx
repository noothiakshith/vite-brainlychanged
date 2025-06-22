import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import notestore from '../store/store';

function Links() {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const addlink = notestore((state) => state.addnote);

  const onSubmit = (data) => {
    console.log(data);
    addlink(data);
    navigation('/');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Link</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">URL</label>
          <input
            {...register('Url')}
            placeholder="https://example.com"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Topic</label>
          <input
            {...register('topic')}
            placeholder="React Hooks"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            {...register('Description')}
            rows={3}
            placeholder="Short description about the link..."
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Personal Note</label>
          <textarea
            {...register('Note')}
            rows={3}
            placeholder="Any personal thoughts or notes..."
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Tags (comma separated)</label>
          <input
            {...register('tags')}
            placeholder="javascript, react, webdev"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('readlater')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Mark to Read Later</label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Type</label>
          <select
            {...register('type')}
            disabled
            className="w-full mt-1 px-4 py-2 border rounded-xl bg-gray-100 cursor-not-allowed"
          >
            <option value="link">Link</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Links;
