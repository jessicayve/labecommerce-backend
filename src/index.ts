import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'


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

app.get("/users", async (req:Request, res:Response)=>{
    try{
        const result = await db.raw(`SELECT * FROM users`)

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

app.get("/products", async (req:Request, res:Response)=>{
    try{
        const result = await db.raw(`SELECT * FROM products`)

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

app.get("/products/search", async(req:Request, res:Response)=>{

    try{
       
        const name = req.query.name
        const result = await db.raw(`SELECT * FROM products WHERE name = "${name}";`);

       
        if(!result){
            res.status(404)
            throw new Error("Produto não existe")
        }
        res.status(200).send(result)

       
    }catch(error){
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