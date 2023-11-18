import { Button, Table, Image, Stack } from "react-bootstrap";
import chains from "../chains.json"
import { Snail, SnailModalOptions } from "../types/snail";
import SnailModal from "./SnailModal";

const sampleData = {
    "userAddress": "0xUserAddress123456",
    "snails": [
        {
            "address": "0xSnailAddress1",
            "network": 10,
            "name": "SuperSnail"
        },
        {
            "address": "0xSnailAddress2",
            "network": 1,
            "name": "NotSoSuperSnail"
        },
    ]
}

export default function SnailsTable() {
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Snail name</th>
                        <th>Network</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.snails.map((snail: Snail) => (
                        <tr key={snail.address}>
                            <td>{snail.name}</td>
                            <td>
                                <Stack direction="horizontal" gap={3}>
                                    <Image src={chains.findLast(a => a.id == snail.network)?.logoUrl} width="20px" height="20px" roundedCircle />
                                    {chains.findLast(a => a.id == snail.network)?.name}
                                </Stack>
                            </td>
                            <td>
                                <Button className="button-primary">Execute</Button>
                                <SnailModal option={SnailModalOptions.EDIT} snail={snail} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}