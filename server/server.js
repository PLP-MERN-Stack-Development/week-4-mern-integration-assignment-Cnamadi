const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ---- server/models/Post.js ----
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);

// ---- server/models/Category.js ----
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Category", categorySchema);

// ---- server/routes/posts.js ----
const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("category");
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("category");
  res.json(post);
});

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const saved = await newPost.save();
  res.status(201).json(saved);
});

router.put("/:id", async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;

// ---- server/routes/categories.js ----
const express = require("express");
const Category = require("../models/Category");
const Router = express.Router();

Router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

Router.post("/", async (req, res) => {
  const category = new Category(req.body);
  const saved = await category.save();
  res.status(201).json(saved);
});

module.exports = router;

// ---- client/src/App.jsx ----
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