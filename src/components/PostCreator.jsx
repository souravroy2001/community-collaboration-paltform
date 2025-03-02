import { useState, useEffect } from "react";
import "./post-creator.css";
import TextEditor from "./TextEditor";
import MediaUploader from "./MediaUploader";
import PostPreview from "./PostPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ResourcesSection from "./ResourcesSection";

export default function PostCreator() {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

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

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleMediaUpload = (files) => {
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

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

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handlePublish = () => {
    setIsPublishing(true);

    setTimeout(() => {
      alert("Post published successfully!");
      setIsPublishing(false);
      setContent("");
      setMediaFiles([]);
      setMediaPreviewUrls([]);
      setIsPreviewMode(false);
    }, 1500);
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
    </div>
  );
}
