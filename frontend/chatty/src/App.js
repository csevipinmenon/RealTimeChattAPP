import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendchat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage(" ");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message}: <span>{payload.userName}</span>
            </p>
          );
        })}

        <form onSubmit={sendchat}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
