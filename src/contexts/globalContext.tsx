import { createContext, ReactNode, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { LoginFormValues } from "../components/public/login";
import API from "../dataLayer/api";

type User = {
    email: string;
    id: string;
    pass: string;
    username: string;
    pfp: string;
    projects: Array<{ title: string }>;
}

type GlobalState = {
    loggedIn: boolean;
    user?: User;
}

type ProviderState = {
    state: GlobalState;
    onLogin?: (formValues: LoginFormValues) => any;
    onLogout?: () => void;
    refreshData?: (user: User) => void;
}

type Props = {
    children: ReactNode;
}
export const GlobalContext = createContext<ProviderState>({ state: { loggedIn: false } });

export function GlobalContextProvider({ children }: Props)
{
    const [state, setState] = useState<GlobalState>({ loggedIn: false })
    const navigate = useNavigate();

    const handleDataChange = (user: User) =>
    {
        setState({ loggedIn: state.loggedIn, user: user });
    }

    const handleLogIn = async (formValues: LoginFormValues) =>
    {
        if (formValues.username && formValues.password)
        {
            const result = await API.login(formValues.username, formValues.password);
            if (result.status === "success")
            {
                setState({ loggedIn: true, user: result.data });
                navigate("/projects");
            }
        }
    }

    const handleLogOut = () =>
    {
        setState({ loggedIn: false });
    }

    const ProviderObj = useMemo(() => ({
        state,
        onLogin: handleLogIn,
        onLogout: handleLogOut,
        refreshData: handleDataChange
    }), [state])

    return (
        <GlobalContext.Provider value={ProviderObj}>
            {children}
        </GlobalContext.Provider>)
}