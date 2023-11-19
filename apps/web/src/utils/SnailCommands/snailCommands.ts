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
    constructor(signature: string, args: string[]) {
        super(SnailCommandType.Exec);
        this.signature = signature;
        this.args = args;
    }
    public signature: string;
    public args: string[];
}
export class UseSnailCommand extends SnailCommand {
    constructor(snailName: string) {
        super(SnailCommandType.Use);
        this.snailName = snailName;
    }
    public snailName: string;
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