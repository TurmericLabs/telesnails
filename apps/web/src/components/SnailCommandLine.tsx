import Editor from '@monaco-editor/react';
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import configureMonaco from "../utils/configureMonaco";

import { useNavigate } from "react-router-dom";
import SnailCommandSnippetExecutor from '../utils/SnailCommands/SnailCommandSnippetExecutor';

export default function SnailCommandLine() {

    const navigate = useNavigate();
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        configureMonaco();
    }, []);

    const handleEditorChange = (value: any, event: any) => {
        setCode(value);
    }

    const handleExecute = () => {
        new SnailCommandSnippetExecutor().exec(code);
    }

    return <Container>
        <Editor height="70vh"
            language="dendenmushi"
            defaultValue="# moshi moshi"
            onChange={handleEditorChange}
            theme="dendenmushi"
        />
        <div style={{ marginTop: "20px", justifyContent: "center", display: "flex" }}>
            <Button style={{ marginRight: "5px" }} className="button-primary" onClick={() => { handleExecute() }}>Execute</Button>
            <Button style={{ marginLeft: "5px" }} className="button-secondary" onClick={() => { navigate("/snails") }}>Cancel</Button>
        </div>
    </Container>
}