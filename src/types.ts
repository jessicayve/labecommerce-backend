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
    description:string,
    image_url:string
}

export type TPurchase = {
    id: string,
    buyer_id:string,
    total_price: number,
    created_at:string,
    paid:number

}

export type TPurchaseProduct ={
    purchaseId:string,
    productID:string,
    subTotal:number,
    quantity:number
}

