export const enum Categoria {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}


export type TUsers = {
    id:string,
    email:string,
    password:string

}

export type TProduct = {
    id:string, 
    name:string,
    price:number,
    category: Categoria
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}