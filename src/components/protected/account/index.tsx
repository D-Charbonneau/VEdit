import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { Accordion, Button, Form, Icon } from "semantic-ui-react";
import { GlobalContext } from "../../../contexts/globalContext"

export type UsernameChangeFormValues = {
    username: string,
    confirmusername: string;
}

export type PasswordChangeFormValues = {
    oldpassword: string,
    password: string,
    confirmpassword: string;
}

export type PFPChangeFormValues = {
    pfp: string;
}

type FormHandles = {
    usernameHandler: (formValues: UsernameChangeFormValues) => void,
    passwordHandler: (formValues: PasswordChangeFormValues) => void;
    pfpHandler: (formValues: PFPChangeFormValues) => void;
}

export function Account({ usernameHandler, passwordHandler, pfpHandler }: FormHandles)
{
    const [state, setState] = useState<number>(-1);

    const handleClick = (e: any, titleProps: any) =>
    {
        const { index } = titleProps
        const activeIndex = state
        const newIndex = activeIndex === index ? -1 : index

        setState(newIndex)
    }

    const user = useContext(GlobalContext).state.user;
    const { handleSubmit, register } = useForm();
    return (
        <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", margin: 40 }}>
                <h1>{user?.username}{user?.username.substring(user?.username.length - 1) === "s" ? "'" : "'s"} Account</h1>
                <img src={user?.pfp} width={300} className="largepfp" alt="Profile" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", margin: 40 }}>
                <Accordion>
                    <Accordion.Title
                        active={state === 0}
                        index={0}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Change Username
                    </Accordion.Title>
                    <Accordion.Content active={state === 0}>
                        <Form onSubmit={handleSubmit(usernameHandler)}>
                            <Form.Field>
                                <label>New Username</label>
                                <input {...register("username")} name="username" placeholder="New Username" />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm New Username</label>
                                <input {...register("confirmusername")} name="confirmusername" placeholder="Confirm New Username" />
                            </Form.Field>
                            <Button type="submit">
                                Change Username
                            </Button>
                        </Form>
                    </Accordion.Content>
                </Accordion>
                <Accordion style={{ marginTop: 15 }}>
                    <Accordion.Title
                        active={state === 1}
                        index={1}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Change Password
                    </Accordion.Title>
                    <Accordion.Content active={state === 1}>
                        <Form onSubmit={handleSubmit(passwordHandler)}>
                            <Form.Field>
                                <label>Old Password</label>
                                <input {...register("oldpassword")} type="password" name="oldpassword" placeholder="Old Password" />
                            </Form.Field>
                            <Form.Field>
                                <label>New Password</label>
                                <input {...register("password")} type="password" name="password" placeholder="New Password" />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm New Password</label>
                                <input {...register("confirmpassword")} type="password" name="confirmpassword" placeholder="Confirm New Password" />
                            </Form.Field>
                            <Button type="submit">
                                Change Password
                            </Button>
                        </Form>
                    </Accordion.Content>
                </Accordion>
                <Accordion style={{ marginTop: 15 }} >
                    <Accordion.Title
                        active={state === 2}
                        index={2}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Change Profile Picture
                    </Accordion.Title>
                    <Accordion.Content active={state === 2}>
                        <Form onSubmit={handleSubmit(pfpHandler)}>
                            <Form.Field>
                                <label>Link to profile picture (Leave blank for default)</label>
                                <input {...register("pfp")} name="pfp" placeholder="Link to profile picture" />
                            </Form.Field>
                            <Button type="submit">
                                Change Profile Picture
                            </Button>
                        </Form>
                    </Accordion.Content>
                </Accordion>
            </div>
        </div >
    )
}