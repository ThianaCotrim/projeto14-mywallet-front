import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage({ token }) {
  const {tipo} = useParams()
  const [form, setForm] = useState ({valor: "", descricao: "", tipo:tipo})
  const navigate = useNavigate()

  
  function cadastrarTransacao (e) {
    e.preventDefault()

    const config = {
      headers: {  
        Authorization: `Bearer ${token}`
      }
    }

    axios.post(`${process.env.REACT_APP_API}/transacao`, form, config)
    .then((res) => navigate("/home"))
    .catch((err) => console.log(err.message))

  }


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={cadastrarTransacao}>
        <input 
        placeholder="Valor" 
        type="text"
        value={form.valor}
        onChange={(e) => setForm({...form, valor: e.target.value})}
        />
        <input 
        placeholder="Descrição" 
        type="text" 
        value={form.descricao}
        onChange={(e) => setForm({...form, descricao: e.target.value})}/>
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
