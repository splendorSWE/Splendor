import GetPath from '../CardComponents/GetPath';
import '../componentStyles/CollectionCard.css';

export default function ReservedCard({ viewCard, setViewCard, reservable, reservedCard, selectedCard, setSelectedCard }) {
    return (
  
      <div className='collection-card-div' style={{ opacity: !reservable ? 1 : 0, pointerEvents: !reservable ? 'auto' : 'none' }} disabled={!reservable}>
        <img
          src="/Images/Plain Cards/Reserved Card.png"
          alt="CollectionCard"
          className='collection-card-img'
          onClick={() => {
            if (reservedCard) {
              setViewCard(true);
              setSelectedCard(reservedCard);
              console.log(GetPath(reservedCard.id))
              console.log(selectedCard)
            }
          }}
        />
        <span className='reserved-card-span'>
          Res
        </span>
      </div>
    );
  }