import React, { useState } from 'react' //importar o react
import { FiLogIn } from 'react-icons/fi' //npm install react-icons / importar o ícone de login
import { Link, useHistory } from 'react-router-dom' //para adicionar links semelhante ao <a href> porém troca de rota sem precisar recarregar a página

import api from '../../services/api'

import './styles.css' //importar o arquivo de estilização

import LogoImg from '../../assets/logo.svg' //importar a logo
import heroesImg from '../../assets/heroes.png' //importar a imagem

export default function Logon(){
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('sessions', {id})

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        }catch(err){
            alert('Falha no Login, tente novamente!')
        }
    }

    return (
    <div className="logon-container">
        <section className="form">
            <img src={LogoImg} alt="be the hero" />
            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>
                <input
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                 />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    não tenho cadastro
                </Link>
            </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
    </div>
    )
}