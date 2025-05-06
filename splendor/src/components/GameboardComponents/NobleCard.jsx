import '../componentStyles/NobleCard.css';

export default function NobleCard({ ImagePath }) {
  return (
    <img
      src={ImagePath}
      alt="Noble Card"
      className='noble-card'
    />
  )
}