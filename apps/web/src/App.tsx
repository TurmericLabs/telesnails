import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { getUserSnailsFromLocalStorage } from "./helpers/getUserSnailsFromLocalStorage";

export default function App() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const snails = getUserSnailsFromLocalStorage();

  if (address && snails) {
    navigate('/snails');
  }

  if (address && !snails) {
    navigate('/first-snail');
  }

  return (
    <Container style={{ minHeight: "100vh" }} className="background">
      <Row className="justify-content-md-center align-items-center" style={{ height: "80vh" }}>
        <Col md="auto">
          <h1>Send once, execute everywhere.</h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2.5vh" }}> 
            <w3m-button />
          </div>
        </Col>
      </Row>
    </Container>
  );
}