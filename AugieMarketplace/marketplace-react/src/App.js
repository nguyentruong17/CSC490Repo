import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import { signInWithGoogle, auth } from "./firebase/firebase"

function App() {
  const [idToken, setIdToken] = useState(null)

  function signIn() {
    signInWithGoogle()
  }

  function signOut() {
    auth.signOut()
  }

  useEffect(() => {
    /*
     *
     * We save the id token using state for the sake of updating our React app
     * and for convenience. 
     * 
     * By accessing the token using getIdToken, we don't have to worry about
     * storing it in localStorage or worrying about it expiring. 
     * 
     * 
     */
    auth.onAuthStateChanged(async nextUser => {
      console.log("currentUser changed to:", nextUser)

      if (auth.currentUser) {
        setIdToken(await auth.currentUser.getIdToken())
      } else {
        setIdToken(null)
      }

      console.log("idToken changed to:", idToken)
    })
  }, [])

  return (
    <div className="App">
      <p>{auth.currentUser ? auth.currentUser.displayName + " is signed in" : "Please sign in"}</p>

      <button onClick={signIn}>Sign in with Google</button>
      <button onClick={signOut}>Sign me out</button>

      <p>The ID token is:</p>
      <code>{auth.currentUser ? idToken : "Please sign in"}</code>
    </div>
  );
}

export default App;