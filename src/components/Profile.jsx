import React, { useContext } from "react";
import { LogAuthContext } from "@/context/LogAuth";
import { ProfileProvider } from "@/context/ProfileContext";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";
import ProfileMainContent from "./ProfileMainContent";
import "./ProfilePage.css";
import { doSignout } from "@/firebase/auth";

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
      <ProfileHeader
        coverImage={coverImage}
        profileImage={profileImage}
        currentUser={currentUser}
        following={following}
        ProfileHeader={ProfileHeader}
        profileImageInputRef={profileImageInputRef}
        handleCoverImageClick={handleCoverImageClick}
        handleProfileImageClick={handleProfileImageClick}
        handleFollowToggle={handleFollowToggle}
        doSignout={doSignout}
      />
      <div className="profile-content">
        <ProfileSidebar
          isEditingAbout={isEditingAbout}
          aboutText={aboutText}
          tempAboutText={tempAboutText}
          handleEditAbout={handleEditAbout}
          handleSaveAbout={handleSaveAbout}
          handleCancelEditAbout={handleCancelEditAbout}
          setTempAboutText={setTempAboutText}
        />
        <ProfileMainContent
          activeTab={activeTab}
          profileImage={profileImage}
          currentUser={currentUser}
          handleTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}

export default Profile;
