import ResetStyle from "./style/ResetStyle"
import GlobalStyle from "./style/GlobalStyle"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import NavigationMenu from "./components/NavigationMenu"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'pwt7EhhzeXUgaaubWqP8XRRT';

    return (
        <>
            <ResetStyle />
            <GlobalStyle />
            <BrowserRouter>
                <NavigationMenu />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                    <Route path="/assentos/:idSessao" element={<SeatsPage />} />
                    <Route path="/sucesso" element={<SuccessPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
