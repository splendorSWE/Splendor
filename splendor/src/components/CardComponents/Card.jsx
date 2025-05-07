import GetPath from "./GetPath"

export default function Card({ id, level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points, onClick, styling }) {
    const imageSrc = GetPath( id )
    
    return (
        <img className={styling}
            src={imageSrc}
            alt="Development Card"
            onClick={onClick}
        />
    )
}
