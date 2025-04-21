import React, { useState } from "react";
import Card from "./Card";

export default function DeckManager({ initialDeck }) {
    const [deck, setDeck] = useState(initialDeck);

    const replaceCard = (id) => {
        const newDeck = deck.filter(c => c.id !== id);
        setDeck(newDeck);
    };

    return (
        <div className="cards-row">
            {deck.slice(0, 4).map((card) => (
                <Card
                    key={card.id}
                    {...card}
                    onClick={() => replaceCard(card.id)}
                />
            ))}
        </div>
    );
}
