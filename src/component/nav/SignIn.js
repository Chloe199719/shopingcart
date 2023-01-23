import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function SignIn() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <li className="userId">
          <span>{user.displayName}</span>
          <img
            referrerPolicy="no-referrer"
            src={user.photoURL}
            alt="Profile Pic"
          />
        </li>
      ) : null}
    </>
  );
}

export default SignIn;
