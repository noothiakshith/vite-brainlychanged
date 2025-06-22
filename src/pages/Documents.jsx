import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import notestore from '../store/store';

function Documents() {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const adddocument = notestore((state) => state.addnote);

  const onSubmit = (data) => {
    console.log(data);
    adddocument(data);
    navigation('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Add Document</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            {...register("Title")} 
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            {...register("Description")} 
            rows="3"
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Short description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Note</label>
          <textarea 
            {...register("Note")} 
            rows="4"
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Write detailed notes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input 
            type="text" 
            {...register("Tags")} 
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="e.g. work,important"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            {...register("ReadLater")} 
            id="readLater"
            className="rounded"
          />
          <label htmlFor="readLater" className="text-sm text-gray-700">Mark as Read Later</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select 
            {...register("Type")} 
            disabled 
            className="mt-1 block w-full rounded-xl border-gray-300 bg-gray-100 p-2 text-gray-600"
          >
            <option value="document">Document</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl shadow-md transition duration-200"
        >
          Add Document
        </button>
      </form>
    </div>
  );
}

export default Documents;
