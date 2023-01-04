export const enum Categoria {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}


export type TUser = {
    id:string,
    email:string,
    password:string

}

export type TProduct = {
    id:string, 
    name:string,
    price:number,
    category:string
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number