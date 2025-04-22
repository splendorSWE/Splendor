import GetPath from "./GetPath"

export default function Card({ id, level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points, onClick }) {
    const imageSrc = GetPath( id )
    
    return (
        <img className="development-card"
            src={imageSrc}
            alt="Development Card"
            onClick={onClick}
        />
    )
}
