import GetPath from "./GetPath"

export default function Card({ level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points, onClick }) {
    const imageSrc = GetPath({ level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points })
    
    return (
        <img
            src={imageSrc}
            alt="Development Card"
            class='development-card'
            onClick={onClick}
        />
    )
}
