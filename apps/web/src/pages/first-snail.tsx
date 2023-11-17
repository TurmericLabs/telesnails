import "../globals.css"
import { Container, Row, Col } from "react-bootstrap"
import SnailModal from "../components/SnailModal"
import { SnailModalOptions } from "../types/snail"

export default function FirstSnailPage() {
    return (
        <Container style={{ minHeight: "100vh" }} className="background">
            <Row className="justify-content-md-center align-items-center" style={{ height: "80vh" }}>
                <Col md="auto">
                    <h1>Send once, execute everywhere.</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2.5vh" }}>
                        <SnailModal option={SnailModalOptions.CREATE} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}