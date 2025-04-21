const initialDeck1 = [
    {
        id: "1blue1",
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
        id: "2blue1",
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
        id: "3blue1",
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