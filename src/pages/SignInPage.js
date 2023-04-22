import styled from "styled-components"
import { Link, useNavigate} from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"


export default function SignInPage({setToken}) {

  const [form, setForm] = useState({email:"", senha:""})
  const navigate = useNavigate()


  function entrarNoApp (e){
    e.preventDefault()

    //eslint-disable-next-line no-undef
    axios.post(`${process.env.REACT_APP_API}/login`, form)
    .then((res) => {
      // const {nome} = res.data
      // setUsuario({nome})
      setToken(res.data)
      navigate("/home")
    })
    .catch((err) => console.log(err))

  }


  return (
    <SingInContainer>
      <form onSubmit={entrarNoApp}>
        <MyWalletLogo />
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
        onChange={(e) => setForm({...form, senha: e.target.value})}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
