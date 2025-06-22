import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Tweets from './pages/Tweets'
import Videos from './pages/Videos'
import Links from './pages/Links'
import EditNote from './pages/EditNote'
import NotePreview from './pages/NotePreview'
import TagPage from './pages/TagPage'
import ReadLater from './pages/ReadLater'
import Home from './pages/Home'
import Documents from './pages/Documents'
function App() {
  return (
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Tweets/>} path='/tweets'/>
      <Route element={<Videos/>} path='/videos'/>
      <Route element={<Documents/>} path='/documents'/>
      <Route element={<Links/>} path='/links'/>
      <Route element={<EditNote/>} path='/edit/:id'/>
      <Route element={<NotePreview/>} path='/note/:id'/>
      <Route element={<TagPage/>} path='/tags/:tag'/>
      <Route element={<ReadLater/>} path='/readlater'/>
    </Routes>
  )
}

export default App