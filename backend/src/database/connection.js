const knex = require('knex') //importar o knex
const configuration = require('../../knexfile') //importar o arquivo de configuração

const connection = knex(configuration.development) //escolher a conf de development

module.exports = connection