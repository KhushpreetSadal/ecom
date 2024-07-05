export interface signin {
    name: string,
    email: string,
    password: string,
    id: string | undefined
}

export interface login {
    email: string,
    password: string,
    id: string | undefined
}

export interface product {

    name: string,
    price: string,
    image: string,
    color: string,
    category: string,
    description: string,
    email: string | undefined,
    id: string | undefined,
    productid: string | undefined,
    quantity: number | undefined,

}

export interface address {

    address: string,
    city: string,
    state: string,
    zip: Number,
    email: string,
    id: string | undefined

}

export interface Orders{
    products: any,
    transactionid: string,
    totalAmmount: string,
    email: string 
}