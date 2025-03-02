import React from "react";
import { Edit, Mail, Users, LogOut, Share2, MapPin } from "lucide-react";

const ProfileHeader = ({
  coverImage,
  profileImage,
  currentUser,
  following,
  handleCoverImageClick,
  handleProfileImageClick,
  handleFollowToggle,
  doSignout,
}) => (
  <div className="profile-header-container">
    <div className="banner" style={{ backgroundImage: `url(${coverImage})` }}>
      <button className="edit-cover-button" onClick={handleCoverImageClick}>
        <Edit size={16} />
        <span>Edit Cover</span>
      </button>
    </div>
    <div className="profile-header">
      <div className="profile-section">
        <div className="profile-avatar-container">
          <div className="profile-avatar" onClick={handleProfileImageClick}>
            <img src={profileImage} alt={currentUser?.name} />
            <div className="edit-avatar-overlay">
              <Edit size={20} />
            </div>
          </div>
          <div className="status-indicator"></div>
        </div>
        <div className="profile-info-desktop">
          <h1 style={{ color: "#fff" }}>{currentUser?.name}</h1>
          <p className="location">
            <MapPin size={16} />
            San Francisco, CA
          </p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="button button-outline message-button">
          <Mail size={16} />
          <span>Message</span>
        </button>
        <button
          className={`button ${
            following ? "button-outline" : "button-primary"
          }`}
          onClick={handleFollowToggle}
        >
          <Users size={16} />
          <span>{following ? "Following" : "Follow"}</span>
        </button>
        <button
          onClick={doSignout}
          className="button button-outline message-button"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
        <button className="button button-icon">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
