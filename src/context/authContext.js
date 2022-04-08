import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { child, push, ref, set } from "firebase/database";

import { createContext, useContext, useMemo, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = createContext({
  user: null,
  signUpWithEmail: () => {},
  signInWithGmail: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  });

  const signUpWithEmail = async ({ email, password }) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      storeUser(response?.user)
    } catch (error) {
      alert(error?.message);
    }
  };

  const signInWithGmail = async () => {
    try {
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider);
      storeUser(response?.user)
    } catch (error) {
      alert(error?.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error?.message);
    }
  };

  const storeUser = userData => {
    let data = {
        displayName: userData?.displayName,
        email: userData?.email,
        photoURL: userData?.photoURL,  
    }
    set(ref(db, `users/${userData?.uid}`), data);
  }

  const info = useMemo(
    () => ({
      user: user,
      signUpWithEmail,
      signInWithGmail,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={info}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
