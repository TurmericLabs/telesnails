import { useState } from 'react';
import { Button, InputGroup, Modal, Form, Image, Dropdown, DropdownButton, Stack, Row, Col } from 'react-bootstrap';
import chains from "../chains.json"
import { Snail, SnailModalOptions } from '../types/snail';
import { Chain } from '../types/chains';

interface SnailModalProps {
    option: SnailModalOptions;
    snail?: Snail;
}

export default function SnailModal({ option, snail }: SnailModalProps) {
    const [show, setShow] = useState(false);
    const [snailName, setSnailName] = useState<string>(snail?.name || "");
    const [selectedChain, setSelectedChain] = useState<Chain | undefined>(undefined);

    const handleClose = () => setShow(false);

    const handleOnSnailNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSnailName(event.target.value);
    }

    const handleSelect = (chain: Chain) => {
        setSelectedChain(chain);
    };

    const handleOnClickSave = () => {

    }

    return (
        <>
            <Button onClick={() => setShow(true)} className='button-primary'>
                {option === SnailModalOptions.CREATE ? "Create a Telesnail" : "Edit snail"}
            </Button>

            <Modal show={show} onHide={handleClose} className="modal-border">
                <Modal.Body>
                    <div className="modal-title">
                        <h2>{option === SnailModalOptions.CREATE ? "Create Contract" : "Edit snail"}</h2>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Stack gap={3}>
                                <InputGroup className="modal-input">
                                    <Form.Control
                                        placeholder='Name'
                                        aria-label='Name'
                                        value={snailName}
                                        onChange={handleOnSnailNameChange}
                                    />
                                </InputGroup>
                                {option === SnailModalOptions.CREATE && (
                                    <DropdownButton
                                        id="dropdown-basic-button"
                                        title={selectedChain ? selectedChain.name : "Select chain"}
                                        className='modal-dropdown'
                                    >
                                        {chains.map((chain) => (
                                            <Dropdown.Item key={chain.id} onClick={() => handleSelect(chain)}>
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
                    <Row className="justify-content-center" style={{marginTop: "5%", marginBottom: "5%", textAlign: "center"}}>
                        <Col md={10}>
                            {option === SnailModalOptions.CREATE ? (
                                <Button className="button-primary" onClick={handleOnClickSave} disabled={!snailName || !selectedChain}>
                                    Create
                                </Button>
                            ) : (
                                <div>
                                    <Button variant="secondary" onClick={() => setShow(false)}>
                                        Close
                                    </Button>
                                    <Button className="button-primary" onClick={handleOnClickSave} disabled={!snailName || snailName === snail?.name}>
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}