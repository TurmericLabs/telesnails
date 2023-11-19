export enum SnailCommandType {
    Exec,
    Use,
    Var
}

export abstract class SnailCommand {
    constructor(type: SnailCommandType) {
        this.type = type;
    }
    public type: SnailCommandType;
}
export class ExecSnailCommand extends SnailCommand {
    constructor(address: string, signature: string, args: string[]) {
        super(SnailCommandType.Exec);
        this.signature = signature;
        this.args = args;
        this.address = address;
    }
    public address: string;
    public signature: string;
    public args: string[];
}
export class UseSnailCommand extends SnailCommand {
    constructor(chainName: string) {
        super(SnailCommandType.Use);
        this.chainName = chainName;
    }
    public chainName: string;
}
export class VarSnailCommand extends SnailCommand {
    constructor(variableName: string, variableValue: string) {
        super(SnailCommandType.Var);
        this.variableName = variableName;
        this.variableValue = variableValue;
    }
    public variableName: string;
    public variableValue: string;
}