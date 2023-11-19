import { Container } from "react-bootstrap";
import Editor from '@monaco-editor/react';
import { useEffect, useState } from "react";
import { editor } from 'monaco-editor';
import configureMonaco from "../utils/configureMonaco";

import loader from '@monaco-editor/loader';

export default function SnailCommandLine() {

    const [code, setCode] = useState<string>("");

    useEffect(() => {
        configureMonaco();
    }, []);

    const handleEditorChange = (value: any, event: any) => {
        setCode(value);
    }

    return <Container>
        <Editor height="70vh"
            language="dendenmushi"
            defaultValue="// some comment"
            onChange={handleEditorChange}
            theme="dendenmushi"
        />
    </Container>
}