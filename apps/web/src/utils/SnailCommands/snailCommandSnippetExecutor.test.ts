import SnailCommandSnippetExecutor from "./SnailCommandSnippetExecutor";
import { ExecSnailCommand, SnailCommandType, VarSnailCommand } from "./snailCommands";


describe("SnailCommandSnippetExecutor", () => {
    it("parses a group of commands", () => {
        const executor = new SnailCommandSnippetExecutor();
        const commands = executor.getCommands("exec \"0x0000\" \"string\" \"hello\" \n        var variable = \"hello\"");
        expect(commands.length).toEqual(2);
        expect(commands[0].type).toEqual(SnailCommandType.Exec);
        expect(commands[1].type).toEqual(SnailCommandType.Var);
        const execCommand = commands[0] as ExecSnailCommand;
        const varCommand = commands[1] as VarSnailCommand;
        expect(execCommand.signature ).toEqual("string");
        expect(execCommand.args).toEqual(["\"hello\""]);
        expect(varCommand.variableName ).toEqual("variable");
        expect(varCommand.variableValue).toEqual("\"hello\"");
    });
});