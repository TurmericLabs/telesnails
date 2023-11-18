import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Image, InputGroup, Modal, Row, Spinner, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import chains from "../chains.json";
import useCreateSnailContract from '../hooks/useCreateSnailContract';
import { Chain } from '../types/chains';
import { Snail } from '../types/snail';

interface SnailModalProps {
    snail?: Snail;
    onUpdate: (newSnail: Snail, oldSnailName: string | undefined) => void;
    isSnailNameValid: (snailName: string) => boolean;
    isOpen: boolean;
    close: () => void;
}

export default function SnailModal({ snail, onUpdate, isSnailNameValid, isOpen, close }: SnailModalProps) {
    const [snailName, setSnailName] = useState<string>(snail?.name ?? "");
    const [selectedChainId, setSelectedChainId] = useState<number | undefined>(snail?.network);
    const { address, isLoading, isSuccess, deploySnail } = useCreateSnailContract();
    const [isWaitingForTransaction, setIsWaitingForTransaction] = useState(false);

    useEffect(() => {
        if (!isWaitingForTransaction || isLoading) return;
        if (isSuccess && address != undefined) {
            onUpdate(
                {
                    name: snailName,
                    network: selectedChainId!,
                    address: address,
                },
                snailName
            );
            toast.success("Snail updated successfully");
            close();
        }
        else {
            toast.error("Something went wrong while creating the snail");
        }
        setIsWaitingForTransaction(false);
    }, [isWaitingForTransaction, isLoading]);

    useEffect(() => {
        setSnailName(snail?.name ?? "");
        setSelectedChainId(snail?.network);
    }, [isOpen]);

    const handleOnSnailNameChange = (name: string) => {
        setSnailName(name);
    }

    const handleSelectChain = (chain: Chain) => {
        setSelectedChainId(chain.id);
    };

    const handleOnClickSave = () => {
        if (!snailName || !selectedChainId) {
            toast.error("Please fill in all fields");
            return;
        }
        if (!isSnailNameValid(snailName)) {
            toast.error("Snail name is invalid");
            return;
        }
        if (!snail) {
            setIsWaitingForTransaction(true);
            deploySnail(selectedChainId);
        } else {
            onUpdate({
                name: snailName,
                network: selectedChainId,
                address: address,
            },
                snail?.name
            );
            toast.success("Snail updated successfully");
            close();
        }
    }

    return (
        <>
            <Modal show={isOpen} onHide={close} className="modal-border">
                <Modal.Body>
                    <div className="modal-title">
                        <h2>{snail ? "Edit Snail" : "Create Contract"}</h2>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Stack gap={3}>
                                <InputGroup className="modal-input">
                                    <Form.Control
                                        placeholder='Name'
                                        aria-label='Name'
                                        value={snailName}
                                        onChange={(e) => handleOnSnailNameChange(e.target.value)}
                                    />
                                </InputGroup>
                                {!snail && (
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
                                )}
                            </Stack>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" style={{ marginTop: "5%", marginBottom: "5%", textAlign: "center" }}>
                        <Col md={10}>
                            {isLoading ?
                                (<Spinner animation="border" role="status"></Spinner>) :
                                !snail ? (
                                    <Button className="button-primary" onClick={handleOnClickSave} disabled={!snailName || !selectedChainId}>
                                        Create
                                    </Button>
                                ) : (
                                    <Button className="button-primary" onClick={handleOnClickSave} disabled={!isSnailNameValid(snailName)} style={{ width: "10rem" }}>
                                        Save Changes
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}