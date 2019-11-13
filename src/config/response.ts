class Response {
  public data?: any;
  public errors?: string[];


  public export() {
    return { data: this.data, errors: this.errors };
  }
}

export const response = new Response();