import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/Login";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Community from "./components/Community";
import Profile from "./components/Profile";
import PostCreator from "./components/PostCreator";
import LandingPage from "./components/LandingPage";

import Profile from "./components/Profile";
import CommunityPage from "./components/CommunityPage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/post-creator" element={<PostCreator />} />
        <Route path="/leading-page" element={<LandingPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/community"
          element={
            <ProtectedRoutes>
              <Community />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/post-creator"
          element={
            <ProtectedRoutes>
              {" "}
              <PostCreator />{" "}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              {" "}
              <Home />{" "}
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              {" "}
              <Profile />{" "}
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
