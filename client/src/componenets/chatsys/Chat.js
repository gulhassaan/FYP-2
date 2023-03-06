import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


function Chat({ socket, userName, room }) {
  const [msg, setmsg] = useState("");
  const [msgList, setmsgList] = useState([]);
  //allow us to send msg through socket server
  const sendMsg = async () => {
    if (msg !== "") {
      const msgData = {
        room: room,
        author: userName,
        message: msg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("Msg_send", msgData);
      setmsgList((list) => [...list, msgData]);
    }
  };

  useEffect(() => {
    socket.on("Msg_receive", (data) => {
      setmsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="chatWin">
        

          <div  className="chat-header" style={{ backgroundColor: "#F78104", color: "rgba(0, 95, 96, 0.8)" }}>
              <div className="row">
                <div className="col-5 col-lg-6" style={{marginTop:"10px"}}>
                  <h4>CHAT SYSTEM</h4>
                
                </div>
               
                <div className="col-6 col-lg-6">
                <button  style={{ backgroundColor: "#F78104", color: "rgba(0, 95, 96, 0.8)",marginLeft:"40px",border:"rgba(0, 95, 96, 0.8) "}}>
                <a class="meet-btn" href="https://meet.google.com/?pli=1"  target="_blank">Meet</a> </button>
                
                  <h2>Need Help?</h2>
              
                </div>
              </div>
            </div>
        <ScrollToBottom className="message-container">
          <div className="chat-body">
            {msgList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={userName === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="msgContent">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="msgMeta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollToBottom>

        <div className="chat-footer">
          <input
            type="text"
            value={msg}
            placeholder="Enter Text Here..."
            onChange={(e) => {
              setmsg(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMsg();
            }}
          />

          <button onClick={sendMsg} style={{
             backgroundColor: "#F78104", color: "rgba(0, 95, 96, 0.8)" }}>&#9658;</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
