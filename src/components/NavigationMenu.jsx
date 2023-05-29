import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function NavigationMenu() {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    return (
        <NavContainer>
            {
                (location !== "/") && <ion-icon
                    data-test="go-home-header-btn"
                    onClick={() => navigate(-1)}
                    name="arrow-back-outline"></ion-icon>
            }
            CINEFLEX
        </NavContainer>
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    ion-icon {
        color: black;
        position: absolute;
        left: 20px;
    }
`