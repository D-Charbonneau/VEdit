import { useContext } from "react";
import { Account, PasswordChangeFormValues, PFPChangeFormValues, UsernameChangeFormValues } from "../../components/protected/account";
import { GlobalContext } from "../../contexts/globalContext";
import API from "../../dataLayer/api";

export function AccountView()
{
    const state = useContext(GlobalContext);
    const handleUsernameChange = async (values: UsernameChangeFormValues) =>
    {
        if (state.state.user?.pass)
        {
            let result = await API.changeUsername(state.state.user?.pass, values.username, values.confirmusername);
            if (result.status === "success" && state.refreshData !== undefined)
            {
                state.refreshData(result.data.message);
            }
        }
    }

    const handlePasswordChange = async (values: PasswordChangeFormValues) =>
    {
        if (state.state.user?.id)
        {
            let result = await API.changePassword(state.state.user?.id, values.oldpassword, values.password, values.confirmpassword);
            if (result.status === "success" && state.refreshData !== undefined)
            {
                state.refreshData(result.data.message);
            }
        }
    }

    const handlePFPChange = async (values: PFPChangeFormValues) =>
    {
        if (state.state.user?.id)
        {
            let result = await API.changePFP(state.state.user?.id, values.pfp);
            if (result.status === "success" && state.refreshData !== undefined)
            {
                state.refreshData(result.data.message);
            }
        }
    }

    return <Account usernameHandler={handleUsernameChange} passwordHandler={handlePasswordChange} pfpHandler={handlePFPChange} />;
}