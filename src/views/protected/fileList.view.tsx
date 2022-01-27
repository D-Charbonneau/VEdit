import { useContext } from "react";
import FileList, { NewProjectFormValues } from "../../components/protected/fileList";
import { GlobalContext } from "../../contexts/globalContext";
import API from "../../dataLayer/api";

export function FileListView()
{
    const state = useContext(GlobalContext);
    const handleNewProject = async (values: NewProjectFormValues) =>
    {
        if (state.state.user?.id)
        {
            let result = await API.newProject(state.state.user?.id, values.title);
            if (result.status === "success" && state.refreshData !== undefined)
            {
                state.refreshData(result.data.message);
            }
        }
    }

    const handleDeleteProject = (index: number) =>
    {
        return async () =>
        {
            if (state.state.user?.id)
            {
                let result = await API.deleteProject(state.state.user?.id, index);
                if (result.status === "success" && state.refreshData !== undefined)
                {
                    state.refreshData(result.data.message);
                }
            }
        }
    }

    return (
        <FileList deleteProjectHandler={handleDeleteProject} projectHandler={handleNewProject} />
    );
}