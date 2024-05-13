import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvQXo5rh_E9qXJ-yDQlhiim61D231qS-s",
  authDomain: "gymspace-6d646.firebaseapp.com",
  projectId: "gymspace-6d646",
  storageBucket: "gymspace-6d646.appspot.com",
  messagingSenderId: "1046184456499",
  appId: "1:1046184456499:web:849130bc96b449c78a0e46",

  // apiKey: process.env.REACT_APP_apiKey,
  // authDomain: process.env.REACT_APP_authDomain,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingSenderId,
  // appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

export const createUser = async (email, password, navigate, displayName) => {
  // firebase method for registering a new user
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    console.log(userCredential);
  } catch (error) {
    alert(error);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userLogin = await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    console.log(userLogin);
  } catch (error) {
    alert(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
      console.log(user);
    } else {
      setCurrentUser(false);
      console.log("user signed out");
    }
  });
};

export const logOut = (navigate) => {
  signOut(auth);
};

// Google Account Register Auths
// netlify'a deploy ettikten sonra add domain ile domaini eklememiz gerekiyor auth'a

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  // firebase method for sign in with pop up window
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
