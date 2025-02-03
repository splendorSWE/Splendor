function MyButton() {
    return (
      <button>
        I'm a button
      </button>
    );
  }
  
  export default function MyApp() {
    return (
      <div className="first-button">
        <h1>Welcome to my app heh</h1>
        <MyButton />
      </div>
    );
  }