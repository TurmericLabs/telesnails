import { ExecSnailCommand, SnailCommand, UseSnailCommand, VarSnailCommand } from "./snailCommands";

export default class SnailCommandParser {
    private input: string = "";
    private pos: number = 0;
    constructor() { }

    private currentToken(): string {
        if(this.pos >= this.input.length) return "";
        return this.input.charAt(this.pos);
    }

    private consume(expected?: string, skipWhiteCharacters?: boolean | undefined): void {
        if(skipWhiteCharacters === undefined) skipWhiteCharacters = true;
        if (expected && this.currentToken() !== expected) {
            throw new Error(`Expected ${expected} at position ${this.pos}`);
        }

        this.pos++;

        // Skip over any whitespace characters
        while (
            skipWhiteCharacters &&
            this.currentToken() === " " ||
            this.currentToken() === "\t" ||
            this.currentToken() === "\n" ||
            this.currentToken() === "\r"
        ) {
            this.pos++;
        }
    }
    private consumeWhitespace(): void {
        while (/\s/.test(this.currentToken())) {
            this.consume();
        }
    }

    private parseEscape(): string {
        // Consume the backslash
        this.consume("\\");

        switch (this.currentToken()) {
            // If the escape sequence is a double quote, backslash, or forward slash, return the corresponding character
            case '"':
            case "\\":
            case "/":
                const c = this.currentToken();
                this.consume();
                return c;
            // If the escape sequence is a backspace, return the corresponding character
            case "b":
                this.consume();
                return "\b";
            // If the escape sequence is a form feed, return the corresponding character
            case "f":
                this.consume();
                return "\f";
            // If the escape sequence is a newline, return the corresponding character
            case "n":
                this.consume();
                return "\n";
            // If the escape sequence is a carriage return, return the corresponding character
            case "r":
                this.consume();
                return "\r";
            // If the escape sequence is a tab, return the corresponding character
            case "t":
                this.consume();
                return "\t";
            // If the escape sequence is a Unicode code point, parse it and return the corresponding character
            case "u":
                this.consume();
                const code = parseInt(this.input.substr(this.pos, 4), 16);

                if (isNaN(code)) {
                    throw new Error(
                        `Invalid Unicode escape sequence at position ${this.pos}`
                    );
                }

                this.pos += 4;

                return String.fromCharCode(code);
            // Otherwise, the JSON escape sequence is invalid
            default:
                throw new Error(`Invalid escape sequence at position ${this.pos}`);
        }
    }

    private parseString(): string {
        let str = "";

        // Consume opening quote
        this.consume('"');

        // Parse string characters
        while (this.currentToken() !== '"') {
            if (this.currentToken() === "\\") {
                str += this.parseEscape();
            } else {
                str += this.currentToken();
                this.pos++;
            }
        }

        // Consume closing quote
        this.consume('"');

        return str;
    }

    private parseVariable() {
        let variable = "";
        while (/[a-zA-Z0-9]/.test(this.currentToken())) {
            variable += this.currentToken();
            this.pos++;
        }
        this.consumeWhitespace();
        return variable;
    }

    private parseNumber() {
        let number = "";
        while (/[0-9]/.test(this.currentToken())) {
            number += this.currentToken();
            this.pos++;
        }
        return number;
    }

    private parseSignature() {
        let str = "";

        // Consume opening quote
        this.consume('(');

        // Parse string characters
        while (this.currentToken() !== ')' && this.currentToken() !== '') {
            if (this.currentToken() === "\\") {
                str += this.parseEscape();
            } else {
                str += this.currentToken();
                this.pos++;
            }
        }

        // Consume closing quote
        this.consume(')');

        return str;
    }

    private parseExecCommand(): SnailCommand {
        this.consume('e');
        this.consume('x');
        this.consume('e');
        this.consume('c', false);
        this.consume(' ');
        
        const signature = "("+this.parseSignature()+")";

        var args = [];
        while(this.currentToken() !== '') {
            if(this.currentToken() === '"') {
                args.push("\""+this.parseString()+"\"");
            } else if (/[a-zA-Z0-9]/.test(this.currentToken())) {
                args.push(this.parseVariable());
            } else if (/[0-9]/.test(this.currentToken())) {
                args.push(this.parseNumber());
            } else {
                console.log("current token", this.currentToken(), this.pos);
                throw Error("Invalid character in exec command");
            }
        }

        return new ExecSnailCommand(signature, args);
    }

    private parseUseCommand(): UseSnailCommand {
        this.consume('u');
        this.consume('s');
        this.consume('e', false);
        this.consume(' ');

        const snailName = this.parseVariable();

        return new UseSnailCommand(snailName);
    }

    private parseVarCommand(): VarSnailCommand {
        this.consume('v');
        this.consume('a');
        this.consume('r', false);
        this.consume(' ');

        const variableName = this.parseVariable();

        this.consume('=');


        var variableValue = "";
        if(this.currentToken() === '"') {
            variableValue = ("\""+this.parseString()+"\"");
        } else if (/[a-zA-Z0-9]/.test(this.currentToken())) {
            variableValue = (this.parseVariable());
        } else if (/[0-9]/.test(this.currentToken())) {
            variableValue = (this.parseNumber());
        } else {
            throw Error("Invalid character in var command");
        }


        return new VarSnailCommand(variableName, variableValue);
    }

    public parseSnailCommand(command: string) : SnailCommand {
        this.input = command;
        this.pos = 0;

        this.consumeWhitespace();

        if (this.currentToken() === "e") {
            return this.parseExecCommand();
        } else if (this.currentToken() === "u") { 
            return this.parseUseCommand();
        } else if (this.currentToken() === "v") {
            return this.parseVarCommand();
        } else {
            throw Error("Invalid command");
        }
    }
}
