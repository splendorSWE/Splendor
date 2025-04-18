import React from "react";
import "./pageStyles/Rules.css";
import PageHeader from "../components/PageHeader";
import { useAuthContext } from "../context/AuthContext";

export default function Rules() {
  const user = useAuthContext();
  return (
    <>
    <PageHeader title="Rules" home={true} userauth={!user} profile={user || user.isAnonymous}/>
    <div className="rules-page">
      
      <main className="rules-content">
        <h1>Splendor Rules</h1>
        <p>
          Welcome to Splendor! In this game, you'll collect gems and cards to earn prestige points. The objective is to strategically acquire resources and build your collection.
        </p>
        <h2>Basic Gameplay</h2>
        <ul>
          <li>Collect gems on your turn.</li>
          <li>Purchase cards to increase your resource pool.</li>
          <li>Reserve cards for future moves.</li>
          <li>Accumulate prestige points to win the game.</li>
        </ul>
        <p>
          For a full explanation of the rules, please refer to the official Splendor rulebook.
        </p>
      </main>
    </div>
    </>
  );
}
