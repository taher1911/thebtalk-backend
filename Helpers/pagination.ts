export const pagination = (size: number, number: number) => {
    const pageSize = size || 10;
    const page = number || 1;
    const skip = pageSize * (page - 1);
    const limit = pageSize;
    return { skip, limit }
}