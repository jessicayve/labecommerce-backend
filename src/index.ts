
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { TProduct, TPurchase, TUser } from './types'
import { products } from './database'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//-- GET ALL USERS ___________________________________________________________________________

app.get("/users", async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined
        if (searchTerm === undefined) {
            const result = await db("users")

            res.status(200).send(result)
        } else {
            const result = await db("users").where("name", "LIKE", `%${searchTerm}%`)

            res.status(200).send(result)
        }

    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})

//--CREATE USER__________________________________________________________________________

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("id deve ser uma string")
        }

        if (id.length < 4) {
            res.status(400)
            throw new Error("id deve possuir pelo menos dois caracteres")
        }


        if (typeof name !== "string") {
            res.status(400)
            throw new Error("name deve ser uma string")
        }

        if (name.length < 4) {
            res.status(400)
            throw new Error("name deve possuir pelo menos dois caracteres")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("email deve ser uma string")
        }

        if (email.length < 2) {
            res.status(400)
            throw new Error("email deve possuir dois caracteres")
        }


        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        const [userIdAlreadyExists]: TUser[] | undefined = await db("users").where({ id })

        if (userIdAlreadyExists) {
            res.status(400)
            throw new Error("id já existe")
        }

        const [userEmailAlreadyExists]: TUser[] | undefined = await db("users").where({ email })

        if (userEmailAlreadyExists) {
            res.status(400)
            throw new Error("email já existe")
        }

        const newUser: TUser = {
            id,
            name,
            email,
            password
        }
        await db("users").insert(newUser)
        res.status(201).send({ message: "User criado com sucesso", user: newUser })


    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//CREAT PRODUCT ________________________________________________________________________________

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("id deve ser uma string")
        }

        if (id.length < 4) {
            res.status(400)
            throw new Error("id deve possuir pelo menos 4 caracteres")
        }


        if (typeof name !== "string") {
            res.status(400)
            throw new Error("name deve ser uma string")
        }

        if (name.length < 4) {
            res.status(400)
            throw new Error("name deve possuir pelo menos dois caracteres")
        }
        if (typeof price !== "string") {
            res.status(400)
            throw new Error("price deve ser um number")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("description deve ser uma string")
        }

        if (typeof image_url !== "string") {
            res.status(400)
            throw new Error("Image_url deve ser uma string")
        }



        const [productIdAlreadyExists]: TProduct[] | undefined = await db("products").where({ id })

        if (productIdAlreadyExists) {
            res.status(400)
            throw new Error("id ja existe")
        }

        const newProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(newProduct)
      

        res.status(201).send({ message: "Produto criado com sucesso" })


    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//GET ALL PRODUCTS _____________________________________________________________________________

app.get("/products", async (req:Request, res:Response)=>{
    try{
        const result = await db("products")

        res.status(200).send(result)

    } catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//GET ALL PRODUCTS BY NAME____________________________________________________________________


app.get("/products", async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined
        if (searchTerm === undefined) {
            const result = await db("products")

            res.status(200).send(result)
        } else {
            const result = await db("products").where("name", "LIKE", `%${searchTerm}%`)

            res.status(200).send(result)
        }

    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})

//EDIT PRODUCT BY ID _________________________________________________________________________


app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

      

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription= req.body.description
        const newImageUrl = req.body.image_url

        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("id deve ser uma string")
            }

            if (newId.length < 4) {
                res.status(400)
                throw new Error("id deve possuir pelo menos 4 caracteres")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("name deve ser uma string")
            }

            if (newName.length < 4) {
                res.status(400)
                throw new Error("name deve possuir pelo menos dois caracteres")
            }
        }

        if (newPrice!== undefined) {
            if (typeof newPrice !== "string") {
                res.status(400)
                throw new Error("Price deve ser um number")
            }
        }


        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("Image url deve ser uma string")
            }
        }

        if (newImageUrl!== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("Image url deve ser uma string")
            }
        }
       

        const [product]: TProduct[] | undefined = await db("products").where({ id: idToEdit })

        if (!product) {
            res.status(404)
            throw new Error("id não encontrado")
        }

        const newProduct: TProduct = {
            id: newId || product.id,
            name: newName || product.name,
            description: newDescription || product.description,
            image_url: newImageUrl || product.image_url,
            price: isNaN(newPrice) ? product.price : newPrice

        }

        await db("products").update(newProduct).where({ id: idToEdit })

        res.status(200).send({ message: "Produto editado com sucesso", product: newProduct })


    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//GET ALL PURCHASES ________________________________________________________________________

app.get("/purchases", async (req:Request, res:Response)=>{
    try{
        const result = await db("purchases")

        res.status(200).send(result)

    } catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//CREATE PURCHASE __________________________________________________________________________

app.post("/purchases", async (req: Request, res: Response) => {

    try {
        const { id, buyer_id, total_price, paid } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("id deve ser uma string")
        }

        if (id.length < 4) {
            res.status(400)
            throw new Error("id deve possuir pelo menos dois caracteres")
        }


        if (typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("buyer deve ser uma string")
        }

        if (buyer_id.length < 4) {
            res.status(400)
            throw new Error("name deve pelo menospossuir dois caracteres")
        }

        if (typeof total_price !== "string") {
            res.status(400)
            throw new Error("preço total deve ser um number")
        }

        if (typeof paid !== "string") {
            res.status(400)
            throw new Error("paid at deve ser um number(0 ou 1)")
        }

      


        const [purchaseIdAlreadyExists]: TPurchase[] | undefined = await db("purchases").where({ id })

        if (purchaseIdAlreadyExists) {
            res.status(400)
            throw new Error("id da compra já existe")
        }

      

        const newPurchase = {
            id,
            buyer_id,
            total_price,
            paid
            
        }
        await db("purchases").insert(newPurchase)
        res.status(201).send({ message: "Compra criada com sucesso", purchase: newPurchase })


    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//DELETE PURCHASE BY ID__________________________________________________________________________

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete[0] !== "p") {
            res.status(400)
            throw new Error("id deve iniciar com a letra p")
        }

        const userIdAlreadyExists: TPurchase[] | undefined[] = await db("purchases").where({ id: idToDelete })



        if (!userIdAlreadyExists) {
            res.status(404)
            throw new Error("id não encontrado")
        }
        await db("purchases").del().where({ id: idToDelete })

        res.status(200).send({ message: "Compra deletada com sucesso" })

    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// GET PURCHASE BY ID_______________________________________________________________________________________________

app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [purchase] = await db("purchases").where({id:id})
        if(purchase){
            
            const [compra] = await db("purchases")
            .select(
                "purchases.id AS purchaseId",
                "users.id AS buyerId",
                "users.name AS buyerName",
                "users.email AS buyerEmail",
                "purchases.total_price AS totalPrice",
                "purchases.created_at AS createdAt",
                "purchases.paid AS Paid",
                )
            .innerJoin("users","purchases.buyer_id","=","users.id")
            const purchaseProducts = await db("purchases_products")
            .select("purchases_products.product_id AS id",
            "products.name",
            "products.price",
            "products.description",
            "products.image_url AS imageUrl",
            "purchases_products.quantity")
            .innerJoin("products","products.id","=","purchases_products.product_id")
            const result = {...compra,products:purchaseProducts}
            
            console.log(result)
            res.status(200).send(result)

        }else{
            res.status(404)
            throw new Error("Compra não encontrada");
            
        }
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

