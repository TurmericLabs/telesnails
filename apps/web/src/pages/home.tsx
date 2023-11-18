import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { getUserSnailsFromLocalStorage } from "../helpers/getUserSnailsFromLocalStorage";

export default function HomePage() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const userSnails = getUserSnailsFromLocalStorage();

  if (address && userSnails?.snails.length !== 0) {
    navigate('/snails');
  }

  if (address && userSnails?.snails.length === 0) {
    navigate('/first-snail');
  }

  return (
    <Container style={{ maxHeight: "100vh" }} className="background">
      <Row className="justify-content-md-center align-items-center" style={{ height: "50vh" }}>
        <Col md="auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image src="../public/snail.svg" width="200px" height="200px" />
          </div>
          <h1>Send once, execute everywhere.</h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2.5vh" }}>
            <w3m-button />
          </div>
        </Col>
      </Row>
      <Image src="/background.svg" width="100%" />
    </Container>
  );
}