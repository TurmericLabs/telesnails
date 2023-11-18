import { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAccount } from "wagmi"
import SnailModal from "../components/SnailModal"
import SnailModalButton from "../components/SnailModalButton"
import "../globals.css"
import { Snail, UserSnails } from "../types/snail"

export default function FirstSnailPage() {
    const navigate = useNavigate();

    const { address } = useAccount();

    const [userSnails, setUserSnails] = useState<UserSnails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    if (!address) {
        navigate("/");
    }

    const handleSnailUpdate = (updatedSnail:Snail) => {
        setUserSnails({
            address: address!,
            snails: [updatedSnail]
        });
    };

    useEffect(() => {
        if (userSnails) {
            localStorage.setItem("userSnails", JSON.stringify(userSnails));
            navigate('/snails');
        }
    }, [userSnails]);

    return (
        <Container style={{ minHeight: "100vh" }} className="background">
            <SnailModal close={()=>setIsModalOpen(false)} isOpen={isModalOpen} isSnailNameValid={(name)=>name.length > 0} onUpdate={(newSnail: Snail, oldSnailName: string | undefined) => handleSnailUpdate(newSnail)} />
            <Row className="justify-content-md-center align-items-center" style={{ height: "60vh" }}>
                <Col md="auto">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src="../../public/snail.svg" width="200px" height="200px" />
                    </div>
                    <h1>Send once, execute everywhere.</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2.5vh" }}>
                        <SnailModalButton showModal={()=>setIsModalOpen(true)}  />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}