
import { Categoria, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from "express"
import cors from 'cors'

import { db } from "./database/knex"




const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log(`serviddor rodando na porta 3003`)
})

app.get('/ping',  async (req: Request, res: Response) => {
    res.send('servidor rodando')
})





//get all users
app.get('/users', async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM users;`)
        res.status(200).send(result)

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//addNewUser
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body as TUser
        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("Id inválido");
        }
        if (typeof email !== 'string') {
            res.status(400)
            throw new Error("Email inválido");
        }
        if (typeof password !== 'string') {
            res.status(400)
            throw new Error("Senha inválida");
        }
        
        const [newId] = await db.raw(`SELECT * FROM users WHERE id="${id}"`)
        if (newId) {
            res.status(422)
            throw new Error("Id ja utilizado em outro usuario");

        }
        const [newEmail] = await db.raw(`SELECT * FROM users WHERE email="${email}"`)
        if (newEmail) {
            res.status(422)
            throw new Error("Email ja utilizado em outro usuario");

        }
      
        await db.raw(
            `INSERT INTO users (id,name,email,password)
            VALUES
            ("${id}","${name}","${email}","${password}";`)

        res.status(201).send("User criado com sucesso")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//deleteUserByID
app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [newUser] = await db.raw(`SELECT * FROM users WHERE id="${id}"`)

        if (newUser) {
             await db.raw(`DELETE FROM users WHERE id="${id}"`)           
            res.status(200).send("User apagado com sucesso")
        } else {
            res.status(404).send("Usuario não encontrado")
        }


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//editUserById
app.put('/user/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email, password } = req.body

        if (email !== undefined) {
            if (typeof email !== 'string') {
                res.status(400)
                throw new Error("Email inválido");
            }
            if (email.length < 6) {
                res.status(400)
                throw new Error("Email deve ter pelomenos 6 caracteres");
            }
            if (!email.includes("@")) {
                res.status(400)
                throw new Error("Email inválido2");
            }

        }
        if (password !== undefined) {
            if (typeof password !== 'string') {
                res.status(400)
                throw new Error("Senha inválida");
            }
            if (password.length < 4) {
                res.status(400)
                throw new Error("Senha deve ter pelo menos 4 caracteres");
            }
        }
        const [user] = await db.raw(`SELECT * FROM users WHERE id="${id}"`)
        if (user) {
            await db.raw(`
            UPDATE users
            SET
            email="${email}",
            password="${password}"
            WHERE id = "${id}";`)
            user.email = email || user.email
            user.password = password || user.password
            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Usáario não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//Product


app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM products;`)

        res.status(200).send(result)


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
//getProductByName
app.get('/products/search', async (req: Request, res: Response) => {



    try {
        const name = req.query.name
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("query tem q ser uma string");
        }
        if (name.length < 1) {
            res.status(400)
            throw new Error("Query tem que ter ao menos 1 caracter");
        }
      const result =  await db.raw(`
        SELECT * FROM products
        WHERE id LIKE "%${name}%";`)

        res.status(200).send(result)


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
app.get('/product/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [newId] = await db.raw(`SELECT * FROM products WHERE id="${id}";`)
        
        if (newId) {
            res.status(200).send(newId)
        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.post('/products', async (req: Request, res: Response) => {

    try {
        const { id, name, price, description, imageUrl, category } = req.body as TProduct

        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("Id tem que ser uma string");
        }
        if (typeof name !== 'string') {
            res.status(400)
            throw new Error("Name tem que ser uma string");
        }
        if (typeof price !== 'number') {
            res.status(400)
            throw new Error("Price tem que ser um number");
        }
        if(typeof description!=="string"){
            res.status(400)
            throw new Error("Description tem que ser uma string");
        }
        if(typeof imageUrl!=="string"){
            res.status(400)
            throw new Error("urlImage tem que ser uma string");
        }


        if (category !== Categoria.ACCESSORIES &&
            category !== Categoria.CLOTHES_AND_SHOES &&
            category !== Categoria.ELECTRONICS) {
            res.status(400)
            throw new Error(`Catgegoria tem que ser, ${Categoria.ACCESSORIES}, ${Categoria.CLOTHES_AND_SHOES} ou ${Categoria.ELECTRONICS}`);
        }
        const [newId] = await db.raw(`SELECT * FROM products WHERE id="${id}";`)
        if (newId) {
            res.status(422)
            throw new Error("Id já existente");
        }
        await db.raw(`
        INSERT INTO products (id,name,price,description,url_image,category)
        VALUES("${id}","${name}",${price},"${description}","${imageUrl}","${category}");`)
       
        res.status(201).send("Produto criado com sucesso")


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.delete('/product/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [product] = await db.raw(`SELECT * FROM products WHERE id="${id}";`)

        if (product) {
            await db.raw(`DELETE FROM products WHERE id="${id}";`)
            res.status(200).send("Produto removido com sucesso")

        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})



app.put('/product/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const {name, price, description, imageUrl, categoria} = req.body
    

        if (name !== undefined) {
            if (typeof name !== 'string') {
                res.status(400)
                throw new Error("Name deve ser uma string");
            }
            if (name.length < 1) {
                res.status(400)
                throw new Error("Name deve ter pelo menos 1 character");
            }
        }
        if (price !== undefined) {
            if (typeof price !== 'number') {
                res.status(400)
                throw new Error("Price deve ser um number");
            }
            if (price < 0) {
                res.status(400)
                throw new Error("Price não pode ser negativo");
            }
        }
        if (categoria !== undefined) {
            if (categoria !== categoria.ACCESSORIES &&
                categoria !== categoria.CLOTHES_AND_SHOES &&
                categoria !== categoria.ELECTRONICS) {
                res.status(400)
                throw new Error(`Catgegoria tem que ser, ${categoria.ACCESSORIES}, ${Categoria.CLOTHES_AND_SHOES} ou ${Categoria.ELECTRONICS}`);
            }
        }

        const [product] = await db.raw(`SELECT * FROM products WHERE id="${id}";`)
        if (product) {

            await db.raw(`UPDATE products
            SET 
            name="${name || product.name}",
            price =${isNaN(price) ? product.price : price},
            description="${description || product.description}",
            url_image="${imageUrl || product.urlImage}",
            category="${categoria|| product.category}"
            WHERE id="${id}";`)
            res.status(200).send("Produto atualizado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//purchase
app.post('/purchase',  async (req: Request, res: Response) => {
    try {
        const {productId, buyer_id } = req.body as TPurchase
     

        if (typeof buyer_id !== 'string') {
            res.status(400)
            throw new Error("buyerID tem que ser uma string");
        }
        
        const [newId] = await db.raw(`SELECT * FROM users WHERE id="${buyer_id}"`)
        if (!newId) {
            res.status(400)
            throw new Error("Não foi possivel achar o usuario pelo ID");
        }

        await db.raw(`
        INSERT INTO purchases (id,buyer_id)
        VALUES("${productId}","${buyer_id}")`)
        res.status(201).send("Compra realizada com sucesso")


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//CRIAR uma purchase_product
app.post('/purchase/:id' ,async (req:Request, res:Response)=>{
    try {
        const purchaseID = req.params.id
        const {productID, quantity} = req.body
        const [product] = await db.raw(`SELECT * FROM products WHERE id = "${productID}";`)
        let totalPrice = 0;
        if(!product){
            res.status(404)
            throw new Error("Produto não encontrado");
        }else{
            totalPrice = product.price * quantity
        }
        if(quantity<1){
            res.status(400)
            throw new Error("Quantidade tem que ser maior que 1");
        }
        await db.raw(`
        INSERT INTO purchases_products(purchase_id, product_id, totalPrice)
        VALUES("${purchaseID}","${productID}","${totalPrice}")`)
        res.status(201).send("Purchase criada")
    } catch (error:any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

