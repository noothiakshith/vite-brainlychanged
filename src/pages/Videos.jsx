import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import notestore from '../store/store';

function Videos() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const addyoutube = notestore((state) => state.addnote);

  // 👇 Watch URL input
  const youtubeURL = watch("url");
  const [videoId, setVideoId] = useState("");

  // Extract video ID from URL
  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com.*(?:v=|\/embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : "";
  };
  
  React.useEffect(() => {
    const id = extractVideoId(youtubeURL);
    setVideoId(id);
  }, [youtubeURL]);

  const onSubmit = (data) => {
    addyoutube({
      title: data.title,
      youtubeurl: data.url,
      description: data.description,
      note: data.note,
      tags: data.tags,
      readlater: data.readlater,
      type: "video"
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add YouTube Video</h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input 
            {...register("title")} 
            placeholder="Enter video title"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">YouTube URL</label>
          <input 
            type='url' 
            {...register("url")} 
            placeholder="https://youtube.com/..."
            className="w-full p-2 border rounded-lg"
          />
          {videoId && (
            <img 
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
              alt="YouTube Thumbnail" 
              className="mt-4 rounded-lg border shadow-md"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea 
            {...register("description")} 
            placeholder="Write a brief description"
            rows="3"
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Your Notes</label>
          <textarea 
            {...register("note")} 
            placeholder="Write your personal notes here"
            rows="3"
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Tags</label>
          <input 
            {...register("tags")} 
            placeholder="e.g., motivation, coding"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type='checkbox' {...register("readlater")} />
          <label className="text-sm text-gray-700">Save to Read Later</label>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Type</label>
          <select 
            {...register("type")} 
            disabled 
            className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
          >
            <option value="video">YouTube</option>
          </select>
        </div>

        <button 
          type='submit' 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
        >
          Save Video
        </button>
      </form>
    </div>
  )
}

export default Videos;
