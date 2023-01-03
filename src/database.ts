import { TUser } from "./types";
import { TProduct } from "./types";
import { TPurchase } from "./types";

export const users: TUser[] = [
    {
        id:"01",
        email: "email1@email.com",
        password: "email1"
    },
    {
        id:"02",
        email: "email2@email.com",
        password: "email2"
    }
]

export const product: TProduct[]=[
    {
        id:"p01",
        name:"roupa1",
        price:10,
        category:"roupa"

    },
    {
        id:"p02",
        name:"roupa2",
        price:10,
        category:"roupa"
    }
]

export const purchase:TPurchase[]=[
    {
        userId:"01",
        productId:"p01",
        quantity: 1,
        totalPrice:10.00

    },
    {
        userId:"02",
        productId:"p02",
        quantity: 2,
        totalPrice: 20.00
    }
]