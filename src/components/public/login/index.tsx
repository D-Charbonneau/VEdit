import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

export type LoginFormValues = {
    username?: string;
    password?: string;
}

type LoginProps = {
    onSuccess: (formValues: LoginFormValues) => void;
    onError?: (errors: any) => void;
}

export default function Login({ onSuccess, onError }: LoginProps)
{
    const { handleSubmit, register } = useForm<LoginFormValues>();

    return (
        <Form onSubmit={handleSubmit(onSuccess)}>
            <Form.Field>
                <label>Username/Email</label>
                <input {...register("username")} name="username" placeholder="Username/Email" />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input {...register("password")} type="password" name="password" placeholder="Password" />
            </Form.Field>
            <Button type="submit">Log In</Button>
        </Form>
    );
}