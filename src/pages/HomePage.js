import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage({token, perfilNome}) {


  const [transacao, setTransacao] = useState([])

  
  useEffect(() => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get("http://localhost:5000/transacao", config)
    .then((res) => setTransacao(res.data))
    .catch((err) => console.log(err))

  }, [])

  const navigate = useNavigate()

  function entrada (){
    navigate("/nova-transacao/entrada")
  }

  function saida (){
    navigate("/nova-transacao/saida")
  }

  function sair (){
    navigate('/')
    localStorage.clear()
  }


  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {perfilNome}</h1>
        <BiExit onClick={sair}/>
      </Header>

      <TransactionsContainer>
        <ul>
    {transacao.map((t) => (
      <ListItemContainer>
      <div>
        <span>{t.newTransacao.date}</span>
        <strong>{t.newTransacao.descricao}</strong>
      </div>
      <Value color={t.newTransacao.tipo}>{t.newTransacao.valor}</Value>
    </ListItemContainer>

    ))}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>
      <Testando>
      <Teste onClick={entrada}>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
         </Teste>
        
      <Teste onClick={saida}>
       <button> 
        <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        </Teste>
        </Testando>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const Teste = styled.div`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: space-around;
  
  button {  
    width: 96%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "credito" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const Testando = styled.div`
display:flex;


`