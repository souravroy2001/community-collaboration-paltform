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

    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
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

async function loginUser(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
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
    };

    await postUser(userObj);

    window.location.href = "/";

    return result;
  } catch (error) {
    console.error("Error with Google sign-in:", error.message);
    throw error;
  }
}

async function doSignout() {
  return signOut(auth)
    .then(() => {
      // Sign-out successful
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
};
