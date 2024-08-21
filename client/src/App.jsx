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
import LandingPage from './pages/LandingPage';
import MyPosts from './pages/MyPosts';
import Blogcardeg from './pages/blogcardeg';
import SignInForm from './components/SignIn';
import SignUpForm from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <BrowserRouter>
    <Header />
    {/* <BlogCard /> */}
    <Routes>
    <Route path='/' element={<Posts />} />
    <Route path='/signin' element={<SignInForm />} />
    <Route path='/signup' element={<SignUpForm />} />
    <Route path='/bg' element={<Blogcardeg />} />
    {/* <Route path='/' element={<LandingPage />} /> */}
    <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/mypost' element={<MyPosts />}/>
      <Route path='/story/edit/:id' element={<EditPost />} />
    </Route>
    {/* <Route element={<PrivateRoute element={<Profile />} />} path='/profile' /> */}
    <Route path='/story/:id' element={<ViewPost />} />
    <Route path='/createpost' element={<CreatePost />} />
    <Route path='/editpost' element={<EditPost />} />
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
