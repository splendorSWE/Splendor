import Home from "./pages/Home.js"
import firebase from "./firebase.js"
import "./App.css"


function MyButton() {
    return (
      <button>
        I'm a button
      </button>
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

