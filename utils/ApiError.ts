class ApiError  extends Error{
    constructor(public message:string,public statusCode:number) {
        super(message)
    }
}

export default ApiError