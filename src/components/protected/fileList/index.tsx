import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, Button, Form, Icon, Segment } from "semantic-ui-react";
import { GlobalContext } from "../../../contexts/globalContext";

export type NewProjectFormValues = {
    title: string;
}

type Handles = {
    projectHandler: (formValues: NewProjectFormValues) => void;
    deleteProjectHandler: (index: number) => () => void;
}

export default function FileList({ projectHandler, deleteProjectHandler }: Handles)
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
        <>
            <Accordion style={{ margin: 30 }}>
                <Accordion.Title
                    active={state === 0}
                    index={0}
                    onClick={handleClick}
                >
                    <Icon name='dropdown' />
                    New Project
                </Accordion.Title>
                <Accordion.Content active={state === 0}>
                    <Form onSubmit={handleSubmit(projectHandler)}>
                        <Form.Field>
                            <label>Project Title</label>
                            <input {...register("title")} name="title" placeholder="Title" />
                        </Form.Field>
                        <Button type="submit">
                            <Icon name='plus' />
                            Create Project
                        </Button>
                    </Form>
                </Accordion.Content>
            </Accordion>
            {user?.projects.map((obj, activeIndex) => (
                <Segment>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h1 style={{ display: "inline-block" }}>{obj.title}</h1>
                        <Button style={{ width: 10, display: "flex", justifyContent: "center", alignItems: "center" }} onClick={deleteProjectHandler(activeIndex)}><Icon name='trash' /></Button>
                    </div>
                </Segment>
            ))}
        </>
    );
}