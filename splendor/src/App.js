import app from "./config/firebaseConfig.js";



function MyButton() {
    return (
      <button>
        I'm a button
      </button>
    );
  }
  
  export default function MyApp() {
    console.log("Firebase App Initialized:", app);
    return (
      <div className="first-button">
        <h1>Welcome to my app heh</h1>
        <MyButton />
      </div>
    );
  }

