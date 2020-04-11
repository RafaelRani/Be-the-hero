const express = require("express") //importanto o express
const cors = require('cors') //determina qual endereço pode acesar a aplicação
const routes = require('./routes')
const app = express() //criando a aplicação

app.use(cors()) //como está em desenvolvimento, deixar assim
//se estivesse em produção: cors({ origin: 'http://meuapp.com'})
app.use(express.json()) //aceitar requisição em formato json
app.use(routes)


app.listen(3333) //mandando a aplicação ouvir a porta 3333

