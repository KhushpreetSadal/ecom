export interface signin{
    name:string,
    email:string,
    password:string,
    id:string|undefined
}

export interface login{
    email:string,
    password:string,
    id:string|undefined
}

export interface product{

    name:string,
    price:string,
    image:string,
    color:string,
    category:string,
    description:string,
    email:string|undefined,
    id:string|undefined,
    productid:string|undefined,
    quantity:number|undefined,

}