import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Col } from "react-bootstrap";
import "./App.css";
import WaitingRoom from "./components/waitingroom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState();

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44373/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg :", msg);
      });
      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(connection);
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
          <WaitingRoom joinChatRoom={joinChatRoom} />
        </Container>
      </main>
    </div>
  );
}

export default App;
