import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
function Admin() {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState();
  const logOut = async function () {
    await signOut(auth);
    setAdmin(false);
  };
  const signIn = async function () {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((e) => {})
      .catch((e) => console.log(`${e}, error`));
  };
  const admincheck = async function () {
    const docRef = doc(db, "admin", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAdmin(docSnap.data().isAdmin);
    } else {
      setAdmin(false);
    }
  };
  const CheckUser = function () {
    if (user) {
      admincheck();
      return <li onClick={logOut}>Sign Out</li>;
    } else {
      return <li onClick={signIn}>Sign In</li>;
    }
  };

  return (
    <>
      <CheckUser />
      {admin ? (
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      ) : null}
    </>
  );
}

export default Admin;
