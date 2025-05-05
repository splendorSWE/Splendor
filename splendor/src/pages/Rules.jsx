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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Game Rules</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Objective</h2>
        <p className="text-gray-700">
          The goal of the game is to be the first player to reach <strong>15 prestige points </strong>
          by purchasing development cards and attracting nobles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Turns</h2>
        <p className="text-gray-700 mb-4">On your turn, you may perform <strong>one</strong> of the following actions:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Take 3 tokens</strong> of different colors (only if available).
          </li>
          <li>
            <strong>Take 2 tokens</strong> of the same color (only if 4+ of that token are in the supply).
          </li>
          <li>
            <strong>Reserve a card</strong> and gain 1 wild (gold) token.
          </li>
          <li>
            <strong>Purchase a card</strong> from the table or your reserved area using your tokens and bonuses.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Development Cards</h2>
        <p className="text-gray-700">
          Cards cost tokens to purchase. Once purchased, you obtain a permanent gem in the color that is displayed on the card. You also recieve the amount of prestige points that is displayed within the token. 
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Token Rules</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>You may not hold more than <strong>10 tokens</strong> at any time (including wilds).</li>
          <li>Wild (gold) tokens are used as jokers during card purchases.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nobles</h2>
        <p className="text-gray-700">
          Nobles are special cards that automatically visit you when you meet their requirements — 
          having enough development cards of specific token types. 
          Each noble grants <strong>3 prestige points</strong>. They are not purchased and do not require tokens.
        </p>
      </section>


      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Winning the Game</h2>
        <p className="text-gray-700">
          The game ends at the end of the round where a player reaches 15 points. The player with the most points wins. In case of a tie, the player with the fewest cards wins.
        </p>
      </section>
    </div>
      </main>
    </div>
    </>
  );
}
