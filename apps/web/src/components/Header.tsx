import { Container, Col, Row } from 'react-bootstrap';

export default function Header() {
    return (
        <>
            <Container className="header">
                <Row>
                    <Col>
                        <h1>telesnails</h1>
                    </Col>
                    <Col className='header-connect'>
                        <div style={{ float: 'inline-end' }}>
                            <w3m-button />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}