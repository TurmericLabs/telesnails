import { Button } from "react-bootstrap";
import { SnailModalButtonProps } from "../types/snail";

export default function SnailModalButton({ showModal, snail }: SnailModalButtonProps) {
    return (
        <Button onClick={() => showModal(snail)} className='button-primary'>
            {snail ? "Edit snail" : "Create a Telesnail"}
        </Button>
    );
}
