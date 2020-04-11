const connection = require("../database/connection")
const crypto = require('crypto') //importar biblioteca para encriptação


module.exports = {
    //listar ong
    async index(request, response) {
        const ongs = await connection('ongs').select('*') //aguardar retornar todos os registros da tabela ongs

        return response.json(ongs)
    },

    //Cadastrar ong
    async create(request, response) { //async: define como uma função assíncrona
        const { name, email, whatsapp, city, uf } = request.body
    
        const id = crypto.randomBytes(4).toString('HEX') //criar uma id de 4 dígitos aleatórios em hexadecimal
    
        await connection('ongs').insert({ //await: aguardar o código finalizar para então continuar
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id })
    }
}