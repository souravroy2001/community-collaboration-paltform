"use client";

import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./media-uploader.css";

export default function MediaUploader({ onUpload, mediaFiles, onRemoveMedia }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // Drag and Drop Container
  const [{ isDraggingContainer }, drag] = useDrag(() => ({
    type: "MEDIA_UPLOADER",
    collect: (monitor) => ({
      isDraggingContainer: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "MEDIA_UPLOADER",
    drop: () => ({ name: "MediaUploader" }),
  }));

  drag(drop(containerRef));

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
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`media-uploader ${
        isDraggingContainer ? "dragging-container" : ""
      }`}
    >
      {mediaFiles.length > 0 && (
        <div className="media-previews">
          {mediaFiles.map((file, index) => {
            const fileType = file.type.split("/")[0]; // Get file type (image, video, application)
            const previewUrl = URL.createObjectURL(file); // Create object URL for preview

            return (
              <div className="media-preview-item" key={index}>
                {/* Image Preview */}
                {fileType === "image" && (
                  <img src={previewUrl} alt={`Preview ${index}`} width="150" />
                )}
                {/* Video Preview */}
                {fileType === "video" && (
                  <video controls width="150">
                    <source src={previewUrl} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {/* Document Preview */}
                {fileType === "application" && (
                  <div className="document-preview">📄 {file.name}</div>
                )}
                {/* Remove Button */}
                <button
                  className="remove-media-button"
                  onClick={() => onRemoveMedia(index)}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Area */}
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
        <div
          onClick={() => fileInputRef.current.click()}
          className="upload-content"
        >
          <div className="upload-icon">📁</div>
          <p>
            Drag and drop files here, or{" "}
            <button className="browse-button">browse</button>
          </p>
          <p className="upload-hint">Supports images, videos, and documents</p>
        </div>
      </div>
    </div>
  );
}
