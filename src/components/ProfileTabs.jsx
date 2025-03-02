import React from "react";

const ProfileTabs = ({ activeTab, handleTabChange }) => (
  <div className="tabs">
    <button
      className={`tab ${activeTab === "posts" ? "active" : ""}`}
      onClick={() => handleTabChange("posts")}
    >
      Posts
    </button>
    <button
      className={`tab ${activeTab === "projects" ? "active" : ""}`}
      onClick={() => handleTabChange("projects")}
    >
      Projects
    </button>
    <button
      className={`tab ${activeTab === "endorsements" ? "active" : ""}`}
      onClick={() => handleTabChange("endorsements")}
    >
      Endorsements
    </button>
    <button
      className={`tab ${activeTab === "activity" ? "active" : ""}`}
      onClick={() => handleTabChange("activity")}
    >
      Activity
    </button>
  </div>
);

export default ProfileTabs;
