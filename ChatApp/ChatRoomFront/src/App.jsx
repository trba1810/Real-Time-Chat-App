import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Col } from "react-bootstrap";
import "./App.css";
import WaitingRoom from "./components/waitingroom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44373/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }]);
      });

      connection.on("ReceiveSpecificMessage", (username, message) => {
        setMessages((messages) => [...messages, { username, message }]);
      });

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm="12">
              <h1 className="font-weight-light">Welcome to Chat App</h1>
            </Col>
          </Row>
          {!connection ? (
            <WaitingRoom joinChatRoom={joinChatRoom} />
          ) : (
            <ChatRoom messages={messages} sendMessage={sendMessage} />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
