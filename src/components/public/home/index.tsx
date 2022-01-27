import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { GlobalContext } from "../../../contexts/globalContext";

export function Home()
{
    return (
        <Container style={{ width: "100%", minHeight: "50vh", margin: 50, display: "flex", alignItems: "center", flexDirection: "column", fontSize: 45, justifyContent: "center" }}>
            <Header style={{ display: "inline", fontSize: 100 }} as="h1">VEdit</Header>
            <hr style={{ width: 350, backgroundColor: "black", border: "none", height: 2 }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Link style={{ display: "inline", margin: 20 }} to={"/signup"}>Sign Up</Link>
                <Link style={{ display: "inline", margin: 20 }} to={"/login"}>Log In</Link>
            </div>
        </Container>
    )
}

export function PrivateHome()
{
    const logOut = useContext(GlobalContext).onLogout;
    return (
        <Container style={{ width: "100%", minHeight: "50vh", margin: 50, display: "flex", alignItems: "center", flexDirection: "column", fontSize: 45, justifyContent: "center" }}>
            <Header style={{ display: "inline", fontSize: 100 }} as="h1">VEdit</Header>
            <hr style={{ width: 350, backgroundColor: "black", border: "none", height: 2 }} />
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Link style={{ display: "inline", margin: 20 }} to={"/projects"}>Projects</Link>
                <Link style={{ display: "inline", margin: 20 }} to={"/"} onClick={logOut}>Log Out</Link>
            </div>
        </Container>
    )
}