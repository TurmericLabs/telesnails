import { useState, useEffect } from "react";
import { Button, Table, Image, Stack, Container, Col, Row } from "react-bootstrap";
import chains from "../chains.json"
import { Snail, SnailModalOptions, UserSnails } from "../types/snail";
import SnailModal from "./SnailModal";
import { getUserSnailsFromLocalStorage } from "../helpers/getUserSnailsFromLocalStorage";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function SnailsTable() {
    const navigate = useNavigate();
    const { address } = useAccount();

    const [userSnails, setUserSnails] = useState<UserSnails | null>()


    if (!address) {
        navigate("/");
    }

    const handleSnailsUpdate = (snail: Snail, originalSnailName: string | undefined) => {
        const updatedSnails: UserSnails = {
            address: userSnails?.address ?? address!,
            snails: userSnails?.snails ?? []
        };

        if (originalSnailName) {
            updatedSnails.snails = updatedSnails.snails.filter(a => a.name !== originalSnailName);
        }
        updatedSnails.snails.push(snail);

        setUserSnails(updatedSnails);
    };

    useEffect(() => {
        const snails = getUserSnailsFromLocalStorage();
        setUserSnails(snails);
    }, []);

    useEffect(() => {
        if (userSnails) {
            localStorage.setItem("userSnails", JSON.stringify(userSnails));
        }
    }, [userSnails]);


    return (
        <>
            <Container>
                <Stack dir="horizontal">
                    <SnailModal option={SnailModalOptions.CREATE} onUpdate={handleSnailsUpdate} />
                </Stack>
                <Row className="justify-content-center">
                    <Col md={12} className="mx-auto">
                        <Table responsive className="snails-table">
                            <thead>
                                <tr>
                                    <th>Snail name</th>
                                    <th>Network</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userSnails && userSnails.snails.map((snail: Snail) => (
                                    <tr key={snail.name}>
                                        <td>{snail.name}</td>
                                        <td>
                                            <Stack direction="horizontal" gap={3}>
                                                <Image src={chains.findLast(a => a.id === snail.network)?.logoUrl} width="20px" height="20px" roundedCircle />
                                                {chains.findLast(a => a.id === snail.network)?.name}
                                            </Stack>
                                        </td>
                                        <td style={{ textAlign: "end" }}>
                                            <Button className="button-primary">Execute</Button>
                                            <SnailModal
                                                snail={snail}
                                                onUpdate={handleSnailsUpdate(snail)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}