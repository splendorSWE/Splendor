import React, { useState } from "react";
import Card from "./Card";

export default function DeckManager({ initialDeck }) {
    const [deck, setDeck] = useState(initialDeck);

    const playCard = (id) => {
        setDeck(deck.filter((card) => card.id !== id));
    };

    return (
        <div>
            {deck.map((card) => (
                <Card
                    key={card.id}
                    {...card}
                    onClick={() => playCard(card.id)}
                />
            ))}
        </div>
    );
}
