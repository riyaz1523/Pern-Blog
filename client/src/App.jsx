import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './pages/Posts'
import './App.css'
import BlogCard from './pages/BlogCard'
import Header from './components/Header'
import ViewPost from './pages/ViewPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';

function App() {

  return (
    <BrowserRouter>
    <Header />
    {/* <BlogCard /> */}
    <Routes>
    <Route path='/viewpost' element={<ViewPost />} />
    <Route path='/createpost' element={<CreatePost />} />
    <Route path='/editpost' element={<EditPost />} />
    <Route path='/profile' element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
