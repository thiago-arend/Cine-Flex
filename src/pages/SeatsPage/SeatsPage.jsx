import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { URL_GET_SESSION_SEATS, URL_RESERVE_SEATS } from "../../apiConstants";
import Loading from "../../components/Loading";
import ASSENTOS from "../../mockAssentos";

export default function SeatsPage() {
    const { idSessao } = useParams();

    const [session, setSession] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [formData, setFormData] = useState({ name: "", cpf: "" });

    const navigate = useNavigate();

    useEffect(() => {
        /*
        const promise = axios.get(URL_GET_SESSION_SEATS.replace("ID_DA_SESSAO", idSessao));
        promise.then((res) => {
            setSession(res.data);
        });
         promise.catch((err) => console.log(err.response));
        */
        setSession(ASSENTOS)
    }, []);

    function selecionarAssento(id, disponivel) {
        if (!disponivel) {
            alert("Esse assento não está disponível");
            return;
        }

        let novoArray = [];
        if (selectedSeats.includes(id)) { // se o assento já foi selecionado
            novoArray = selectedSeats.filter(sId => sId !== id); // remove dos selecionados
        }
        else {
            novoArray = [...selectedSeats, id]; // acrescenta nos selecionados
        }
        setSelectedSeats(novoArray); // atualiza o vetor de selecionados
    }

    function handleChange(e) {
        const dados = { ...formData };
        dados[e.target.name] = e.target.value;
        setFormData(dados);
    }

    function preparaObjetoSucesso() {
        const { name: horario } = session;
        const { title: filme } = session.movie;
        const { date: data } = session.day;
        const assentos = session.seats.filter(seat => selectedSeats.includes(seat.id)).
            map(s => s.name);
        const comprador = formData.name;
        const cpf = formData.cpf;

        const sucessoObjct = {
            filme,
            horario,
            data,
            assentos,
            comprador,
            cpf
        };

        return sucessoObjct;
    }

    function reservarAssentos(e) {
        e.preventDefault();
        const reserva = {
            ids: selectedSeats,
            name: formData.name,
            cpf: formData.cpf
        }

        const promise = axios.post(URL_RESERVE_SEATS, reserva);
        promise.then((res) => {
            // preparar informações para o envio pela rota
            preparaObjetoSucesso();

            // altera a rota, enviando objeto
            navigate("/sucesso", { state: preparaObjetoSucesso() })
        });
        promise.catch((err) => console.log(err.response));
    }

    if (session !== null)
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>
                    {
                        (session !== null)
                            ?
                            (session.seats.map(s => (
                                <SeatItem
                                    onClick={() => selecionarAssento(s.id, s.isAvailable)}
                                    isSelected={selectedSeats.includes(s.id)}
                                    isAvailable={s.isAvailable ? true : false}
                                    key={s.id} >
                                    {s.name}
                                </SeatItem>
                            )))
                            :
                            <Loading />
                    }
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle color="#1AAE9E" borderColor="#0E7D71" />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle color="#C3CFD9" borderColor="#7B8B99" />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle color="#FBE192" borderColor="#F7C52B" />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    <form onSubmit={reservarAssentos}>
                        <label htmlFor="name">Nome do Comprador:</label>
                        <input
                            required
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Digite seu nome..."
                            value={formData.name} />

                        <label htmlFor="cpf">CPF do Comprador:</label>
                        <input
                            required
                            onChange={handleChange}
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite seu CPF..."
                            minLength="11"
                            maxLength="11"
                            value={formData.cpf} />

                        <button type="submit">Reservar Assento(s)</button>
                    </form>
                </FormContainer>

                <FooterContainer>
                    <div>
                        <img src={session.movie.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{session.movie.title}</p>
                        <p>{session.day.weekday} - {session.day.date}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    
    return <Loading />
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${`1px solid ${props => props.borderColor}`};
    background-color: ${props => props.color};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: ${`1px solid ${props => {
        const { isAvailable, isSelected } = props;
        if (isSelected) {
            return "#0E7D71";
        }

        if (isAvailable) {
            return "#7B8B99";
        }
        else {
            return "#F7C52B";
        }
    }}`};

    background-color: ${props => {
        const { isAvailable, isSelected } = props;
        if (isSelected) {
            return "#1AAE9E";
        }

        if (isAvailable) {
            return "#C3CFD9";
        }
        else {
            return "#FBE192";
        }
    }};

    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`