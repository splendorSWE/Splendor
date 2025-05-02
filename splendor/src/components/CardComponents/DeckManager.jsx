import React from "react";
import Card from "./Card";

export default function DeckManager({ deck, onClick }) {
  // Ensure deck is always an array
  const safeDeck = Array.isArray(deck) ? deck : [];

  return (
    <div>
      {safeDeck.slice(0, 4).map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => onClick(card)}
        />
      ))}
    </div>
  );
}
