import { Container, Stack } from "react-bootstrap"
import SnailsTable from "../components/SnailsTable"

export default function SnailsPage() {

    return (
        <>
            <Container className="background">
                <div style={{ paddingTop: "5vh", paddingBottom: "2.5vh", textAlign: "center" }}>
                    <h2>My telesnails</h2>
                </div>
                <SnailsTable />
            </Container>
        </>
    )
}