import { Container, Col, Row } from 'react-bootstrap';

export default function Header () {
    return(
        <>
            <Container>
                <Row>
                    <Col>
                    <h1>ADD LOGO</h1>
                    </Col>
                    <Col>
                        <w3m-button />
                    </Col>
                </Row>
            </Container>
        </>
    )
}