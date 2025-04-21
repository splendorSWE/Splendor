import GetPath from "./GetPath"

export default function Card({ id, level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points, onClick }) {
    const imageSrc = GetPath({ id })
    
    return (
        <img
            src={imageSrc}
            alt="Development Card"
            class='development-card'
            onClick={onClick}
        />
    )
}
