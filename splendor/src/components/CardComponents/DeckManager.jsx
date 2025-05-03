import React from "react";
import Card from "./Card";

export default function DeckManager({ deck, onClick }) {
  const safeDeck = Array.isArray(deck) ? deck : [];
  console.log("DeckManager received deck:", deck);
  return (
    <div>
      {safeDeck.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => onClick(card)}
        />
      ))}
    </div>
  );
}

