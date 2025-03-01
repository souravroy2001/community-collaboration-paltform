import { LogAuthContext } from "@/context/LogAuth";
import React, { useContext } from "react";
import "./ProfilePage.css";

import {
  Award,
  BookOpen,
  Calendar,
  Edit,
  ExternalLink,
  GitlabIcon as GitHub,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Star,
  ThumbsUp,
  Twitter,
  Users,
} from "lucide-react";
import { ProfileProvider } from "@/context/ProfileContext";

function Profile() {
  const { currentUser, userLogin, loading } = useContext(LogAuthContext);
  const {
    following,
    activeTab,
    isEditingAbout,
    aboutText,
    tempAboutText,
    profileImageInputRef,
    coverImageInputRef,
    profileImage,
    coverImage,
    handleFollowToggle,
    handleTabChange,
    handleEditAbout,
    handleSaveAbout,
    handleCancelEditAbout,
    handleProfileImageClick,
    handleCoverImageClick,
    handleProfileImageChange,
    handleCoverImageChange,
    setTempAboutText,
  } = useContext(ProfileProvider);

  return (
    <div className="profile-page">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${coverImage})`,
        }}
      >
        <button className="edit-cover-button" onClick={handleCoverImageClick}>
          <Edit size={16} />
          <span>Edit Cover</span>
        </button>
        <input
          type="file"
          ref={coverImageInputRef}
          onChange={handleCoverImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      <div className="profile-header-container">
        <div className="profile-header">
          <div className="profile-section">
            <div className="profile-avatar-container">
              <div className="profile-avatar" onClick={handleProfileImageClick}>
                <img src={profileImage} alt="Sarah Chen" />
                <div className="edit-avatar-overlay">
                  <Edit size={20} />
                </div>
              </div>
              <input
                type="file"
                ref={profileImageInputRef}
                onChange={handleProfileImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <div className="status-indicator"></div>
            </div>

            <div className="profile-info-desktop">
              <h1>Sarah Chen</h1>
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
            <button className="button button-icon">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info Mobile */}
      <div className="profile-info-mobile">
        <h1>Sarah Chen</h1>
        <p className="location">
          <MapPin size={16} />
          San Francisco, CA
        </p>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          {/* About Card */}
          <div className="card">
            <div className="card-header">
              <h2>About</h2>
              {!isEditingAbout && (
                <button
                  className="button button-icon"
                  onClick={handleEditAbout}
                >
                  <Edit size={16} />
                </button>
              )}
            </div>
            <div className="card-content">
              {isEditingAbout ? (
                <div className="about-edit">
                  <textarea
                    value={tempAboutText}
                    onChange={(e) => setTempAboutText(e.target.value)}
                    rows={4}
                  />
                  <div className="about-edit-actions">
                    <button
                      className="button button-primary"
                      onClick={handleSaveAbout}
                    >
                      Save
                    </button>
                    <button
                      className="button button-outline"
                      onClick={handleCancelEditAbout}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p>{aboutText}</p>
              )}
              <div className="social-links">
                <a href="#" className="social-link">
                  <Twitter size={16} />
                  @sarahcodes
                </a>
                <a href="#" className="social-link">
                  <GitHub size={16} />
                  sarahchen
                </a>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="card">
            <div className="card-header">
              <h2>Skills</h2>
            </div>
            <div className="card-content">
              <div className="skill">
                <div className="skill-header">
                  <span>React</span>
                  <span>Advanced</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
              <div className="skill">
                <div className="skill-header">
                  <span>Node.js</span>
                  <span>Intermediate</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="skill">
                <div className="skill-header">
                  <span>UI/UX Design</span>
                  <span>Intermediate</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>
              <div className="skill">
                <div className="skill-header">
                  <span>TypeScript</span>
                  <span>Advanced</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: "88%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="button button-ghost full-width">
                View all skills
              </button>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="card">
            <div className="card-header">
              <h2>Achievements</h2>
            </div>
            <div className="card-content">
              <div className="achievements-grid">
                <div className="achievement">
                  <div className="achievement-icon achievement-gold">
                    <Award size={24} />
                  </div>
                  <span>Top Contributor</span>
                </div>
                <div className="achievement">
                  <div className="achievement-icon achievement-blue">
                    <Star size={24} />
                  </div>
                  <span>Rising Star</span>
                </div>
                <div className="achievement">
                  <div className="achievement-icon achievement-green">
                    <BookOpen size={24} />
                  </div>
                  <span>Mentor</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="button button-ghost full-width">
                View all achievements
              </button>
            </div>
          </div>
        </div>

        <div className="profile-main">
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

          {/* Posts Tab */}
          <div
            className={`tab-content ${activeTab === "posts" ? "active" : ""}`}
          >
            <div className="card">
              <div className="card-header post-header">
                <div className="post-author">
                  <div className="post-avatar">
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Sarah Chen"
                    />
                  </div>
                  <div>
                    <h3>Sarah Chen</h3>
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
                  collaboration! Check it out and let me know what you think.
                </p>
                <div className="post-image-container">
                  <img
                    src="/placeholder.svg?height=300&width=600"
                    alt="Project screenshot"
                    className="post-image"
                  />
                  <div className="post-image-caption">
                    <h4>Community Collab Tool</h4>
                    <p>github.com/sarahchen/community-collab</p>
                  </div>
                </div>
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

            <div className="card">
              <div className="card-header post-header">
                <div className="post-author">
                  <div className="post-avatar">
                    <img src={profileImage} alt="Sarah Chen" />
                  </div>
                  <div>
                    <h3>Sarah Chen</h3>
                    <p className="post-time">1 week ago</p>
                  </div>
                </div>
                <button className="button button-icon">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="card-content">
                <p className="post-text">
                  I've been exploring new animation libraries for React. Here
                  are my thoughts on the top 3 options for creating smooth,
                  performant animations in your web apps...
                </p>
              </div>
              <div className="card-footer post-actions">
                <div className="post-reactions">
                  <button className="button button-ghost">
                    <Heart size={16} />
                    <span>89</span>
                  </button>
                  <button className="button button-ghost">
                    <MessageSquare size={16} />
                    <span>17</span>
                  </button>
                </div>
                <button className="button button-ghost">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <button className="button button-outline full-width load-more">
              Load more posts
            </button>
          </div>

          {/* Projects Tab */}
          <div
            className={`tab-content ${
              activeTab === "projects" ? "active" : ""
            }`}
          >
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-image">
                  <img
                    src="/placeholder.svg?height=160&width=320"
                    alt="Project screenshot"
                  />
                  <div className="project-badge">Active</div>
                </div>
                <div className="project-details">
                  <h3>Community Collab Tool</h3>
                  <p className="project-description">
                    Open-source collaboration platform
                  </p>
                  <p className="project-summary">
                    A platform for developers to find collaborators for
                    open-source projects and share ideas.
                  </p>
                  <div className="project-footer">
                    <div className="project-collaborators">
                      <div className="collaborator">A</div>
                      <div className="collaborator">B</div>
                      <div className="collaborator">C</div>
                    </div>
                    <button className="button button-ghost">
                      <ExternalLink size={16} />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image project-image-orange">
                  <img
                    src="/placeholder.svg?height=160&width=320"
                    alt="Project screenshot"
                  />
                  <div className="project-badge">Completed</div>
                </div>
                <div className="project-details">
                  <h3>React Animation Library</h3>
                  <p className="project-description">UI animation toolkit</p>
                  <p className="project-summary">
                    A lightweight animation library for React applications with
                    a focus on performance.
                  </p>
                  <div className="project-footer">
                    <div className="project-collaborators">
                      <div className="collaborator">S</div>
                      <div className="collaborator">T</div>
                    </div>
                    <button className="button button-ghost">
                      <ExternalLink size={16} />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="button button-outline full-width load-more">
              View all projects
            </button>
          </div>

          {/* Endorsements Tab */}
          <div
            className={`tab-content ${
              activeTab === "endorsements" ? "active" : ""
            }`}
          >
            <div className="card">
              <div className="card-header endorsement-header">
                <div className="endorser">
                  <div className="endorser-avatar">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Alex Johnson"
                    />
                  </div>
                  <div>
                    <h3>Alex Johnson</h3>
                    <p>Senior Developer at TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="endorsement-text">
                  "Sarah is an exceptional developer with a keen eye for detail.
                  We worked together on the Community Collab Tool, and her
                  contributions were invaluable. Her expertise in React and
                  TypeScript significantly improved our codebase."
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">UI Design</span>
                </div>
              </div>
              <div className="card-footer endorsement-date">
                <Calendar size={12} /> Endorsed 3 months ago
              </div>
            </div>

            <div className="card">
              <div className="card-header endorsement-header">
                <div className="endorser">
                  <div className="endorser-avatar">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Maya Patel"
                    />
                  </div>
                  <div>
                    <h3>Maya Patel</h3>
                    <p>UX Designer at DesignHub</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="endorsement-text">
                  "Working with Sarah was a pleasure. She has a unique ability
                  to bridge the gap between design and development. Her
                  attention to detail and commitment to creating accessible
                  interfaces made our collaboration seamless."
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">Collaboration</span>
                  <span className="skill-tag">Accessibility</span>
                  <span className="skill-tag">UI/UX</span>
                </div>
              </div>
              <div className="card-footer endorsement-date">
                <Calendar size={12} /> Endorsed 5 months ago
              </div>
            </div>

            <button className="button button-outline full-width load-more">
              View all endorsements
            </button>
          </div>

          {/* Activity Tab */}
          <div
            className={`tab-content ${
              activeTab === "activity" ? "active" : ""
            }`}
          >
            <div className="card">
              <div className="card-header">
                <h2>Recent Activity</h2>
              </div>
              <div className="card-content">
                <div className="activity-item">
                  <div className="activity-icon activity-green">
                    <Star size={16} />
                  </div>
                  <div className="activity-details">
                    <p>
                      <span className="activity-highlight">
                        Started a new project
                      </span>{" "}
                      - React Animation Library
                    </p>
                    <p className="activity-time">2 days ago</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon activity-blue">
                    <ThumbsUp size={16} />
                  </div>
                  <div className="activity-details">
                    <p>
                      <span className="activity-highlight">
                        Received an endorsement
                      </span>{" "}
                      from Alex Johnson
                    </p>
                    <p className="activity-time">1 week ago</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon activity-purple">
                    <Award size={16} />
                  </div>
                  <div className="activity-details">
                    <p>
                      <span className="activity-highlight">
                        Earned achievement
                      </span>{" "}
                      - Top Contributor
                    </p>
                    <p className="activity-time">2 weeks ago</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon activity-gold">
                    <MessageSquare size={16} />
                  </div>
                  <div className="activity-details">
                    <p>
                      <span className="activity-highlight">Commented on</span>{" "}
                      Maya Patel's post about UI design patterns
                    </p>
                    <p className="activity-time">3 weeks ago</p>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="button button-ghost full-width">
                  View full activity log
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
