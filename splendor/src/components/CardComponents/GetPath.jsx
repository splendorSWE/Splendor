export default function GetPath ({ level, color, redPrice, greenPrice, bluePrice, yellowPrice, whitePrice, points }){
    return `./Images/MainCards/${level}.${color}.${redPrice}.${greenPrice}.${bluePrice}.${yellowPrice}.${whitePrice}.${points}.png`;
}