import { useContext } from "react";
import { Home, PrivateHome } from "../../components/public/home";
import { GlobalContext } from "../../contexts/globalContext";

export function HomeView()
{
    const state = useContext(GlobalContext);
    return (
        <>
            {state.state.loggedIn ? <PrivateHome /> : <Home />}
        </>
    );
}