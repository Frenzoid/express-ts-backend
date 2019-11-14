export class ResponseModel {
  constructor() {
    this.data = { object: 'default' };
    this.errors = { critical: false, messages: [] };
    this.timestamp = new Date();
  }

  public data: any;
  public errors: { critical: boolean, messages: string[] };
  public timestamp: Date;

  // Adds a warning, (http status 199).
  addWarning(msg: string): void {
    this.errors.messages.push(msg);
  }

  // Adds a critical error, (http status 500).
  addError(msg: string): void {
    this.errors.critical = true;
    this.errors.messages.push(msg);
  }
}