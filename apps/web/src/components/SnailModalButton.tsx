import { Button } from "react-bootstrap";
import { Snail } from '../types/snail';

interface SnailModalButtonProps {
    snail?: Snail;
    showModal: (snail: Snail | undefined) => void;
}

export default function SnailModalButton({ showModal, snail }: SnailModalButtonProps) {
    return (
        <Button onClick={() => showModal(snail)} className='button-primary'>
            {snail ? "Edit snail" : "Create a Telesnail"}
        </Button>
    );
}