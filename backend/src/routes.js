const express = require('express')

const OngController = require("./controllers/OngController")
const IncidentController = require("./controllers/IncidentController")
const ProfilleController = require("./controllers/ProfilleControler")
const SectionController = require("./controllers/SectionController")

const routes = express.Router()

routes.post('/sessions', SectionController.create)

//listar ong
routes.get('/ongs', OngController.index)
//Cadastrar ong
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfilleController.index)

//criar um incident
routes.post('/incidents', IncidentController.create)
//listar incidents
routes.get('/incidents', IncidentController.index)
//deletar um incident
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes