import { useEffect, useState } from "react";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => setError("Error fetching posts"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map(post => (
        <div key={post._id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p>{post.content}</p>
          <small className="text-gray-500">{post.category?.name}</small>
        </div>
      ))}
    </div>
  );
}

export default PostList;