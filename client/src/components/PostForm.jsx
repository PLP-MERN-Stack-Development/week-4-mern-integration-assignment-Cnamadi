import { useState, useEffect } from "react";
import axios from "axios";

function PostForm() {
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then(res => setCategories(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/api/posts", form).then(() => alert("Post created"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" onChange={handleChange} placeholder="Title" className="w-full p-2 border" />
      <textarea name="content" onChange={handleChange} placeholder="Content" className="w-full p-2 border" />
      <select name="category" onChange={handleChange} className="w-full p-2 border">
        <option>Select Category</option>
        {categories.map(cat => <option value={cat._id} key={cat._id}>{cat.name}</option>)}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
    </form>
  );
}

export default PostForm;