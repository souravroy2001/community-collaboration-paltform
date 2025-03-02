import { useState, useEffect } from "react";
import axios from "axios";
import "./post-creator.css";
import TextEditor from "./TextEditor";
import MediaUploader from "./MediaUploader";
import PostPreview from "./PostPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ResourcesSection from "./ResourcesSection";

export default function PostCreator() {
  const API_URL =
    "https://masai-hackathon-2025-default-rtdb.firebaseio.com/community/posts.json";

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Fetch posts from Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          const fetchedPosts = Object.entries(response.data).map(
            ([id, post]) => ({
              id,
              ...post,
            })
          );
          setPosts(fetchedPosts.reverse());
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle media preview generation
  useEffect(() => {
    const newPreviewUrls = mediaFiles.map((file) => URL.createObjectURL(file));

    setMediaPreviewUrls((prevUrls) => {
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return newPreviewUrls;
    });

    return () => {
      newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaFiles]);

  // Handle text input change
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Handle media upload
  const handleMediaUpload = (files) => {
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Handle removing uploaded media
  const handleRemoveMedia = (index) => {
    URL.revokeObjectURL(mediaPreviewUrls[index]);

    setMediaFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setMediaPreviewUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  // Toggle preview mode
  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Handle publishing a post
  const handlePublish = async () => {
    if (!content && mediaFiles.length === 0) return;

    setIsPublishing(true);

    const newPost = {
      content,
      mediaUrls: mediaPreviewUrls,
      likes: 0,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(API_URL, newPost);
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to state
    } catch (error) {
      console.error("Error publishing post:", error);
    }

    setIsPublishing(false);
    setContent("");
    setMediaFiles([]);
    setMediaPreviewUrls([]);
    setIsPreviewMode(false);
  };

  // Handle liking a post
  const handleLike = async (postId, currentLikes) => {
    try {
      const postRef = `https://masai-hackathon-2025-default-rtdb.firebaseio.com/community/posts/${postId}.json`;
      await axios.patch(postRef, { likes: currentLikes + 1 });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="post-creator">
      <div className="post-creator-tabs">
        <button
          className={`tab ${!isPreviewMode ? "active" : ""}`}
          onClick={() => setIsPreviewMode(false)}
        >
          Create
        </button>
        <button
          className={`tab ${isPreviewMode ? "active" : ""}`}
          onClick={() => setIsPreviewMode(true)}
          disabled={!content && mediaFiles.length === 0}
        >
          Preview
        </button>
      </div>

      <div className="post-creator-content">
        {!isPreviewMode ? (
          <>
            <TextEditor content={content} onChange={handleContentChange} />

            <DndProvider backend={HTML5Backend}>
              <MediaUploader
                onUpload={handleMediaUpload}
                mediaFiles={mediaFiles}
                mediaPreviewUrls={mediaPreviewUrls}
                onRemoveMedia={handleRemoveMedia}
              />
            </DndProvider>

            <div className="post-actions">
              <button
                className="preview-button"
                onClick={togglePreview}
                disabled={!content && mediaFiles.length === 0}
              >
                Preview
              </button>
              <button
                className="publish-button"
                onClick={handlePublish}
                disabled={(!content && mediaFiles.length === 0) || isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </>
        ) : (
          <PostPreview
            content={content}
            mediaPreviewUrls={mediaPreviewUrls}
            onBack={togglePreview}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        )}
      </div>

      {/* Render Posts */}
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            {post.mediaUrls?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Post Media"
                className="post-media"
              />
            ))}
            <div className="post-actions">
              <button onClick={() => handleLike(post.id, post.likes)}>
                ❤️ {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
