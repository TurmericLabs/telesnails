import "../globals.css"
import { Container, Row, Col, Image } from "react-bootstrap"
import SnailModal from "../components/SnailModal"
import { SnailModalOptions } from "../types/snail"

export default function FirstSnailPage() {
    return (
        <Container style={{ minHeight: "100vh" }} className="background">
            <Row className="justify-content-md-center align-items-center" style={{ height: "60vh" }}>
                <Col md="auto">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src="../../public/snail.svg" width="200px" height="200px" />
                    </div>
                    <h1>Send once, execute everywhere.</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2.5vh" }}>
                        <SnailModal option={SnailModalOptions.CREATE} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}