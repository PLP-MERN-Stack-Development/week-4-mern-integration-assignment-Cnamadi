
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <Router>
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <header className="text-xl font-bold text-center text-gray-800 dark:text-white">MERN Blog</header>
        <nav className="flex justify-center gap-4 py-4">
          <Link to="/" className="text-blue-500">Posts</Link>
          <Link to="/new" className="text-blue-500">New Post</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/new" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;