import "./LandingPage.css";
import React, { useState } from "react";

const ResourcesSection = () => {
  const [activeTab, setActiveTab] = useState("web-development");

  const coursesData = [
    {
      tab: "web-development",
      label: "Web Development",
      courses: [
        {
          title: "HTML & CSS Fundamentals",
          description: "Learn the building blocks of the web",
          level: "Beginner",
          duration: "4 weeks",
        },
        {
          title: "JavaScript Essentials",
          description: "Master the language of the web",
          level: "Intermediate",
          duration: "6 weeks",
        },
        {
          title: "React Framework",
          description: "Build modern web applications",
          level: "Intermediate",
          duration: "8 weeks",
        },
        {
          title: "Full-Stack Development",
          description: "Connect frontend with backend services",
          level: "Advanced",
          duration: "12 weeks",
        },
        {
          title: "Web Performance",
          description: "Optimize your web applications",
          level: "Advanced",
          duration: "4 weeks",
        },
        {
          title: "Web Accessibility",
          description: "Create inclusive web experiences",
          level: "Intermediate",
          duration: "3 weeks",
        },
      ],
    },
    {
      tab: "data-science",
      label: "Data Science",
      courses: [
        {
          title: "Python for Data Science",
          description: "Learn Python for data analysis",
          level: "Beginner",
          duration: "6 weeks",
        },
        {
          title: "Data Visualization",
          description: "Create compelling visual insights",
          level: "Intermediate",
          duration: "5 weeks",
        },
        {
          title: "Machine Learning Basics",
          description: "Introduction to ML algorithms",
          level: "Intermediate",
          duration: "8 weeks",
        },
        {
          title: "Deep Learning",
          description: "Neural networks and advanced ML",
          level: "Advanced",
          duration: "10 weeks",
        },
        {
          title: "Big Data Processing",
          description: "Work with large-scale datasets",
          level: "Advanced",
          duration: "7 weeks",
        },
        {
          title: "Data Ethics",
          description: "Ethical considerations in data science",
          level: "Intermediate",
          duration: "3 weeks",
        },
      ],
    },
    {
      tab: "mobile-dev",
      label: "Mobile Development",
      courses: [
        {
          title: "React Native Fundamentals",
          description: "Build cross-platform mobile apps",
          level: "Beginner",
          duration: "8 weeks",
        },
        {
          title: "iOS Development with Swift",
          description: "Create native iOS applications",
          level: "Intermediate",
          duration: "10 weeks",
        },
        {
          title: "Android Development with Kotlin",
          description: "Build Android applications",
          level: "Intermediate",
          duration: "10 weeks",
        },
        {
          title: "Mobile UI/UX Design",
          description: "Design intuitive mobile interfaces",
          level: "Intermediate",
          duration: "6 weeks",
        },
        {
          title: "Mobile App Testing",
          description: "Ensure quality in mobile applications",
          level: "Intermediate",
          duration: "4 weeks",
        },
        {
          title: "Progressive Web Apps",
          description: "Create web apps with native-like features",
          level: "Advanced",
          duration: "6 weeks",
        },
      ],
    },
  ];

  const activeCourses =
    coursesData.find((data) => data.tab === activeTab)?.courses || [];

  return (
    <section id="resources" className="resources-section">
      <div className="section-header">
        <span className="badge">Resources</span>
        <h2 className="section-title">Learning Paths & Resources</h2>
        <p className="section-description">
          Explore our curated learning paths and resources to help you achieve
          your goals.
        </p>
      </div>

      <div className="tabs-container">
        <div className="tabs-list">
          {coursesData.map((data) => (
            <button
              key={data.tab}
              className={`tab-button ${activeTab === data.tab ? "active" : ""}`}
              onClick={() => setActiveTab(data.tab)}
            >
              {data.label}
              {console.log(activeTab)}
            </button>
          ))}
        </div>

        <div className="">
          {activeCourses.length === 0 ? (
            <p>No courses available for this category.</p>
          ) : (
            <div className="courses-grid">
              {activeCourses.map((course, index) => (
                <div key={index} className="course-card">
                  <div className="course-header">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-subtitle">{course.description}</p>
                  </div>
                  <div className="course-content">
                    <div className="course-meta">
                      <div>
                        <span className="meta-label">Level:</span>{" "}
                        {course.level}
                      </div>
                      <div>
                        <span className="meta-label">Duration:</span>{" "}
                        {course.duration}
                      </div>
                    </div>
                  </div>
                  <div className="course-footer">
                    <button className="btn btn-outline btn-full">
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
