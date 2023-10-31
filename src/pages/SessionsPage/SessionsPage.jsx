import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Loading from "../../components/Loading"
import { URL_GET_MOVIE_SESSIONS } from "../../apiConstants"
import axios from "axios"
import { useEffect } from "react";
import NavigationMenu from "../../components/NavigationMenu";

export default function SessionsPage() {
    const [movie, setMovie] = useState(null);
    const { idFilme } = useParams();

    useEffect(() => {
        const promise = axios.get(URL_GET_MOVIE_SESSIONS.replace("ID_DO_FILME", idFilme));
        promise.then((res) => setMovie(res.data));
        promise.catch((err) => {
            alert(`Ocorreu um erro "${err.response.data}" 
                na comunicação com o servidor...`)});
    }, []);

    if (movie !== null)
        return (
            <>
                
                <PageContainer>

                    Selecione o horário
                    <div>
                        {movie.days.map(d => {
                            const { id, weekday, date, showtimes } = d;

                            return (
                                <SessionContainer data-test="movie-day" key={id}>
                                    {weekday} - {date}
                                    <ButtonsContainer>
                                        {
                                            showtimes.map(st => {
                                                return (
                                                    <Link to={`/assentos/${st.id}`} key={st.id} >
                                                        <button data-test="showtime">{st.name}</button>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </ButtonsContainer>
                                </SessionContainer>
                            )
                        })}
                    </div>

                    <FooterContainer data-test="footer">
                        <div>
                            <img src={movie.posterURL} alt="poster" />
                        </div>
                        <div>
                            <p>{movie.title}</p>
                        </div>
                    </FooterContainer>

                </PageContainer>
            </>
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
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    min-width: calc(78%);
    justify-content: space-between;
    flex-direction: row;
    margin: 20px 0;
    a {
        text-decoration: none;
    }
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