import { useState } from 'react';
import { Button, InputGroup, Modal, Form, Image, Dropdown, DropdownButton, Stack } from 'react-bootstrap';
import chains from "../chains.json"
import { Snail, SnailModalOptions } from '../types/snail';
import { Chain } from '../types/chains';

interface SnailModalProps {
    option: SnailModalOptions;
    snail?: Snail;
}

export default function SnailModal({ option, snail }: SnailModalProps) {
    const [show, setShow] = useState(false);
    const [selectedChain, setSelectedChain] = useState<Chain | undefined>(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSelect = (chain: Chain) => {
        setSelectedChain(chain);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h2>{option === SnailModalOptions.CREATE ? "Create snail" : "Edit snail"}</h2>
                    <InputGroup>
                        <Form.Control
                            placeholder='Snail name'
                            aria-label='Snail name'
                        />
                    </InputGroup>
                    <DropdownButton 
                        id="dropdown-basic-button"
                        title={selectedChain ? selectedChain.name : "Select network"}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}