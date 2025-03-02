import { createContext, useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { LogAuthContext } from "./LogAuth";
import axios from "axios"; // Import Axios for API calls

export const ProfileProvider = createContext(null);

export default function ProfileContext({ children }) {
  const { currentUser } = useContext(LogAuthContext);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState("No Bio");
  const [tempAboutText, setTempAboutText] = useState(aboutText);

  // Default images
  const defaultCoverImage = "/Default_Cover_Image.png";
  const defaultProfileImage = "/Default Profile Image In White Color.svg";

  // Image states
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [coverImage, setCoverImage] = useState(defaultCoverImage);

  // Additional profile fields
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [endorsements, setEndorsements] = useState([]);
  const [activity, setActivity] = useState([]);

  // References for file inputs
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  // API base URL
  const API_URL = `https://masai-hackathon-2025-default-rtdb.firebaseio.com/community/users/${currentUser?.id}.json`;

  // Function to update user data in Firebase
  const updateUserData = async (data) => {
    try {
      await axios.patch(API_URL, data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Handle follow/unfollow
  const handleFollowToggle = () => {
    setFollowing((prev) => !prev);
    updateUserData({ following: !following });
  };

  // Handle tab change
  const handleTabChange = (tab) => setActiveTab(tab);

  // Handle About Section
  const handleEditAbout = () => {
    setIsEditingAbout(true);
    setTempAboutText(aboutText);
  };

  const handleSaveAbout = () => {
    setAboutText(tempAboutText);
    setIsEditingAbout(false);
    updateUserData({ bio: tempAboutText });
  };

  const handleCancelEditAbout = () => setIsEditingAbout(false);

  // Handle profile and cover image changes
  const handleImageChange = (event, setImage, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        updateUserData({ [fieldName]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => profileImageInputRef.current.click();
  const handleCoverImageClick = () => coverImageInputRef.current.click();

  // Load user data on component mount
  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser.photoURL || defaultProfileImage);
      setCoverImage(currentUser.coverImage || defaultCoverImage);
      setAboutText(currentUser.bio || "No Bio");
      setFollowing(currentUser.following || false);
      setSkills(currentUser.skills || []);
      setAchievements(currentUser.achievements || []);
      setPosts(currentUser.posts || []);
      setProjects(currentUser.projects || []);
      setEndorsements(currentUser.endorsements || []);
      setActivity(currentUser.activity || []);
    }
  }, [currentUser]);

  // Context value
  const value = {
    following,
    activeTab,
    isEditingAbout,
    aboutText,
    tempAboutText,
    profileImage,
    coverImage,
    skills,
    achievements,
    posts,
    projects,
    endorsements,
    activity,
    profileImageInputRef,
    coverImageInputRef,
    handleFollowToggle,
    handleTabChange,
    handleEditAbout,
    handleSaveAbout,
    handleCancelEditAbout,
    handleProfileImageClick,
    handleCoverImageClick,
    handleProfileImageChange: (e) =>
      handleImageChange(e, setProfileImage, "photoURL"),
    handleCoverImageChange: (e) =>
      handleImageChange(e, setCoverImage, "coverImage"),
    setTempAboutText,
  };

  return (
    <ProfileProvider.Provider value={value}>
      {children}
    </ProfileProvider.Provider>
  );
}
