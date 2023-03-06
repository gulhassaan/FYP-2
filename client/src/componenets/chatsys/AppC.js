import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import { useLocation,useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

function AppC() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log()
  const [userName, setuserName] = useState(location.state.user);

  
  const [room, setRoom] = useState(location.state.room);

  console.log("JOIN CHAT WITH AD ID",room)
  
  const [showChat, setShowChat]=useState("");
  const joinRoom = () => {
      if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="App" style={{ backgroundColor:"rgba(0, 95, 96, 0.8)"}}>
      {!showChat ? (
        <button onClick={joinRoom}>Join A Chat</button>        
      )
      : (
      <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default AppC;
//socket.io-client is a library which is use to connect the react with socket.io
