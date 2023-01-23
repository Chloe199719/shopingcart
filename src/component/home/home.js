import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

// const fetchdata = async function () {
//   await getDocs(collection(db, "shopItem")).then((querySnapshot) => {
//     const newData = querySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }));
//     console.log(newData);
//   });
// };
function Home(props) {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState();
  const signin = function () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  function Log() {
    if (user) {
      admincheck();
      return (
        <div>
          <p>
            Current User: {user.displayName} {user.uid}
          </p>
        </div>
      );
    }
  }
  const admincheck = async function () {
    const docRef = doc(db, "admin", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAdmin(docSnap.data().isAdmin);
    } else {
      setAdmin(false);
    }
  };
  const logOut = async function () {
    await signOut(auth);
    setAdmin(false);
  };
  return (
    <main>
      <section className="info">
        <h2>Our Mission</h2>
        <div className="context">
          <p>
            Bring Stuffed Animals to all boys and girls woman and men and
            nonbinary folks no matter your identify or how you identify our goal
            is bring a smile to everyone with our affordable prices
          </p>
          <p>You can buy it here Online or in our Local store In Munich also</p>
        </div>
        <h2>Bring a smile</h2>
        <div className="context">
          <p>
            We have Project for each Stuffed Animal Sold in our Online shop we
            donate 1$ to the TransYouth Foundation and every 10 animals sold we
            also donate a stuffed animal to the same assosiation{" "}
          </p>
        </div>
        {/* <h2>Test section</h2>
        <div className="context">
          <p>
            <button onClick={signin}>Sign In</button>

            <button onClick={logOut}>Sign signOut</button>
            <button>Log</button>
            {admin ? <Link to="/admin">admin</Link> : null}
          </p>
          <Log />
        </div> */}
      </section>
    </main>
  );
}

export default Home;
