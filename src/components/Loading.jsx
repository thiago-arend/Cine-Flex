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
    margin: 0;
`;