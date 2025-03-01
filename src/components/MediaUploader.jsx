"use client";

import { useState, useRef } from "react";
import "./media-uploader.css";

export default function MediaUploader({
  onUpload,
  mediaFiles,
  mediaPreviewUrls,
  onRemoveMedia,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onUpload(filesArray);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onUpload(filesArray);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileTypeIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return "🖼️";
    } else if (file.type.startsWith("video/")) {
      return "🎬";
    } else if (file.type.startsWith("application/pdf")) {
      return "📄";
    } else if (file.type.includes("document") || file.type.includes("msword")) {
      return "📝";
    } else {
      return "📎";
    }
  };

  const renderPreview = (file, url, index) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="media-preview-item" key={index}>
          <img src={url || "/placeholder.svg"} alt={`Preview ${index}`} />
          <button
            className="remove-media-button"
            onClick={() => onRemoveMedia(index)}
            aria-label="Remove media"
          >
            ✕
          </button>
        </div>
      );
    } else if (file.type.startsWith("video/")) {
      return (
        <div className="media-preview-item video-preview" key={index}>
          <video controls>
            <source src={url} type={file.type} />
            Your browser does not support the video tag.
          </video>
          <button
            className="remove-media-button"
            onClick={() => onRemoveMedia(index)}
            aria-label="Remove media"
          >
            ✕
          </button>
        </div>
      );
    } else {
      return (
        <div className="media-preview-item document-preview" key={index}>
          <div className="document-icon">{getFileTypeIcon(file)}</div>
          <div className="document-name">{file.name}</div>
          <button
            className="remove-media-button"
            onClick={() => onRemoveMedia(index)}
            aria-label="Remove media"
          >
            ✕
          </button>
        </div>
      );
    }
  };

  return (
    <div className="media-uploader">
      {mediaPreviewUrls.length > 0 && (
        <div className="media-previews">
          {mediaFiles.map((file, index) =>
            renderPreview(file, mediaPreviewUrls[index], index)
          )}
        </div>
      )}

      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          style={{ display: "none" }}
        />

        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <p>
            Drag and drop files here, or{" "}
            <button onClick={handleButtonClick} className="browse-button">
              browse
            </button>
          </p>
          <p className="upload-hint">Supports images, videos, and documents</p>
        </div>
      </div>
    </div>
  );
}
