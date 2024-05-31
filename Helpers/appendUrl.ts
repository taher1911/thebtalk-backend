export const appendUrl = (path: string , image : string) => {  

    return process.env.NODE_ENV === "production" ?
    `${process.env.PROD_URL}${path}${image}` :
    `${process.env.DEV_URL}${path}${image}`
}