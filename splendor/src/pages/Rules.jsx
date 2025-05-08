import React from "react";
import "./PageStyles/Rules.css";
import PageHeader from "../components/PageHeader";
import { useAuthContext } from "../context/AuthContext";

export default function Rules() {
  const user = useAuthContext();
  return (
    <>
      <PageHeader title="Rules" home={true} userauth={!user} profile={user || user.isAnonymous} />
      <div className="rules-page">
        <main className="rules-content">
          <div className="rules-container">
            <h2 className="section-title">Objective</h2>
            <p>
              The goal of the game is to be the first player to reach <strong>15 prestige points</strong> by purchasing development cards and attracting nobles.
            </p>

            <h2 className="section-title">Turns</h2>
            <p>On your turn, you may perform <strong>one</strong> of the following actions:</p>
            <ul>
              <li><strong>Take 3 tokens</strong> of different colors (only if available).</li>
              <li><strong>Take 2 tokens</strong> of the same color (only if 4+ of that token are in the supply).</li>
              <li><strong>Reserve a card</strong> and gain 1 wild (gold) token.</li>
              <li><strong>Purchase a card</strong> from the table or your reserved area using your tokens and bonuses.</li>
            </ul>

            <h2 className="section-title">Development Cards</h2>
            <p>
              Cards cost tokens to purchase. Once purchased, you obtain a permanent gem in the color that is displayed on the card. You also receive the amount of prestige points that is displayed within the token.
            </p>

            <h2 className="section-title">Token Rules</h2>
            <ul>
              <li>You may not hold more than <strong>10 tokens</strong> at any time (including wilds).</li>
              <li>Wild (gold) tokens are used as jokers during card purchases.</li>
            </ul>

            <h2 className="section-title">Nobles</h2>
            <p>
              Nobles are special cards that automatically visit you when you meet their requirements — typically by having enough bonuses from development cards of specific colors. Each noble grants <strong>3 prestige points</strong>. They are not purchased and do not require tokens.
            </p>

            <h2 className="section-title">Winning the Game</h2>
            <p>
              The game ends at the end of the round where a player reaches 15 points. The player with the most points wins. In case of a tie, the player with the fewest cards wins.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
