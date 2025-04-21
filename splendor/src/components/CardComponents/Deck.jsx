const initialDeck1 = [
    {
        id: "Blue 1.0",
        level: 1,
        color: "blue",
        redPrice: 1,
        greenPrice: 1,
        bluePrice: 0,
        yellowPrice: 1,
        whitePrice: 1,
        points: 0,
    },
    // Add more cards here...
];

const initialDeck2 = [
    {
        id: "Blue 2.0",
        level: 2,
        color: "blue",
        redPrice: 1,
        greenPrice: 1,
        bluePrice: 0,
        yellowPrice: 1,
        whitePrice: 1,
        points: 0,
    },
    // Add more cards here...
];

const initialDeck3 = [
    {
        id: "Blue 3.0",
        level: 3,
        color: "blue",
        redPrice: 1,
        greenPrice: 1,
        bluePrice: 0,
        yellowPrice: 1,
        whitePrice: 1,
        points: 0,
    },
    // Add more cards here...
];

export const shuffle = (deck) => {
    return [...deck].sort(() => Math.random() - 0.5);
};

export { initialDeck1, initialDeck2, initialDeck3 }