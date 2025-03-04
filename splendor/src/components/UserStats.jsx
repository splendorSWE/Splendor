import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const snapshot = await get(ref(db, "users/" + userId));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserInfo({
            username: data.username,
            createdAt: new Date(data.createdAt).toLocaleDateString(),
            wins: data.wins,
          });
        } else {
          console.log("No user data found!");
        }
      } else {
        setUserInfo("No User")
      }
    };

    fetchUserInfo();
  }, []);


  if (!userInfo) {
    return <p>Loading your profile...</p>;
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      {(userInfo !== "No User") ? (
      <>
        <h2>User Profile</h2>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Account Created:</strong> {userInfo.createdAt}</p>
        <p><strong>Wins:</strong> {userInfo.wins}</p>
      </>
    ) : (
      <h2>Not signed in</h2>
    )}
    </div>
  );
}
