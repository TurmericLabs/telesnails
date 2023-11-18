import { Button, Image, Stack } from "react-bootstrap";
import { SnailModalButtonProps } from "../types/snail";

export default function SnailModalButtonWithAdd({ showModal, snail }: SnailModalButtonProps) {
    return (
        <Button onClick={() => showModal(snail)} className='button-primary' style={{ width: "12em" }}>
            <Stack direction="horizontal" gap={3} style={{ alignContent: "space-between" }}>
                {snail ? "Edit snail" : "Create a Telesnail"}
                <Image src="/add.svg" />
            </Stack>
        </Button>
    );
}