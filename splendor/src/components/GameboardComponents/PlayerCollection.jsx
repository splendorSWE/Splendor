import ReservedCard from './ReservedCard';
import CollectionCard from './CollectionCard';
import Token from './Token';
import '../componentStyles/PlayerCollection.css';

export default function PlayerCollection({ Points, tokens, playerCards, viewCard, setViewCard, reservable, reservedCard, setSelectedCard, selectedCard }) {
  
  return (
    <div className='player-collection-main-div'>

      <div className='player-collection-header'>
        <span className='player-collection-header-space'>{Points}</span> Points
      </div>

      <div className='player-collection-row'>
        <Token color={"Wild"} number={tokens.wild} />
        <ReservedCard viewCard={viewCard} setViewCard={setViewCard} reservable={reservable} setSelectedCard={setSelectedCard} reservedCard={reservedCard} selectedCard={selectedCard} />
      </div>
      <div className='player-collection-row'>
        <Token color={"White"} number={tokens.white} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={playerCards.white} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Blue"} number={tokens.blue} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={playerCards.blue} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Red"} number={tokens.red} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={playerCards.red} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Green"} number={tokens.green} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={playerCards.green} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Yellow"} number={tokens.yellow} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={playerCards.yellow} />
      </div>
    </div>
  );
}
