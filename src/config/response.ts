export class Response {
  public static data?: any;
  public static errors?: string[];

  public static clearData(){
    Response.data = {};
    Response.errors = [];
  }

  public static export(){
    return { data: Response.data, errors: Response.errors };
  }
}
