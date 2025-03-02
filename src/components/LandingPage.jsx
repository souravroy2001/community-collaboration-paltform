"use client";

import { useContext, useState } from "react";
import "./LandingPage.css";
import ResourcesSection from "./ResourcesSection";
import { Link } from "react-router";
import { Image } from "@chakra-ui/react";
import { ThemeProvider } from "@/context/ThemeAuth";

export default function LandingPage() {
  const { theme } = useContext(ThemeProvider);

  return (
    <div
      className="landing-container"
      style={{
        background: theme ? "#e4e4e7" : "#0f172a",
      }}
    >
      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <div
              className="hero-text"
              style={{ color: theme ? "#000" : "#fff" }}
            >
              <span className="badge" style={{ color: "#000" }}>
                Join our growing community
              </span>
              <h1
                className="hero-title"
                style={{ color: theme ? "#000" : "#fff" }}
              >
                Your Gateway to Learning and Growth
              </h1>
              <p className="hero-description">
                Whether you're here to explore coding, enhance your skills, or
                connect with like-minded learners, you've come to the right
                place. Let's build, learn, and grow together!
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-lg">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon-right"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <button
                  style={{ border: theme ? "1px solid #000" : "" }}
                  className="btn btn-outline btn-lg"
                >
                  Explore Resources
                </button>
              </div>
              <div className="member-count">
                <div className="avatar-group">
                  <img
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Member"
                    className="avatar"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                    alt="Member"
                    className="avatar"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/56.jpg"
                    alt="Member"
                    className="avatar"
                  />
                  <div style={{ color: "#000" }} className="avatar avatar-more">
                    +5
                  </div>
                </div>
                <div className="member-text">
                  Join over{" "}
                  <span
                    style={{ color: theme ? "#000" : "#fff" }}
                    className="highlight"
                  >
                    5,000+
                  </span>{" "}
                  members already learning
                </div>
              </div>
            </div>
            <div className="hero-image-container">
              <img
                src={"/hero-image.png"}
                alt="Community Collaboration"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div
            className="section-header"
            style={{ color: theme ? "#000" : "#fff" }}
          >
            <span className="badge" style={{ color: "#000" }}>
              Features
            </span>
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-description">
              Our platform provides all the tools and resources you need to
              enhance your skills and connect with others.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-column">
              <div className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feature-icon"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <h3 className="feature-title">Interactive Learning</h3>
                  </div>
                </div>
                <div className="feature-content">
                  <p className="feature-description">
                    Access interactive tutorials, courses, and learning paths
                    tailored to your skill level and interests.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feature-icon"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3 className="feature-title">Community Support</h3>
                  </div>
                </div>
                <div className="feature-content">
                  <p className="feature-description">
                    Connect with mentors and peers who can help you overcome
                    challenges and accelerate your growth.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feature-icon"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <h3 className="feature-title">Collaborative Projects</h3>
                  </div>
                </div>
                <div className="feature-content">
                  <p className="feature-description">
                    Work on real-world projects with other members to build your
                    portfolio and gain practical experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-column">
              <div className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feature-icon"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <h3 className="feature-title">Discussion Forums</h3>
                  </div>
                </div>
                <div className="feature-content">
                  <p className="feature-description">
                    Engage in meaningful discussions about topics that interest
                    you and learn from diverse perspectives.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feature-icon"
                    >
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <h3 className="feature-title">Achievements & Badges</h3>
                  </div>
                </div>
                <div className="feature-content">
                  <p className="feature-description">
                    Track your progress and earn recognition for your
                    accomplishments with our gamified learning system.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feature-icon"
                    >
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    <h3 className="feature-title">
                      Personalized Recommendations
                    </h3>
                  </div>
                </div>
                <div className="feature-content">
                  <p className="feature-description">
                    Receive customized content and resource suggestions based on
                    your interests and learning goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="community-section">
          <div
            className="section-header"
            style={{ color: theme ? "#000" : "#fff" }}
          >
            <span className="badge" style={{ color: "#000" }}>
              Community
            </span>
            <h2 className="section-title">Join a Thriving Community</h2>
            <p className="section-description">
              Connect with like-minded individuals who share your passion for
              learning and growth.
            </p>
          </div>

          <div className="community-grid">
            <div className="community-card">
              <div className="community-card-header">
                <h3 className="community-card-title">Study Groups</h3>
                <p className="community-card-subtitle">
                  Join or create study groups focused on specific topics or
                  technologies.
                </p>
              </div>
              <div className="community-card-content">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Study Group"
                  className="community-image"
                />
                <p className="community-stat">
                  Currently <span className="highlight">120+</span> active study
                  groups
                </p>
              </div>
              <div className="community-card-footer">
                <button className="btn btn-primary btn-full">
                  Browse Groups
                </button>
              </div>
            </div>

            <div className="community-card">
              <div className="community-card-header">
                <h3 className="community-card-title">Mentorship</h3>
                <p className="community-card-subtitle">
                  Connect with experienced mentors who can guide your learning
                  journey.
                </p>
              </div>
              <div className="community-card-content">
                <img
                  src="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Mentorship"
                  className="community-image"
                />
                <p className="community-stat">
                  Over <span className="highlight">500+</span> mentors available
                </p>
              </div>
              <div className="community-card-footer">
                <button className="btn btn-primary btn-full">
                  Find a Mentor
                </button>
              </div>
            </div>

            <div className="community-card">
              <div className="community-card-header">
                <h3 className="community-card-title">Events & Workshops</h3>
                <p className="community-card-subtitle">
                  Participate in virtual events, workshops, and hackathons.
                </p>
              </div>
              <div className="community-card-content">
                <img
                  src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Events"
                  className="community-image"
                />
                <p className="community-stat">
                  <span className="highlight">20+</span> events scheduled this
                  month
                </p>
              </div>
              <div className="community-card-footer">
                <button className="btn btn-primary btn-full">
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </section>

        <ResourcesSection />

        <section id="cta" className="cta-section">
          <div className="cta-content">
            <div
              className="section-header"
              style={{ color: theme ? "#000" : "#fff" }}
            >
              <h2 className="section-title cta-title">
                Ready to Start Your Journey?
              </h2>
              <p className="section-description cta-description">
                Join thousands of learners who are already building their skills
                and connecting with others.
              </p>
            </div>
            <div className="cta-buttons">
              <button
                className="btn btn-secondary btn-lg"
                style={{ background: "#fff", color: "#000" }}
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon-right"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                style={{
                  background: theme ? "transparent" : "#000",
                  color: theme ? "#000" : "#fff",
                  border: theme ? "1px solid #333" : "1px solid #000",
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="faq-section"
          style={{
            background: theme ? "#e9ebef" : "#69707d",
          }}
        >
          <div
            className="section-header"
            style={{ color: theme ? "#000" : "#fff" }}
          >
            <span className="badge" style={{ color: "#333" }}>
              FAQ
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Find answers to common questions about our platform.
            </p>
          </div>

          <div className="faq-grid">
            {[
              {
                question: "Is membership free?",
                answer:
                  "Yes, basic membership is completely free. We also offer premium plans with additional features and resources for those who want to accelerate their learning journey.",
              },
              {
                question: "How do I join a study group?",
                answer:
                  "You can browse available study groups in the 'Community' section and request to join any that interest you. You can also create your own study group if you don't find one that matches your needs.",
              },
              {
                question: "Can I become a mentor?",
                answer:
                  "If you have expertise in a particular area and want to help others learn, you can apply to become a mentor through your profile settings.",
              },
              {
                question: "How are the learning paths structured?",
                answer:
                  "Our learning paths are designed to take you from beginner to advanced levels in a structured way. Each path consists of multiple courses, projects, and assessments to ensure comprehensive learning.",
              },
              {
                question: "Can I track my progress?",
                answer:
                  "Yes, you can track your progress through your personal dashboard. It shows your completed courses, ongoing projects, earned badges, and recommendations for what to learn next.",
              },
              {
                question: "Is there a mobile app available?",
                answer:
                  "Yes, we have mobile apps available for both iOS and Android platforms, allowing you to learn on the go and stay connected with the community.",
              },
            ].map((faq, index) => (
              <div className="faq-card" key={index}>
                <div className="faq-header">
                  <h3 className="faq-question">{faq.question}</h3>
                </div>
                <div className="faq-content">
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer
        className="footer"
        style={{
          background: theme ? "#e4e4e7" : "#0f172a",
          color: theme ? "#000" : "#fff",
          borderTop: theme ? "1px solid #ccc" : "1px solid #ccc",
        }}
      >
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <Link to={"/"}>
                <Image
                  src={
                    theme
                      ? "https://souravlife.com/wp-content/uploads/2024/09/a-logo-for-sourav-roy-with-subtle-tech-inspired-el-hqK357erTi-pPerV4yEa8Q-DdmIt3WnRX2tO4sjiJfgcg-removebg-preview-1.png"
                      : "https://souravlife.com/work/library/image/Sourav%20Roy%20White%20Red%20Logo.png"
                  }
                  w={"100px"}
                />
              </Link>
            </div>
            <p
              className="footer-description"
              style={{
                color: theme ? "#000" : "#fff",
              }}
            >
              Your gateway to learning and growth. Connect, collaborate, and
              enhance your skills with our community.
            </p>
            <div className="social-links">
              <a
                href="#"
                style={{ color: theme ? "#000" : "#fff" }}
                className="social-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="social-link"
                style={{
                  color: theme ? "#000" : "#fff",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Platform</h3>
              <ul className="footer-list">
                <li>
                  <a href="#" className="footer-link">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-list">
                <li>
                  <a href="#" className="footer-link">
                    Learning Paths
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Community</h3>
              <ul className="footer-list">
                <li>
                  <a href="#" className="footer-link">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contribute
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-list">
                <li>
                  <a href="#" className="footer-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{ borderTop: theme ? "1px solid #ccc" : "1px solid #ccc" }}
        >
          <div className="footer-bottom-content">
            <p
              className="copyright"
              style={{
                color: theme ? "#000" : "#fff",
              }}
            >
              &copy; {new Date().getFullYear()} LearnTogether. All rights
              reserved.
            </p>
            <nav className="footer-nav">
              <a href="#" className="footer-nav-link">
                Terms
              </a>
              <a href="#" className="footer-nav-link">
                Privacy
              </a>
              <a href="#" className="footer-nav-link">
                Cookies
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
