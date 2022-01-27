import Login from "../../components/public/login";
import { Container } from "semantic-ui-react";
import { GlobalContext } from "../../contexts/globalContext";
import { useContext } from "react";

export function LoginView()
{
    const value = useContext(GlobalContext);
    return (
        <>
            {
                value.onLogin ? <Container>
                    <Login onSuccess={value.onLogin} />
                </Container> : <Container>
                    <Login onSuccess={() => { console.log("Something went wrong.") }} />
                </Container>
            }
        </>
    )
}