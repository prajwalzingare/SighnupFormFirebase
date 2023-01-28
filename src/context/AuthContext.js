import React, { useContext, useState, useEffect } from "react";

//importing auth from firebase folder
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//we created context
const AuthContext = React.createContext();

//we create function useAuth that allows us to use this context. we got acess to Authcontext through useauth function
export function useAuth() {
  return useContext(AuthContext);
}

// we are not exporting default.we change the name of function as it is not default export.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //we are gonna use that auth module to sighnup the user.by creating the function sighnup.
  function sighnup(email, password) {
    //it will create user with email and password. by this we are not setting the user we are only creating it for setting the user firebase auth have another method further down below.
    return createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    return signOut(auth)
      .then(() => {
        console.log("sighnout succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //useeffect after components get mounted.
  useEffect(() => {
    //this method set the user and notifi that user gets set.it allows us to set the user.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    //it is going to unsubscribe form the event when we unmount the component
    /* Why Do You Need to Unsubscribe an Action? It's possible that when one component loads, it can trigger many actions. The action will be subscribing until a response comes, which can lead to a huge bottleneck or memory leaks. So, its always advisable to unsubscribe an action as soon as the component gets unmounted. */

    return unsubscribe; //after returning it will get out of the loop indirectly it will stop the loop or function and usubscribe from action.
  }, []);

  //object of values that we willl pass to sighnup component.in order to use that in that component.
  const value = {
    currentUser,
    sighnup,
    login,
    logout,
  };

  //auth provider is going to provide value.we are writinig the current user through value.
  return (
    <AuthContext.Provider value={value}>
      {" "}
      {!loading && children}
    </AuthContext.Provider>
  );
}
