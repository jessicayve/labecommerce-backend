import { TUser } from "./types";
import { TProduct } from "./types";
import { TPurchase } from "./types";
import { Categoria } from "./types";





export const users: TUser[] = [
    {
        id: "u001",
        name:"Astrodev",
        email: "astrodev@email.com",
        password: "email1"

    },
    {
        id: "u002",
        name:"Fulano",
        email: "fulano@email.com",
        password: "email123"
    }
]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "colar",
        price: 10,
        category: Categoria.ACCESSORIES,
        description:"colar de ouro",
        imageUrl:"foto do colar"

    },
    {
        id: "p002",
        name: "pulseira",
        price: 20,
        category: Categoria.ACCESSORIES,
        description:"pulseria de prata",
        imageUrl:"foto pulseira"

    }
]

export const purchases: TPurchase[] = [
    {
       
        productId: "p01",
        buyer_id:"u001",
        totalPrice: 10.00,
        createdAt:"datenow",
        paid:"sim/nao"

    },
    {
        productId: "p01",
        buyer_id:"u002",
        totalPrice: 20.00,
        createdAt:"datenow",
        paid:"sim/nao"
    }
]

export function createUser(id: string, name:string, email: string, password: string): void {
    const newUser: TUser = {
        id,
        name,
        email,
        password
    }
    users.push(newUser)
    console.log(users)
    console.log("Cadastro realizado com sucesso")
}

export function getAllUsers(): TUser[] {
    return users
}

export function createNewProduct(id: string, name: string, price: number, category: Categoria, description:string, imageUrl:string): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category,
        description,
        imageUrl
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}
export function getProductsById(idToSearch: string): TProduct[] | undefined {
    return (products.filter((product) => {
        if (product.id === idToSearch) {
            return product
        }
    }))
}

export function queryProductsByName(q: string) {
    const query = products.filter((product) => {
        return (product.name.toLowerCase().includes(q.toLowerCase()))
    })
    console.table(query)
}

export function createNewPurchase(productId: string, buyer_id:string, totalPrice: number, createdAt:string, paid:string) {
    const newPurchase: TPurchase = {
        productId,
        buyer_id,
        totalPrice,
        createdAt,
        paid
    }
    purchases.push(newPurchase)
    console.log(purchases)
    console.log("Compra realizada com sucesso")
}

export function getPurchasesById(userIdToSearch: string): TPurchase[]  {
    return purchases.filter((purchase)=>{
        return(purchase.productId.toLowerCase().includes(userIdToSearch.toLowerCase()))
    })}

