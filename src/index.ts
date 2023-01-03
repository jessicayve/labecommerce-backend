import { product, purchase, users } from "./database";



console.log("Lista de usuários cadastrados")
console.table(users)
console.log("Lista de produtos")
console.table(product)
console.log("Lista de compras")
console.table(purchase)

