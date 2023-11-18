import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import chains from "../chains.json";
import { getUserSnailsFromLocalStorage } from "../helpers/getUserSnailsFromLocalStorage";
import { Snail, UserSnails } from "../types/snail";
import SnailModal from "./SnailModal";
import SnailModalButton from "./SnailModalButton";

export default function SnailsTable() {
    const navigate = useNavigate();
    const { address } = useAccount();

    const [userSnails, setUserSnails] = useState<UserSnails | null>()
    const [modifyingSnail, setModifyingSnail] = useState<Snail | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    if (!address) {
        navigate("/");
    }

    const isNewNameValid = (snailName: string) : boolean => {
        return userSnails?.snails.find(a => a.name === snailName) === undefined;
    }

    const handleSnailUpdate = (snail: Snail, originalSnailName: string | undefined) => {
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

    const showSnailModal = (snail: Snail | undefined) => {
        setModifyingSnail(snail);
        setIsModalOpen(true);
    }


    return (
        <>
            <Container>
                <SnailModal snail={modifyingSnail} onUpdate={handleSnailUpdate} isSnailNameValid={isNewNameValid} isOpen={isModalOpen} close={()=>setIsModalOpen(false)} />
                <Stack dir="horizontal">
                    <SnailModalButton snail={undefined} showModal={showSnailModal} />
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
                                            <SnailModalButton
                                                snail={snail}
                                                showModal={showSnailModal}
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