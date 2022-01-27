import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

export type SignUpFormValues = {
    username: string;
    email: string,
    password: string,
    confirmPassword: string;
}

type LoginProps = {
    onSuccess: (formValues: SignUpFormValues) => void;
    onError?: (errors: any) => void;
    loading?: boolean;
}

export default function SignUp({ onSuccess, onError, loading }: LoginProps)
{

    const { handleSubmit, register } = useForm<SignUpFormValues>();

    return (
        <Form onSubmit={handleSubmit(onSuccess)}>
            <Form.Field>
                <label>Username</label>
                <input {...register("username")} name="username" placeholder="Username" />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input {...register("email")} type="email" name="email" placeholder="Email" />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input {...register("password")} type="password" name="password" placeholder="Password" />
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input {...register("confirmPassword")} type="password" name="confirmPassword" placeholder="Confirm Password" />
            </Form.Field>
            <Button type="submit">
                {loading ? "Loading..." : "Sign Up"}
            </Button>
        </Form>
    );
}