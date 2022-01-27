import { useState } from "react";
import API from "../../dataLayer/api"
import { Container, Message } from "semantic-ui-react";
import SignUp, { SignUpFormValues } from "../../components/public/signUp";
import { useNavigate } from "react-router";

export function SignUpView()
{
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [signupMessage, setSignupMessage] = useState<string | undefined>();
    const navigate = useNavigate();

    const handleSignUp = async (values: SignUpFormValues) =>
    {
        setLoading(true);

        const { data, status } = await API.signUp(values);
        if (status === "success")
        {
            setSuccess(true);
            setTimeout(navigate, 2000, "/login");
        }
        else
        {
            setSignupMessage(data);
        }

        setLoading(false);
    }
    return (
        <Container style={{ width: 400, margin: 48 }}>
            <SignUp onSuccess={handleSignUp} loading={loading} />
            {
                success ? <Message success>Thank you for signing up!</Message> : signupMessage ? < Message error>{signupMessage}</Message> : null
            }
        </Container >
    )
}