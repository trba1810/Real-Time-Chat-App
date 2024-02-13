import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Col } from "react-bootstrap";
import "./App.css";
import WaitingRoom from "./components/waitingroom";

function App() {
  return (
    <div className="App">
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm="12">
              <h1 className="font-weight-light">Welcome to Chat App</h1>
            </Col>
          </Row>
          <WaitingRoom />
        </Container>
      </main>
    </div>
  );
}

export default App;
