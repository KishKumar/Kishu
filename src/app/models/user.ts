export interface IUser {
    id: string,
    isActive: boolean,
    balance: string,
    picture: string,
    age: number,
    name: string,
    gender: string,
    email: string,
    phone: string,
    address: string,
    registered: string
}

export interface IUserResponse {
    data: IUser[],
    message: string,
    status: number
}
