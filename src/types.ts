export const enum Categoria {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}


export type TUser = {
    id:string,
    email:string,
    password:string,
    name:string

}

export type TProduct = {
    id:string, 
    name:string,
    price:number,
    category:string,
    description:string,
    imageUrl:string
}

export type TPurchase = {
    productId: string,
    buyer:string,
    totalPrice: number,
    createdAt:string,
    paid:string

}

