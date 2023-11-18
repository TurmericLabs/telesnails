import { useState, useEffect } from "react";
import { Button, Table, Image, Stack } from "react-bootstrap";
import chains from "../chains.json"
import { Snail, SnailModalOptions, UserSnails } from "../types/snail";
import SnailModal from "./SnailModal";
import { getUserSnailsFromLocalStorage } from "../helpers/getUserSnailsFromLocalStorage";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function SnailsTable() {
    const navigate = useNavigate();
    const { address } = useAccount();

    const [userSnails, setUserSnails] = useState<UserSnails | null>()


    if(!address) {
        navigate("/");
    }

    useEffect(() => {
        const snails = getUserSnailsFromLocalStorage();
        setUserSnails(snails);
    }, [])

    console.log(userSnails)

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
                    {userSnails && userSnails.snails.map((snail: Snail) => (
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