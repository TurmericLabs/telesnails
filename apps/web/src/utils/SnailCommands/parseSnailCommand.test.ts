import SnailCommandParser from "./SnailCommandParser";
import { ExecSnailCommand, SnailCommandType, UseSnailCommand, VarSnailCommand } from "./snailCommands";


describe("SnailCommandParser exec", () => {
    it("parses a simple command", () => {
        const parser = new SnailCommandParser();
        const snailCommand = parser.parseSnailCommand("exec \"0x00000\" \"function(string)\" \"hello\"");
        expect(snailCommand.type).toEqual(SnailCommandType.Exec);
        const execCommand = snailCommand as ExecSnailCommand;
        expect(execCommand.signature ).toEqual("function(string)");
        expect(execCommand.args).toEqual(["\"hello\""]);
    });
});

describe("SnailCommandParser use", () => {
    it("parses a simple command", () => {
        const parser = new SnailCommandParser();
        const snailCommand = parser.parseSnailCommand("use optimism");
        expect(snailCommand.type).toEqual(SnailCommandType.Use);
        const useCommand = snailCommand as UseSnailCommand;
        expect(useCommand.chainName).toEqual("optimism");
    });
});

describe("SnailCommandParser var", () => {
    it("parses a simple command", () => {
        const parser = new SnailCommandParser();
        const snailCommand = parser.parseSnailCommand("var variable = \"hello\"");
        expect(snailCommand.type).toEqual(SnailCommandType.Var);
        const varCommand = snailCommand as VarSnailCommand;
        expect(varCommand.variableName ).toEqual("variable");
        expect(varCommand.variableValue).toEqual("\"hello\"");
    });
});