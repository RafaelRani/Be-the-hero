const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const {page = 1} = request.query //por padrão é 1, se não encontrar nada

        //contar quantos registros tem na tabela 'incidents'
        const [count] = await connection('incidents').count() //count em colchetes para pegar o primereiro resultado

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //relacionamento: trazer somnete os casos da ong de id especificado 
            .limit(5) //5 registros por página
            .offset((page - 1) * 5)
            .select([
                'incidents.*', //selecionar todos os campos da tabela incidents e também os campos abaixo da tabela ongs
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]) //selecionar todos

        response.header('X-Total-Count', count['count(*)']) //retornar a var count no cabeçalho definido como X-Total-count

        return response.json(incidents)
    },

    //criar um incident
    async create(request, response){
        const {title, description, value} = request.body
        const ong_id = request.headers.authorization //pegar do header

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(request, response){
        const {id} = request.params //pegar o id passado como parâmetro
        const ong_id = request.headers.authorization //pegar do header

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if(incident.ong_id != ong_id ){
            return response.status(401).json({error: 'Operation not permited.'}) //http status code 401: não autorizado
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send() //http status code 204: resposta que deu sucesso mas não tem conteúdo
    }
}