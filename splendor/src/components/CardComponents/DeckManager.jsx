import React, { useState } from "react";
import Card from "./Card";

export default function DeckManager({ deck, onClick }) {

    // const replaceCard = (id) => {
    //     const newDeck = deck.filter(c => c.id !== id);
    //     setDeck(newDeck);
    //     onClick?.(id);
    // };

    return (
        <div>
            {deck.slice(0, 4).map((card) => (
                <Card
                    key={card.id}
                    {...card}
                    onClick={() => onClick(card)}
                />
            ))}
        </div>
    );
}
