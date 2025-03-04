import React from 'react';
import { Link } from 'react-router-dom';


function HomeButton() {
  return (
    <Link to="/">
      <button style={{ margin: '5px'}}>
        Home
      </button>
    </Link>
  );
}

function Header() {
  return(
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      backgroundColor: 'gold',
    }}>
    <HomeButton  />
    </div>
  )
}

function CollectionButton({player}) {
  return(
    <button style={{ 
      height: '60px',
      width: '110px',
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
        fontSize: '30px', 
        fontWeight: 'bold', 
        color: 'black', 
        fontFamily: 'Ponomar, sans-serif',
      }}>
        {number}
      </span>
    </div>
  );
}

function ReservedCard() {
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
        src="/Images/Plain Cards/Reserved Card.png"
        alt="CollectionCard" 
        style={{ width: '56.41px', height: '80px' }} 
      />
      <span style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        fontSize: '20px', 
        fontWeight: 'bold', 
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
        fontSize: '30px', 
        fontWeight: 'bold', 
        color: 'black', 
        fontFamily: 'Ponomar, sans-serif',
      }}>
        {number}
      </span>
    </div>
  );
}



function PlayerCollection({ Points }) {
  return (
    <div style={{
      left: '20px',
      width: '220px',
      marginTop: '10px',
      marginLeft: '10px',
      height: '600px',
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
        <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={5} />
        <ReservedCard />
      </div>
      <div style={{ 
        display: 'flex',
        flexDirection: 'row' 
        }}>  
        <Token ImagePath={"/Images/Tokens/White Token.png"} number={5} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={1}/>
        </div>
      <div style={{ 
        display: 'flex',
        flexDirection: 'row' 
        }}>   
        <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={5} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={1}/>
        </div>
      <div style={{ 
        display: 'flex',
        flexDirection: 'row' 
        }}> 
        <Token ImagePath={"/Images/Tokens/Red Token.png"} number={5} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={1}/>
        </div>
      <div style={{ 
        display: 'flex',
        flexDirection: 'row' 
        }}> 
        <Token ImagePath={"/Images/Tokens/Green Token.png"} number={5} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={1}/>
        </div>
      <div style={{ 
        display: 'flex',
        flexDirection: 'row' 
        }}> 
        <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={5} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={1}/>
        </div>

    </div>
  );
}



export default function Gameboard() {
  return(
    <div>
      <Header />
      <div>
        <CollectionButton player={'Your'}/>
        <CollectionButton player={"Opponent's"}/>
        <PlayerCollection Points={12}/>
      </div>
      
    </div>
  );
}

