import Home from "./pages/Home.js"
import firebase from "./firebase.js"
import { Link } from 'react-router-dom';
import "./App.css"


function MyButton() {
    return (
      <Link to="/gameboard">
        <button>
          Go to gameboard
        </button>
      </Link>
    );
  }
  
  export default function MyApp() {
    
    return (
      <>
        <div className="App">
          <Home/>
          <div className='first-button'>
            <MyButton/>
          </div>
          <div className="GemCard">
            <img src="/Images/MainCards/Blue 1.0.png" alt="Card" />
          </div>
        </div>
      </>
    );
  }

