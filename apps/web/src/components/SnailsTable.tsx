import { useEffect, useState } from "react";
import { Button, Col, Container, Image, InputGroup, Row, Stack, Table, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import chains from "../chains.json";
import { getUserSnailsFromLocalStorage } from "../helpers/getUserSnailsFromLocalStorage";
import { Snail, UserSnails } from "../types/snail";
import SnailModal from "./SnailModal";
import SnailModalButtonWithAdd from "./SnailModalButtonWithAdd";
import SnailModalEditButton from "./SnailModalEditButton";
import { Chain } from "../types/chains";

export default function SnailsTable() {
    const navigate = useNavigate();
    const { address } = useAccount();

    const [userSnails, setUserSnails] = useState<UserSnails | null>()
    const [modifyingSnail, setModifyingSnail] = useState<Snail | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedChainId, setSelectedChainId] = useState<number | undefined>(undefined);

    const [filteredSnails, setFilteredSnails] = useState<Snail[]>([]);

    if (!address) {
        navigate("/");
    }

    const isNewNameValid = (snailName: string) : boolean => {
        if(snailName.length == 0) return false;
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

    const handleOnSearchChange = (value: string) => {
        setSearchValue(value);
    }

    const handleSelectChain = (chain: Chain) => {
        setSelectedChainId(chain.id);
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

    useEffect(() => {
        const filterSnails = () => {
            let filtered = userSnails?.snails ?? [];
            if (selectedChainId) {
                filtered = filtered.filter(snail => snail.network === selectedChainId);
            }
            if (searchValue) {
                filtered = filtered.filter(snail => snail.name.toLowerCase().includes(searchValue.toLowerCase()));
            }
            setFilteredSnails(filtered);
        };
        filterSnails();
    }, [userSnails, selectedChainId, searchValue]); // Add searchValue as a dependency
    

    const showSnailModal = (snail: Snail | undefined) => {
        setModifyingSnail(snail);
        setIsModalOpen(true);
    }

    return (
        <>
            <Container>
                <SnailModal snail={modifyingSnail} onUpdate={handleSnailUpdate} isSnailNameValid={isNewNameValid} isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
                <Stack dir="horizontal" style={{ marginBottom: "-.75rem" }}>
                    <Row>
                        <Col md={2}>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={selectedChainId ? (chains.find(a => a.id === selectedChainId))?.name : "Select chain"}
                                className='modal-dropdown'
                            >
                                {chains.map((chain) => (
                                    <Dropdown.Item key={chain.id} onClick={() => handleSelectChain(chain)}>
                                        <Stack direction="horizontal" gap={3}>
                                            <Image src={chain.logoUrl} width="20px" height="20px" roundedCircle />
                                            {chain.name}
                                        </Stack>
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                        <Col md={2}>
                            <Stack dir="horizontal" style={{ flexDirection: "row" }}>
                                <InputGroup className="modal-input">
                                    <Form.Control
                                        placeholder='Search'
                                        aria-label='Search'
                                        value={searchValue}
                                        onChange={(e) => handleOnSearchChange(e.target.value)}
                                    />
                                </InputGroup>
                            </Stack>
                        </Col>
                        <Col md={8} className="d-flex justify-content-end">
                            <SnailModalButtonWithAdd snail={undefined} showModal={showSnailModal} />
                        </Col>
                    </Row>
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
                                {filteredSnails.map((snail: Snail) => (
                                    <tr key={snail.name}>
                                        <td>
                                            <Stack direction="horizontal" gap={3}>
                                                {snail.name}
                                                <SnailModalEditButton snail={snail} showModal={showSnailModal} />
                                            </Stack>
                                        </td>
                                        <td>
                                            <Stack direction="horizontal" gap={3}>
                                                <Image src={chains.findLast(a => a.id === snail.network)?.logoUrl} width="20px" height="20px" roundedCircle />
                                                {chains.findLast(a => a.id === snail.network)?.name}
                                            </Stack>
                                        </td>
                                        <td style={{ textAlign: "end" }}>
                                            <Stack direction="horizontal" gap={2} style={{ placeContent: "end" }}>
                                                <Button className="button-primary">Execute</Button>
                                                <Button className="button-secondary">Banish</Button>
                                            </Stack>
                                        </td>
                                    </tr>
                                ))}
                                {filteredSnails.length === 0 && (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "center" }}>
                                            <p>No snails found with this search parameters.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}