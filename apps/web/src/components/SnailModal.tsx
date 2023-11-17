import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import chains from "../chains.json"
import { Snail, SnailModalOptions } from '../types/snail';

interface SnailModalProps {
    option: SnailModalOptions;
    snail?: Snail;
} 

export default function SnailModal({ option, snail }: SnailModalProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{option === SnailModalOptions.CREATE ? "Create snail" : "Edit snail"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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