
import  express, { Request, Response} from 'express'
import cors from 'cors';
import { TProduct, TPurchase, TUsers } from "./type";
import { products, purchases, users,  } from './database';
import { Categoria } from "./type";


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) =>{
    try {
        res.status(200).send(users)
    } catch(error:any){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)

    }
})

app.get('/products', (req: Request, res: Response)=>{
  try {
      res.status(200).send(products)
  }catch(error:any){
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)

}
})

app.get('/purchases', (req: Request, res: Response)=>{
    res.status(200).send(purchases)
})

app.get('/products/search', (req: Request, res: Response) =>{
    const q = req.query.q 

    const result = products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response)=>{
    const {id, email, password} = req.body as TUsers
    const newUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("Usuário regristado com sucesso")
})

app.post('/products', (req: Request, res: Response)=>{
    const {id, name, price, category} = req.body as TProduct
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto registrado com sucesso")
})

app.post('/purchases', (req: Request, res: Response)=>{
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra registrada com sucesso")
})


app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
})


app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const userId = req.params.userId

    const result = purchases.filter((purchase) => {
        return purchase.userId === userId
    })
    res.status(200).send(result)
})



app.delete("/users/:id", (req: Request, res: Response) => {

    const id = req.params.id

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })
    

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        res.status(200).send("Usuário deletado com sucesso")
    }else{
        res.status(404).send("Usuário não encontrado")
    }
})

app.delete("/products/:id", (req: Request, res: Response) => {

    const id = req.params.id

    const productIndex = products.findIndex((product) => {
        return product.id === id
    })
    

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
        res.status(200).send("Item deletado com sucesso")
    }else{
        res.status(404).send("Item não encontrado")
    }
})

app.put("/users/:id", (req: Request, res: Response)=>{
    const id = req.params.id 

    const newId = req.body.id as string | undefined

    const newEmail = req.body.email as string | undefined
    
    const newPassword = req.body.password as string | undefined

  

    const user = users.find((user)=>{
        return user.id === id
    })
    if(user){
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }
    res.status(200).send("Item atualizado com sucesso")
})

app.put("/products/:id", (req: Request, res: Response)=>{
    const id = req.params.id 

    const newId = req.body.id as string | undefined

    const  newName= req.body.name as string | undefined
    
    const newPrice = req.body.price as number 

    const newCategory = req.body.category as Categoria | undefined

    const product = products.find((product)=>{
        return product.id === id
    })
    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
        
    }
    res.status(200).send("Item atualizado com sucesso")
})