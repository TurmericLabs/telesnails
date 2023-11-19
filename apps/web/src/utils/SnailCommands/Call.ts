export default class Call {
    public to: string = "";
    public data: string = "";

    constructor(to: string, data: string){
        this.to = to;
        this.data = data;
    }
}