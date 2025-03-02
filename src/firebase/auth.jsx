import axios from "axios";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";

async function registerUser(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update the user profile with the display name
    await updateProfile(user, { displayName: name });

    // Create an object with user details
    const userObj = {
      uid: user.uid,
      name: name,
      email: user.email,
      createdAt: new Date().toISOString(),
      photoURL: "",
      bio: "",
      following: [],
      follow: [],
      provider: "email&Password",
    };

    // Post user data to Firebase Realtime Database
    await postUser(userObj);
    alert("Registration successful!");
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    if (error.code === "auth/email-already-in-use") {
      alert("User is already registered. Please log in.");
    } else if (error.code === "auth/weak-password") {
      alert("Password is too weak. Please use a stronger password.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format. Please enter a valid email.");
    } else {
      alert(`Registration failed: ${error.message}`);
    }
    throw error;
  }
}

async function postUser(userObj) {
  try {
    const response = await axios.post(
      "https://masai-hackathon-2025-default-rtdb.firebaseio.com/community/users.json",
      userObj
    );

    if (!response.ok) {
      throw new Error("Failed to save user data.");
    }

    const data = await response.json();
    console.log("User data posted successfully:", data);
  } catch (error) {
    console.error("Error posting user data:", error.message);
  }
}

async function registerWithGoogleUser() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.displayName) {
      await updateProfile(user, { displayName: "Google User" });
    }

    const userObj = {
      uid: user.uid,
      name: user.displayName || "Google User",
      email: user.email,
      photoURL: user.photoURL || "",
      createdAt: new Date().toISOString(),
      provider: "google",
      bio: "",
      following: [],
      follow: [],
      achievements: [],
      skills: [],
      projects: [],
      endorsements: [],
      activity: [],
    };

    await postUser(userObj);

    window.location.href = "/";

    return result;
  } catch (error) {
    console.error("Error with Google sign-in:", error.message);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
    window.location.href = "/";
    alert("Login successful!");
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);

    if (error.code === "auth/invalid-credential") {
      alert("Invalid email or password. Please try again.");
    } else if (error.code === "auth/user-not-found") {
      alert("User not found. Please register first.");
    } else if (error.code === "auth/wrong-password") {
      alert("Incorrect password. Please try again.");
    } else if (error.code === "auth/too-many-requests") {
      alert("Too many failed login attempts. Try again later.");
    } else {
      alert(`Login failed: ${error.message}`);
    }

    throw error;
  }
}

async function loginWithGoogleUser() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    window.location.href = "/";
    return result.user;
  } catch (error) {
    console.error("Error with Google login:", error.message);
    throw error;
  }
}

async function doSignout() {
  return signOut(auth)
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
}

function doPasswordReset(email) {
  try {
    return sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
}

function doPasswordChange(password) {
  if (!auth.currentUser) {
    throw new Error("No user is currently logged in.");
  }
  try {
    return updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Error updating password:", error.message);
    throw error;
  }
}

function doSendEmailVerification() {
  if (!auth.currentUser) {
    throw new Error("No user is currently logged in.");
  }
  try {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
  } catch (error) {
    console.error("Error sending email verification:", error.message);
    throw error;
  }
}

export {
  registerUser,
  loginUser,
  registerWithGoogleUser,
  doSignout,
  doPasswordReset,
  doPasswordChange,
  doSendEmailVerification,
  loginWithGoogleUser,
};
