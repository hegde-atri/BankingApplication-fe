export class Transfer {

  constructor(
    public SenderAccount: string,
    public ReceiptentAccount: string,
    public Amount: number,
    public TransDateTime: Date,
    public Description: string) { }
}
