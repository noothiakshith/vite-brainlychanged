import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

const notestore = create((set) => ({
  notes: [],

  addnote: (note) => set((state) => ({
    notes: [
      ...state.notes,
      {
        id: uuidv4(),
        type: note.type,
        title: note.title,
        username: note.username,
        tweeturl: note.tweeturl,
        description: note.description,
        about: note.about,
        tags: note.tags,
        readlater: note.readlater || false,
        date: Date.now(),
        youtubeurl: note.youtubeurl,
        url: note.url,
        note: note.note
      }
    ]
  })),

  removenote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id)
  })),

  editnote: (id, updatednote) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id
        ? {
            ...note,
            type: updatednote.type,
            title: updatednote.title,
            username: updatednote.username,
            tweeturl: updatednote.tweeturl,
            description: updatednote.description,
            about: updatednote.about,
            tags: updatednote.tags,
            readlater: updatednote.readlater,
            date: Date.now(),
            youtubeurl: updatednote.youtubeurl,
            url: updatednote.url,
            note: updatednote.note
          }
        : note
    )
  })),

  togglereadlater: (id) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id
        ? { ...note, readlater: !note.readlater }
        : note
    )
  })),
getbyid: (id) => {
  const notes = get().notes;
  return notes.find((note) => note.id === id);
}
}));

export default notestore;
