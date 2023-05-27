import styled from "styled-components"
import loadingIcon from "../assets/loading_icon.gif"

export default function Loading() {
    return (
        <LoadingContainer>
            <img src={loadingIcon} />
        </LoadingContainer>
    );
}

const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;