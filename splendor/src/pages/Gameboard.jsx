import React from 'react';
import { useState } from 'react';
import './Gameboard.css'
import PageHeader from '../components/PageHeader';

function CollectionButton({ player }) {
  return (
    <button style={{
      height: '60px',
      width: '105px',
      marginTop: '40px',
      marginLeft: '10px',
      fontFamily: 'Inknut Antiqua, sans-serif',
      fontWeight: '800',
      lineHeight: '20px'
    }} title={player}>
      {player} Collection
    </button>
  )
}

function Token({ ImagePath, number }) {
  return (
    <div style={{
      position: 'relative',
      width: '80px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '5px',
    }}>
      <img
        src={ImagePath}
        alt="Token"
        style={{ width: '80px', height: '80px' }}
      />
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '35px',
        fontWeight: '900',
        color: 'black',
        fontFamily: 'Ponomar, sans-serif',
      }}>
        {number}
      </span>
    </div>
  );
}

function ReservedCard({ viewCard, setViewCard }) {
  return (
    <div style={{
      position: 'relative',
      width: '56.41px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '5px',
      marginLeft: '40px',
      cursor: 'pointer'
    }}>
      <img
        src="/Images/Plain Cards/Reserved Card.png"
        alt="CollectionCard"
        style={{ width: '56.41px', height: '80px' }}
        onClick={() => setViewCard(!viewCard)}
      />
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        fontWeight: '800',
        color: 'White',
        fontFamily: 'Ponomar, sans-serif',
      }}>
        Res
      </span>
    </div>
  );
}

function CollectionCard({ ImagePath, number }) {
  return (
    <div style={{
      position: 'relative',
      width: '56.41px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '5px',
      marginLeft: '40px'
    }}>
      <img
        src={ImagePath}
        alt="CollectionCard"
        style={{ width: '56.41px', height: '80px' }}
      />
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '35px',
        fontWeight: '900',
        color: 'black',
        fontFamily: 'Ponomar, sans-serif',
      }}>
        {number}
      </span>
    </div>
  );
}



function PlayerCollection({ Points, viewCard, setViewCard, setReservable }) {
  return (
    <div style={{
      left: '20px',
      width: '220px',
      marginTop: '10px',
      marginLeft: '10px',
      height: '580px',
      backgroundColor: '#E8E8E8',
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Centered Points Label */}
      <div style={{
        display: 'flex',
        justifyContent: 'center', // Centers the text horizontally
        alignItems: 'center', // Aligns items vertically
        fontSize: '40px',
        fontFamily: 'Fondamento, sans-serif',
        marginTop: '10px',
        fontWeight: '600',
        width: '100%', // Makes sure centering works properly
        textAlign: 'center'
      }}>
        <span style={{ marginRight: '10px' }}>{Points}</span> Points
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={1} />
        <ReservedCard viewCard={viewCard} setViewCard={setViewCard}/>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Token ImagePath={"/Images/Tokens/White Token.png"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={1} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={2} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={1} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Token ImagePath={"/Images/Tokens/Red Token.png"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={1} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Token ImagePath={"/Images/Tokens/Green Token.png"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={1} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={0} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={1} />
      </div>

    </div>
  );
}

function BoardTokens() {
  return (
    <div class='board-tokens-section'>
      <button style={{
        width: '150px',
        height: '50px',
        fontFamily: 'Inknut Antiqua, sans-serif',
        fontWeight: '800',
        lineHeight: '20px',
        marginBottom: '15px'
      }}>
        Select Tokens
      </button>
      <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={3} />
      <Token ImagePath={"/Images/Tokens/White Token.png"} number={1} />
      <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={2} />
      <Token ImagePath={"/Images/Tokens/Red Token.png"} number={1} />
      <Token ImagePath={"/Images/Tokens/Green Token.png"} number={2} />
      <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={2} />
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

  return (
    <div>
      <PageHeader title='Gameboard' home={true} rules={true} account={true} />
      <div class='main'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardPopUp ImagePath={imgViewCard} viewCard={viewCard} setViewCard={setViewCard} reservable={reservable} playable={playable} setReservable={setReservable} />
          <div>
            <CollectionButton player={'Your'} />
            <CollectionButton player={"Opponent's"} />
            <PlayerCollection Points={10} viewCard={viewCard} setViewCard={setViewCard} />
          </div>
          <div>
            <BoardTokens />
          </div>
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
    </div>
  );
}


