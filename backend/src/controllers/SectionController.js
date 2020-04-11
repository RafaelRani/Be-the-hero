const connection = require('../database/connection')

module.exports = {
    async create(request, response){
        const {id} = request.body

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first() //retorna só o primeiro resultado da busca
        
        if(!ong){ //se não encoontrou a ong
            return response.status(400).json({error: 'No ong found with this Id'})
        }

        return response.json(ong)
    }
}