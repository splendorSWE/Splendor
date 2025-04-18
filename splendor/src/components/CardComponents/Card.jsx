export default function Card({ level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points }) {
    const imageSrc = `./Images/MainCards/${level}.${color}.${redPrice}.${greenPrice}.${bluePrice}.${yellowPrice}.${whitePrice}.${points}.png`;
    
    return (
        <img
            src={imageSrc}
            alt="Development Card"
            class='development-card'
        />
    )
}