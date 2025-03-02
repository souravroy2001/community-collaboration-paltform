import React, { useState } from "react";
import { Edit, Award, Star, BookOpen, Save, X } from "lucide-react";

const ProfileSidebar = ({
  isEditingAbout,
  aboutText,
  tempAboutText,
  handleEditAbout,
  handleSaveAbout,
  handleCancelEditAbout,
  setTempAboutText,
}) => {
  // Editable Skills State
  const [skills, setSkills] = useState([
    { name: "React", level: "Advanced", width: "92%" },
    { name: "Node.js", level: "Intermediate", width: "75%" },
    { name: "UI/UX Design", level: "Intermediate", width: "68%" },
    { name: "TypeScript", level: "Advanced", width: "88%" },
  ]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [tempSkills, setTempSkills] = useState([...skills]);

  // Editable Achievements State
  const [achievements, setAchievements] = useState([
    { icon: <Award size={24} />, text: "Top Contributor", className: "achievement-gold" },
    { icon: <Star size={24} />, text: "Rising Star", className: "achievement-blue" },
    { icon: <BookOpen size={24} />, text: "Mentor", className: "achievement-green" },
  ]);
  const [isEditingAchievements, setIsEditingAchievements] = useState(false);
  const [tempAchievements, setTempAchievements] = useState([...achievements]);

  // Save & Cancel Functions
  const saveSkills = () => {
    setSkills(tempSkills);
    setIsEditingSkills(false);
  };

  const saveAchievements = () => {
    setAchievements(tempAchievements);
    setIsEditingAchievements(false);
  };

  return (
    <div className="profile-sidebar">
      {/* About Section */}
      <div className="card">
        <div className="card-header">
          <h2>About</h2>
          {!isEditingAbout && (
            <button className="button button-icon" onClick={handleEditAbout}>
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
        </div>
      </div>

      {/* Skills Section */}
      <div className="card">
        <div className="card-header">
          <h2>Skills</h2>
          {!isEditingSkills && (
            <button
              className="button button-icon"
              onClick={() => setIsEditingSkills(true)}
            >
              <Edit size={16} />
            </button>
          )}
        </div>
        <div className="card-content">
          {isEditingSkills
            ? tempSkills.map((skill, index) => (
                <div className="skill" key={index}>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      setTempSkills(
                        tempSkills.map((s, i) =>
                          i === index ? { ...s, name: e.target.value } : s
                        )
                      )
                    }
                  />
                  <input
                    type="text"
                    value={skill.level}
                    onChange={(e) =>
                      setTempSkills(
                        tempSkills.map((s, i) =>
                          i === index ? { ...s, level: e.target.value } : s
                        )
                      )
                    }
                  />
                </div>
              ))
            : skills.map((skill, index) => (
                <div className="skill" key={index}>
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: skill.width }}
                    ></div>
                  </div>
                </div>
              ))}
        </div>
        {isEditingSkills && (
          <div className="card-footer">
            <button className="button button-primary" onClick={saveSkills}>
              <Save size={16} /> Save
            </button>
            <button
              className="button button-outline"
              onClick={() => setIsEditingSkills(false)}
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="card achievements-card">
        <div className="card-header">
          <h2>Achievements</h2>
          {!isEditingAchievements && (
            <button
              className="button button-icon"
              onClick={() => setIsEditingAchievements(true)}
            >
              <Edit size={16} />
            </button>
          )}
        </div>
        <div className="card-content achievements-card">
          {isEditingAchievements
            ? tempAchievements.map((achievement, index) => (
                <div className="achievement" key={index}>
                  <input
                    type="text"
                    value={achievement.text}
                    onChange={(e) =>
                      setTempAchievements(
                        tempAchievements.map((ach, i) =>
                          i === index ? { ...ach, text: e.target.value } : ach
                        )
                      )
                    }
                  />
                </div>
              ))
            : achievements.map((achievement, index) => (
                <div className="achievement" key={index}>
                  <div className={`achievement-icon ${achievement.className}`}>
                    {achievement.icon}
                  </div>
                  <span>{achievement.text}</span>
                </div>
              ))}
        </div>
        {isEditingAchievements && (
          <div className="card-footer">
            <button
              className="button button-primary"
              onClick={saveAchievements}
            >
              <Save size={16} /> Save
            </button>
            <button
              className="button button-outline"
              onClick={() => setIsEditingAchievements(false)}
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
