import styled from "styled-components"
import axios from "axios"
import { URL_GET_MOVIES } from "../../apiConstants";
import { useState } from "react";
import { useEffect } from "react";
import Movie from "../../components/Movie";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        // dispara requisição buscando filmes
        const promise = axios.get(URL_GET_MOVIES);
        // quando chegar resposta, atualiza estado dos movies
        promise.then((res) => setMovies(res.data));
        promise.catch((err) => console.log(err.response));
    }, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer width={(movies !== null) ? "330px" : "inherit"}>
                {
                    (movies !== null)
                        ?
                        movies.map(m => (
                            <Link to={`/sessoes/${m.id}`} key={m.id} >
                                <Movie posterURL={m.posterURL} />
                            </Link>
                        ))
                        :
                        <Loading />
                }
            </ListContainer>

        </PageContainer>
    )
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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: ${props => props.width};
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`