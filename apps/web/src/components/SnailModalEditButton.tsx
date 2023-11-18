import { Image } from "react-bootstrap";
import { SnailModalButtonProps } from "../types/snail";

export default function SnailModalEditButton({ showModal, snail }: SnailModalButtonProps) {
    return (
        <div>
            <Image src="/edit.svg"  onClick={() => showModal(snail)}/>
        </div>
    );
}