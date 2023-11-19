import SnailCommandParser from "./SnailCommandParser";
import { ExecSnailCommand, SnailCommand, SnailCommandType, UseSnailCommand, VarSnailCommand } from "./snailCommands";
import chains from "../../snippet-chains.json";
import Call from "./Call";
import {Interface} from "ethers";

export default class SnailCommandSnippetExecutor {
    private variable = new Map<string, string>();
    private selectedChainId: number|undefined = undefined;
    private callBatch: Call[] = [];

    constructor(){
    }

    public getCommands(snailCommand: string): SnailCommand[] {
        const lines = snailCommand.split(/\r?\n/);
        
        const parser = new SnailCommandParser();
        const commands = lines.map(line => {return parser.parseSnailCommand(line)});
        return commands;
    }

    private executeCallBatch(): void {
        if(this.selectedChainId === undefined) {
            throw new Error(`No chain selected`);
        }
        
        this.callBatch = [];
    }

    private execCommand(execCommand: ExecSnailCommand): boolean {
        const targetContract = new Interface(["function "+execCommand.signature]);
        const functionName = execCommand.signature.split('(')[0];
        const args = execCommand.args.map(arg => {
            if(arg.startsWith("\"") && arg.endsWith("\"")) {
                return arg.substring(1, arg.length - 1);
            }
            else if(/[0-9]/.test(arg.charAt(0))) {
                return Number(arg);
            }
            else {
                const value = this.variable.get(arg);
                if(value === undefined) {
                    throw new Error(`Variable ${arg} is not defined`);
                }
                if(value.startsWith("\"") && value.endsWith("\"")) {
                    return value.substring(1, value.length - 1);
                }
                else if(/[0-9]/.test(value.charAt(0))) {
                    return Number(value);
                }
                return value;
            }
        });
        const data = targetContract.encodeFunctionData(functionName, args);
        this.callBatch.push(new Call(execCommand.address, data));
        return true;
    }

    private useCommand(useCommand: UseSnailCommand): boolean {
        this.executeCallBatch();
        var chainName = useCommand.chainName;
        const chain = chains.find(chain => chain.name === chainName);
        if(chain === undefined) {
            throw new Error(`Chain ${chainName} is not defined`);
        }
        this.selectedChainId = chain.id;
        return true;
    }

    private varCommand(varCommand: VarSnailCommand): boolean {
        if(varCommand.variableValue.startsWith("\"") && varCommand.variableValue.endsWith("\"")) {
            this.variable.set(varCommand.variableName, varCommand.variableValue);
        }
        else if(/[0-9]/.test(varCommand.variableValue.charAt(0))) {
            this.variable.set(varCommand.variableName, varCommand.variableValue);
        }
        else {
            const value = this.variable.get(varCommand.variableValue);
            if(value === undefined) {
                throw new Error(`Variable ${varCommand.variableValue} is not defined`);
            }
            this.variable.set(varCommand.variableName, value);
        }

        return true;
    }

    public exec(snailCommand: string): boolean {
        const commands = this.getCommands(snailCommand);
        for(const command of commands) {
            switch(command.type) {
                case SnailCommandType.Exec:
                    const execCommand = command as ExecSnailCommand;
                    this.execCommand(execCommand);
                    break;
                case SnailCommandType.Use:
                    const useCommand = command as UseSnailCommand;
                    this.useCommand(useCommand);
                    break;
                case SnailCommandType.Var:
                    const varCommand = command as VarSnailCommand;
                    this.varCommand(varCommand);
                    break;
            }
        }
        return true;
    }
}