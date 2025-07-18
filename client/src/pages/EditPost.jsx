import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../api";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost(id).then(res => setPost(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, post);
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>
      <PostForm post={post} setPost={setPost} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditPost;
