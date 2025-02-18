
import Home from "./pages/Home.js"
import firebase from "./firebase.js"



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
        </div>
        <div className='first-button'>
          <MyButton/>
        </div>
      </>
    );
  }

