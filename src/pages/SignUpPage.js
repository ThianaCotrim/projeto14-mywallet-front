import { Link, useNavigate} from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [form, setForm] = useState ({nome: "", email: "", senha:"", confsenha:""})
  const navigate = useNavigate()

  function cadastrarNovoUsuario(e){
    e.preventDefault()

    axios.post("http://localhost:5000/cadastro", form)
    .then((res) => navigate("/"))
    .catch((err) => console.log(err.response.data))
  }

  return (
    <SingUpContainer>
      <form onSubmit={cadastrarNovoUsuario}>
        <MyWalletLogo />
        <input 
          placeholder="Nome" 
          type="text" 
          value={form.nome}
          onChange={(e) => setForm({...form, nome: e.target.value})}
        />
        <input 
          placeholder="E-mail" 
          type="email" 
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password" 
          value={form.senha}
          onChange={(e) => setForm({...form, senha: e.target.value})}
        />
        <input 
          placeholder="Confirme a senha" 
          type="password" 
          autocomplete="new-password" 
          value={form.confsenha}
          onChange={(e) => setForm({...form, confsenha: e.target.value})}/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
