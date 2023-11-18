import "../globals.css"
import { useState, useEffect } from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import SnailModal from "../components/SnailModal"
import { SnailModalOptions, UserSnails } from "../types/snail"
import { useNavigate } from "react-router-dom"

export default function FirstSnailPage() {
    const navigate = useNavigate();

    const [userSnails, setUserSnails] = useState<UserSnails | null>(null);

    const handleSnailsUpdate = (updatedSnails: UserSnails) => {
        setUserSnails(updatedSnails);
    };

    useEffect(() => {
        if (userSnails) {
            localStorage.setItem("userSnails", JSON.stringify(userSnails));
            navigate('/snails');
        }
    }, [userSnails]);

    return (
        <Container style={{ maxHeight: "100vh" }} className="background">
            <Row className="justify-content-md-center align-items-center" style={{ height: "60vh" }}>
                <Col md="auto">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src="../../public/snail.svg" width="200px" height="200px" />
                    </div>
                    <h1>Send once, execute everywhere.</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2.5vh" }}>
                        <SnailModal option={SnailModalOptions.CREATE} onUpdate={handleSnailsUpdate} />
                    </div>
                </Col>
            </Row>
            <Image src="/background.svg" width="100%" />
        </Container>
    )
}