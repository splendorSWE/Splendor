import React, { useState, useEffect } from 'react';
import './Gameboard.css';
import PageHeader from '../components/PageHeader';
import { useAuthContext } from '../context/AuthContext';

function CollectionButton({ player }) {
  return (
    <button 
    className='collection-button' 
    title={player}>
      {player} Collection
    </button>
  );
}

function Token({ color, number }) {
  return (
    <div className='token-div'>
      <img
        src={`/Images/Tokens/${color} Token.png`}
        alt="Token"
        className='token-img'
      />
      <span className='token-span'>
        {number}
      </span>
    </div>
  );
}

function ReservedCard({ viewCard, setViewCard }) {
  return (
    <div className='collection-card-div'>
      <img
        src="/Images/Plain Cards/Reserved Card.png"
        alt="CollectionCard"
        className='collection-card-img'
        onClick={() => setViewCard(!viewCard)}
      />
      <span className='reserved-card-span'>
        Res
      </span>
    </div>
  );
}

function CollectionCard({ ImagePath, number }) {
  return (
    <div className='collection-card-div'>
      <img
        src={ImagePath}
        alt="CollectionCard"
        className='collection-card-img'
      />
      <span className='collection-card-span'>
        {number}
      </span>
    </div>
  );
}


function PlayerCollection({ Points, viewCard, setViewCard, setReservable }) {
  return (
    <div className='player-collection-main-div'>

      <div className='player-collection-header'>
        <span className='player-collection-header-space'>{Points}</span> Points
      </div>

      <div className='player-collection-row'>
        <Token color={"Wild"} number={1} />
        <ReservedCard viewCard={viewCard} setViewCard={setViewCard}/>
      </div>
      <div className='player-collection-row'>
        <Token color={"White"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Blue"} number={2} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Red"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Green"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Yellow"} number={0} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={1} />
      </div>
    </div>
  );
}

function BoardTokens({ gameState, handleTakeTokens }) {
  // State to track visibility of token selection UI
  const [selectTokenView, setSelectTokenView] = useState(false);
  //const [cofirmTokenSelectionView, setCofirmTokenSelectionView] = useState(false);

  // Toggle the visibility of the token selector UI
  const handleSelectTokenView = () => {
    setSelectTokenView(!selectTokenView);
    handleTakeTokens()
  };

  //const handlecofirmTokenSelectionView = () => {
    //setCofirmTokenSelectionView(!selectCofirmTokenSelectionView);
  //};

  const tokens = gameState ? gameState.tokens : {
    wild: 0,
    white: 0,
    blue: 0,
    red: 0,
    green: 0,
    yellow: 0,
  };

  return (
    
      <div className="board-tokens-section">
        
        <button
          className='select-tokens-button'
          onClick={() => setSelectTokenView(!selectTokenView)}
        >
          {selectTokenView ? 'Back' : 'Select Tokens'}
        </button>

        <Token color={"Wild"} number={tokens.wild}/>
        <Token color={"White"} number={tokens.white} />
        <Token color={"Blue"} number={tokens.blue} />
        <Token color={"Red"} number={tokens.red} />
        <Token color={"Green"} number={tokens.green} />
        <Token color={"Yellow"} number={tokens.yellow} />

        <button
          className='confirm-tokens-button'
          onClick={() => handleSelectTokenView()}
          style={{ visibility: selectTokenView ? 'visible' : 'hidden' }}
        >
          Confirm
        </button>
    
      </div>
  );
}

function DevelopmentCard({ ImagePath, setViewCard, setImgViewCard }) {
  return (
    <img
      src={ImagePath}
      alt="Development Card"
      class='development-card'
      onClick={() => { setViewCard(true); setImgViewCard(ImagePath) }}
    />
  )
}

function NobleCard({ ImagePath }) {
  return (
    <img
      src={ImagePath}
      alt="Noble Card"
      class='noble-card'
    />
  )
}

function CardPopUp({ ImagePath, viewCard, setViewCard, playable, reservable, setReservable }) {
  return (
    viewCard && (
      <div className="card-pop-up-container">
        <div className="x-button" onClick={() => {
          setViewCard(false);
        }}>
          X
        </div>
        <img
          src={ImagePath}
          alt="Card Pop Up"
          className="card-pop-up"
        />
        <div className="pop-up-button-container">
          <div className={!playable ? "disabled-button" : "play-card-button"}
            disabled={!playable} onClick={() => setViewCard(false)}>
            Play Card
          </div>
          {/* need to gray out if player already has a reserved card */}
          <div className={!reservable ? "disabled-button" : "play-card-button"}
            disabled={!reservable} onClick={() => {setViewCard(false); setReservable(false)}}>
            Reserve Card
          </div>
        </div>
      </div>
    )
  );
}


export default function Gameboard() {
  const [reservable, setReservable] = useState(true)
  const [playable, setPlayable] = useState(true)
  const [viewCard, setViewCard] = useState(false)
  const [imgViewCard, setImgViewCard] = useState("/Images/MainCards/Yellow 3.0.png")
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  const {user} = useAuthContext();
  useEffect(() => {
    fetch('http://127.0.0.1:5000/game')
      .then((res) => res.json())
      .then((data) => setGameState(data))
      .catch((err) => console.error('Error fetching game state:', err));
  }, []);

  const makeMove = async (moveData) => {
    try {
      console.log('Making move:', moveData);
      const response = await fetch('http://127.0.0.1:5000/game/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moveData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        console.error('Error from server:', errorData.error);
        return;
      }
      const updatedState = await response.json();
      console.log('Updated game state:', updatedState);
      setGameState(updatedState);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error making move.');
    }
  };

  const handleTakeTokens = () => {
    console.log('Select Tokens button clicked');
    const moveData = {
      action: "take_tokens",
      tokens: {
        blue: 1,
        red: 1
      }
    };
    makeMove(moveData);
  };

  return (
    <div>
      <PageHeader title='Gameboard' home={true} rules={true} userauth={!user && !user?.isAnonymous} profile={!!user || user?.isAnonymous} />
      <div class='main'>
        <CardPopUp ImagePath={imgViewCard} viewCard={viewCard} setViewCard={setViewCard} reservable={reservable} playable={playable} setReservable={setReservable} />
        <div>
          <CollectionButton player={'Your'} />
          <CollectionButton player={"Opponent's"} />
          <PlayerCollection Points={10} viewCard={viewCard} setViewCard={setViewCard}
          tokens={gameState ? gameState.playerTokens : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}/>
        </div>
        
        <BoardTokens gameState={gameState} handleTakeTokens={handleTakeTokens} />
        
        <div class='cards'>
          <div class='cards-row'>
            <DevelopmentCard ImagePath={"/Images/MainCards/Blue 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Green 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Red 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/White 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <NobleCard ImagePath={"/Images/MainCards/Noble 1.png"} />
          </div>
          <div class='cards-row'>
            <DevelopmentCard ImagePath={"/Images/MainCards/Blue 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Green 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Red 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/White 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <NobleCard ImagePath={"/Images/MainCards/Noble 2.png"} />
          </div>
          <div class='cards-row'>
            <DevelopmentCard ImagePath={"/Images/MainCards/Blue 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Green 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Red 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/White 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <NobleCard ImagePath={"/Images/MainCards/Noble 3.png"} />
          </div>
        </div>
      </div>
    </div>
  );
}
  