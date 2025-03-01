import { createContext, useRef, useState } from "react";
import defaultCoverImage from "../../public/Default_Cover_Image.png";
export const ProfileProvider = createContext(null);

export default function ProfileContext({ children }) {
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(
    "Full-stack developer passionate about creating collaborative tools and open-source projects. I love working with React, Node.js, and exploring new technologies."
  );
  const [tempAboutText, setTempAboutText] = useState(aboutText);

  // References for file inputs
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  // State for images
  const [profileImage, setProfileImage] = useState(
    "/Default Profile Image In White Color.svg"
  );
  const [coverImage, setCoverImage] = useState(defaultCoverImage);

  const handleFollowToggle = () => {
    setFollowing(!following);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditAbout = () => {
    setIsEditingAbout(true);
    setTempAboutText(aboutText);
  };

  const handleSaveAbout = () => {
    setAboutText(tempAboutText);
    setIsEditingAbout(false);
  };

  const handleCancelEditAbout = () => {
    setIsEditingAbout(false);
  };

  const handleProfileImageClick = () => {
    profileImageInputRef.current.click();
  };

  const handleCoverImageClick = () => {
    coverImageInputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const value = {
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
  };

  return <ProfileProvider value={value}>{children}</ProfileProvider>;
}
