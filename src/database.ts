import { TUsers } from "./type";
import { TPurchase } from "./type";
import { TProduct } from "./type";
import { Categoria } from "./type";

export const users: TUsers[] = [
    {
        id: "01",
        email: "email1@email.com",
        password: "email1"
    },
    {
        id: "02",
        email: "email2@email.com",
        password: "email2"
    }
]

export const products: TProduct[] = [
    {
        id: "pr001",
        name: "colar",
        price: 10,
        category: Categoria.ACCESSORIES

    },
    {
        id: "pr002",
        name: "roupa",
        price: 10,
        category: Categoria.CLOTHES_AND_SHOES
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "up01",
        productId: "p01",
        quantity: 1,
        totalPrice: 10.00

    },
    {
        userId: "up02",
        productId: "p02",
        quantity: 2,
        totalPrice: 20.00
    }
]

export function createUser(id: string, email: string, password: string): void {
    const newUser: TUsers = {
        id,
        email,
        password
    }
    users.push(newUser)
    console.log(users)
    console.log("Cadastro realizado com sucesso")
}

export function getAllUsers(): TUsers[] {
    return users
}

export function createNewProduct(id: string, name: string, price: number, category: Categoria): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
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

export function createNewPurchase(userId: string, productId: string, quantity: number, totalPrice: number) {
    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    console.log(purchases)
    console.log("Compra realizada com sucesso")
}

export function getPurchasesById(userIdToSearch: string): TPurchase[]  {
    return purchases.filter((purchase)=>{
        return(purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
    })
