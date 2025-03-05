import React from 'react';
import PageHeader from '../components/PageHeader';



function PlayerPoints() {
  return (
    <div>
      12
    </div>
  );
}



function CollectionButton({player}) {
  return(
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

function WildToken({ number }) {
  return (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#4A4A4A', // Dark Gray
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <div style={{
        width: '60px',
        height: '52px',
        backgroundColor: '#D9D9D9', // Light Gray
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: '26px',
          fontFamily: 'Fondamento, sans-serif',
          color: 'black',
          fontWeight: 'bold'
        }}>
          {number}
        </span>
      </div>
    </div>
  );
}

function PinkToken({ number }) {
  return (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#FF7878',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Star Shape */}
      <div style={{
        width: '70px',
        height: '70px',
        backgroundColor: '#D9D9D9', // Light Gray
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
      }}>
        {/* Number inside the star */}
        <span style={{
          fontSize: '26px',
          fontFamily: 'Fondamento, sans-serif',
          color: 'black',
          fontWeight: 'bold'
        }}>
          {number}
        </span>
      </div>
    </div>
  );
}

function GreenToken({ number }) {
  return (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#7CE078',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Triangle */}
      <div style={{
        width: '0px',
        height: '0px',
        borderLeft: '30px solid transparent',
        borderRight: '30px solid transparent',
        borderBottom: '52px solid #D9D9D9', // Light Gray Triangle
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
      }}>
        {/* Number inside the triangle */}
        <div style={{
          fontSize: '26px',
          fontFamily: 'Fondamento, sans-serif',
          color: 'black',
          fontWeight: 'bold'
        }}>
          {number}
        </div>
      </div>
    </div>
  );
}

function YellowToken({ number }) {
  return (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#F6D354',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Pentagon Shape */}
      <div style={{
        width: '60px',
        height: '55px',
        backgroundColor: '#D9D9D9', // Light Gray
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      }}>
        {/* Number inside the pentagon */}
        <span style={{
          fontSize: '26px',
          fontFamily: 'Fondamento, sans-serif',
          color: 'black',
          fontWeight: 'bold'
        }}>
          {number}
        </span>
      </div>
    </div>
  );
}


function PlayerCollection() {
  return (
    <div style={{
      left: '20px',
      width: '250px',
      marginTop: '10px',
      marginLeft: '10px',
      height: 'calc(80vh)',
      backgroundColor: '#E8E8E8',
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',        // Align elements in a column 
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        fontSize: '40px',
        fontFamily: 'Fondamento, sans-serif',
        marginTop: '10px',
        width: '100%'
              }}>
        
        <div style= {{marginRight: '15px'}}>
          <PlayerPoints /> 
        </div>
          Points
      </div>
      <WildToken number={10}/>
      <PinkToken number={10}/>
      <GreenToken number={10}/>
      <YellowToken number={10}/>
    </div>
  );
}

export default function Gameboard() {
  return(
    <div>
      <PageHeader title='Gameboard'/>
      <div style={{marginTop:"25px"}}>
        <CollectionButton player={'Your'}/>
        <CollectionButton player={"Opponent's"}/>
        <PlayerCollection />
      </div>
    </div>
  );
}

