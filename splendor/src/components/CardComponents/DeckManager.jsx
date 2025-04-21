import React, { useState } from "react";
import Card from "./Card";

export default function DeckManager({ initialDeck }) {
    const [deck, setDeck] = useState(initialDeck);
    const [currCard, setCurrCard] = useState(deck[0])

    const replaceCard = (id) => {
        const newDeck = deck.filter(c => c.id !== id);
        setDeck(newDeck);
        setCurrCard(newDeck[0] || null); // update to next card
    };

    return (
        <div>
            {currCard && (
                <Card
                    key={currCard.id}
                    {...currCard}
                    onClick={() => replaceCard(currCard.id)}
                />
            )}
        </div>
    );
}
