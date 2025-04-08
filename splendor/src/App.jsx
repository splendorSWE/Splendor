import Home from "./pages/Home"

import "./App.css"
import { io } from "socket.io-client";


// Connect to WebSocket server
// const socket = io("http://localhost:4000");






export default function MyApp() {
  /*
  const [messages, setMessages] = useState([]);
  const [showUserStats, setShowUserStats] = useState(false);
  const [profilePic, setProfilePic] = useState("../images/default_pfp.jpg")

  // // Listen for messages from the server
  // useEffect(() => {
  //   socket.on("message", (msg) => {
  //     console.log("Message from server:", msg);
  //     setMessages((prev) => [...prev, msg]);
  //   });

  
  //   // Clean up listener on component unmount
  //   return () => socket.off("message");
  // }, []);

  const toggleUserStats = () => {
    setShowUserStats((prev) => !prev);
  };
  
  return (
    
      <div className="App">
        <Home/>
        
        <div className="page-header"><PageHeader title='Home'/></div>
          
        <div className="content-container">
          <div>
            <NavigationButton styling='dark-button vertical'
              destination="Gameboard"
              link='/gameboard'/>
            <NavigationButton 
            styling='dark-button vertical'
            destination="Rules"
            link='/rules'/>
            <NavigationButton 
            styling='dark-button vertical'
            destination="User Profile"
            link='/profile'
            state={{ profilePic}}/>
            
            
          </div>
          <div>
            <button className='dark-button'
            onClick={toggleUserStats}>
              {showUserStats ? "Hide User Stats" : "Show User Stats"}
              {showUserStats && <UserStats />}
            </button>
          </div>

        </div>
      </div>
      
  );
  */
 return(
  <Home/>
 )

}

