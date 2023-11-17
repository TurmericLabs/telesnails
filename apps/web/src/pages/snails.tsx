import { Container } from "react-bootstrap"
import SnailsTable from "../components/SnailsTable"

export default function SnailsPage() {
    return (
        <>
            <Container className="background">
                <SnailsTable />
            </Container>
        </>
    )
}