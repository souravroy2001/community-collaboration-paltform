import { useContext, useEffect, useRef } from "react";
import "./post-preview.css";
import { Image } from "@chakra-ui/react";
import { ProfileProvider } from "@/context/ProfileContext";
import { LogAuthContext } from "@/context/LogAuth";

export default function PostPreview({
  content,
  mediaFiles = [],
  mediaPreviewUrls = [],
  onBack,
  onPublish,
  isPublishing,
}) {
  const contentRef = useRef(null);
  const { profileImage } = useContext(ProfileProvider);
  const { currentUser } = useContext(LogAuthContext);

  useEffect(() => {
    if (contentRef.current) {
      let processedContent = content || "";

      processedContent = processedContent.replace(
        /#(\w+)/g,
        '<span class="hashtag">#$1</span>'
      );

      contentRef.current.innerHTML = processedContent;
    }
  }, [content]);

  console.log("Media Preview URLs:", mediaPreviewUrls);
  console.log("Media Files:", mediaFiles);

  const renderMediaPreviews = () => {
    if (!mediaPreviewUrls?.length) return null;

    return (
      <div
        className={`preview-media-grid media-count-${Math.min(
          mediaPreviewUrls.length,
          4
        )}`}
      >
        {mediaPreviewUrls.map((url, index) => {
          const file = mediaFiles[index] || {};
          const fileType = file?.type || ""; // Use file.type since blob URLs lack extensions

          if (fileType.startsWith("video/")) {
            return (
              <div className="preview-media-item" key={index}>
                <video controls width="100%" height="auto">
                  <source src={url} type={fileType} />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          } else if (
            fileType.startsWith("application/") ||
            fileType.includes("pdf")
          ) {
            return (
              <div className="preview-media-item document-preview" key={index}>
                <iframe
                  src={url}
                  width="100%"
                  height="400px"
                  title={`Document Preview ${index + 1}`}
                ></iframe>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  📄 {file.name || "Document"}
                </a>
              </div>
            );
          } else if (fileType.startsWith("audio/")) {
            return (
              <div className="preview-media-item" key={index}>
                <audio controls>
                  <source src={url} type={fileType} />
                  Your browser does not support the audio tag.
                </audio>
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
          <div className="preview-avatar">
            <Image src={profileImage} />
          </div>
          <div className="preview-user-details">
            <div className="preview-user-name">
              {currentUser?.name || "No Name available"}
            </div>
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
