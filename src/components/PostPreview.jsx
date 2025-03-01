import { useEffect, useRef } from "react";
import "./post-preview.css";

export default function PostPreview({
  content,
  mediaPreviewUrls,
  onBack,
  onPublish,
  isPublishing,
}) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      let processedContent = content;

      processedContent = processedContent.replace(
        /#(\w+)/g,
        '<span class="hashtag">#$1</span>'
      );

      contentRef.current.innerHTML = processedContent;
    }
  }, [content]);

  const renderMediaPreviews = () => {
    if (mediaPreviewUrls.length === 0) return null;

    return (
      <div
        className={`preview-media-grid media-count-${Math.min(
          mediaPreviewUrls.length,
          4
        )}`}
      >
        {mediaPreviewUrls.map((url, index) => {
          if (url.includes("video")) {
            return (
              <div className="preview-media-item" key={index}>
                <video controls>
                  <source src={url} />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          } else {
            return (
              <div className="preview-media-item" key={index}>
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Media ${index + 1}`}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="post-preview">
      <div className="preview-header">
        <h2>Post Preview</h2>
        <p>This is how your post will appear in the feed</p>
      </div>

      <div className="preview-card">
        <div className="preview-user-info">
          <div className="preview-avatar"></div>
          <div className="preview-user-details">
            <div className="preview-user-name">Your Name</div>
            <div className="preview-user-headline">Your Headline</div>
            <div className="preview-post-time">Just now</div>
          </div>
        </div>

        <div className="preview-content" ref={contentRef}></div>

        {renderMediaPreviews()}

        <div className="preview-engagement">
          <div className="preview-likes">0 likes</div>
          <div className="preview-comments">0 comments</div>
        </div>
      </div>

      <div className="preview-actions">
        <button className="back-button" onClick={onBack}>
          Back to Edit
        </button>
        <button
          className="publish-button"
          onClick={onPublish}
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : "Publish Now"}
        </button>
      </div>
    </div>
  );
}
