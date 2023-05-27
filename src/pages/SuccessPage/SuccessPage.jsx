import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage() {
    const location = useLocation();
    const {filme, horario, semana, data, assentos, comprador, cpf} = location.state;
    console.log(assentos);

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{filme}</p>
                <p>{data} - {horario}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {assentos.map(n => <p key={n}>Assento {n}</p>)}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {comprador}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <Link to="/">
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`