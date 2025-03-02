import React, { useContext } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  ExternalLink,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import ProfileTabs from "./ProfileTabs";

const ProfileMainContent = ({
  activeTab,
  profileImage,
  currentUser,
  handleTabChange,
}) => (
  <div className="profile-main">
    <ProfileTabs activeTab={activeTab} handleTabChange={handleTabChange} />
    {activeTab === "posts" && (
      <div className="tab-content active">
        <div className="card">
          <div className="card-header post-header">
            <div className="post-author">
              <div className="post-avatar">
                <img src={profileImage} alt={currentUser?.name} />
              </div>
              <div>
                <h3>{currentUser?.name}</h3>
                <p className="post-time">2 days ago</p>
              </div>
            </div>
            <button className="button button-icon">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <div className="card-content">
            <p className="post-text">
              Just launched a new open-source project for community
              collaboration!
            </p>
          </div>
          <div className="card-footer post-actions">
            <div className="post-reactions">
              <button className="button button-ghost">
                <Heart size={16} />
                <span>124</span>
              </button>
              <button className="button button-ghost">
                <MessageSquare size={16} />
                <span>32</span>
              </button>
            </div>
            <button className="button button-ghost">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    )}
    {/* Add other tab contents similarly */}
  </div>
);

export default ProfileMainContent;
