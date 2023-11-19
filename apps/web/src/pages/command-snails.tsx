import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SnailCommandLine from "../components/SnailCommandLine";

export default function FirstSnailsPage() {
    const [originalSnailName, setOriginalSnailName] = useState<string | undefined>(undefined);

    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const snailName = params.get("caller");
        setOriginalSnailName(snailName ?? undefined);
    }, [location]);

    return (
        <>
            <Container className="background">
                <div style={{ paddingTop: "5vh", paddingBottom: "2.5vh", textAlign: "center" }}>
                    <h2>{originalSnailName}</h2>
                </div>
                <SnailCommandLine />
            </Container>
        </>
    )
}