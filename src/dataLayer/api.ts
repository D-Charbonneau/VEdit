import { SignUpFormValues } from "../components/public/signUp";
import { v4 as uuidv4 } from 'uuid';

type APIResponse = {
    data?: any,
    status: string;
}

export function checkPassword(pass: string, confirm: string)
{
    return /\S/.test(pass) && /\d/.test(pass) && /[a-z]/i.test(pass) && pass.length > 7 && pass === confirm;
}

export default class API
{
    static signUp(formValues: SignUpFormValues): Promise<APIResponse>
    {
        const userID = uuidv4();
        const { password, confirmPassword, ...user } = formValues;
        if (user.username && user.email && password && checkPassword(password, confirmPassword))
        {
            let grabData = window.localStorage.getItem("userData");
            if (!grabData)
            {
                grabData = JSON.stringify([]);
            }
            let oldData: any = JSON.parse(grabData);
            const hashedPassword = btoa(password + userID);
            oldData.push({ id: userID, ...user, pfp: process.env.PUBLIC_URL + '/images/defaultpfp.png', pass: hashedPassword, projects: [] });
            window.localStorage.setItem("userData", JSON.stringify(oldData));
            return new Promise((resolve: Function, reject: Function) =>
            {
                setTimeout(() =>
                {
                    resolve({
                        data: user,
                        status: "success"
                    });
                }, Math.random() * 500 + 1000)
            });
        }
        else if (!user.username)
        {
            return new Promise((resolve: Function, reject: Function) =>
            {
                setTimeout(() =>
                {
                    resolve({
                        data: "Missing Username",
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            });
        }
        else if (!user.email)
        {
            return new Promise((resolve: Function, reject: Function) =>
            {
                setTimeout(() =>
                {
                    resolve({
                        data: "Missing Email",
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            });
        }
        return new Promise((resolve: Function, reject: Function) =>
        {
            setTimeout(() =>
            {
                resolve({
                    data: "Invalid Password. (8+ characters, no spaces, at least 1 number and 1 letter)",
                    status: "error"
                });
            }, Math.random() * 500 + 1000)
        });
    }
    static login(username: string, password: string)
    {
        return new Promise<APIResponse>((resolve: Function, reject: Function) =>
        {
            let users: any;
            if (window.localStorage.getItem("userData") !== null)
            {
                users = JSON.parse(String(window.localStorage.getItem("userData")));
            }

            for (let i = 0; i < users.length; i++)
            {
                if (users[i].username === username && users[i].pass === btoa(password + users[i].id))
                {
                    setTimeout(() =>
                    {
                        resolve({
                            data: users[i],
                            status: "success"
                        });
                    }, Math.random() * 500 + 1000)
                }
            }
            setTimeout(() =>
            {
                resolve({
                    data:
                        { message: "Could not find user or invalid credentials" },
                    status: "error"
                });
            }, Math.random() * 500 + 1000)
        });
    }
    static changeUsername(oldPass: string, username: string, confirmUsername: string)
    {
        return new Promise<APIResponse>((resolve: Function, reject: Function) =>
        {
            if (username === confirmUsername)
            {
                let users: any;
                let found = -1;
                if (window.localStorage.getItem("userData") !== null)
                {
                    users = JSON.parse(String(window.localStorage.getItem("userData")));
                }
                for (let i = 0; i < users.length; i++)
                {
                    if (users[i].pass === oldPass)
                    {
                        found = i;
                        break;
                    }
                }
                if (found === -1)
                {
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: "Could not find user" },
                            status: "error"
                        });
                    }, Math.random() * 500 + 1000)
                }
                else
                {
                    users[found].username = username;
                    window.localStorage.setItem("userData", JSON.stringify(users));
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: users[found] },
                            status: "success"
                        });
                    }, Math.random() * 500 + 1000)
                }
            }
            else
            {
                setTimeout(() =>
                {
                    resolve({
                        data:
                            { message: "Usernames do not match" },
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            }
        })
    }
    static changePassword(uuid: string, oldPassword: string, password: string, confirmPassword: string)
    {
        return new Promise<APIResponse>((resolve: Function, reject: Function) =>
        {
            if (checkPassword(password, confirmPassword))
            {
                let users: any;
                let found = -1;
                if (window.localStorage.getItem("userData") !== null)
                {
                    users = JSON.parse(String(window.localStorage.getItem("userData")));
                }
                for (let i = 0; i < users.length; i++)
                {
                    if (users[i].id === uuid)
                    {
                        found = i;
                        break;
                    }
                }
                if (found === -1)
                {
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: "Could not find user" },
                            status: "error"
                        });
                    }, Math.random() * 500 + 1000)
                }
                else
                {
                    if (btoa(oldPassword + uuid) === users[found].pass)
                    {
                        users[found].pass = btoa(password + uuid);
                        window.localStorage.setItem("userData", JSON.stringify(users));
                        setTimeout(() =>
                        {
                            resolve({
                                data:
                                    { message: users[found] },
                                status: "success"
                            });
                        }, Math.random() * 500 + 1000)
                    }
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: "Could not change password" },
                            status: "error"
                        });
                    }, Math.random() * 500 + 1000)
                }
            }
            else
            {
                setTimeout(() =>
                {
                    resolve({
                        data:
                            { message: "Password does not match confirmation." },
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            }
        })
    }
    static changePFP(id: string, link: string)
    {
        return new Promise<APIResponse>((resolve: Function, reject: Function) =>
        {
            let users: any;
            let found = -1;
            if (window.localStorage.getItem("userData") !== null)
            {
                users = JSON.parse(String(window.localStorage.getItem("userData")));
            }
            for (let i = 0; i < users.length; i++)
            {
                if (users[i].id === id)
                {
                    found = i;
                    break;
                }
            }
            if (found === -1)
            {
                setTimeout(() =>
                {
                    resolve({
                        data:
                            { message: "Could not find user" },
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            }
            else
            {
                console.log(link);
                if (link === "")
                {
                    users[found].pfp = process.env.PUBLIC_URL + '/images/defaultpfp.png';
                    window.localStorage.setItem("userData", JSON.stringify(users));
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: users[found] },
                            status: "success"
                        });
                    }, Math.random() * 500 + 1000)
                }
                else
                {
                    users[found].pfp = link;
                    window.localStorage.setItem("userData", JSON.stringify(users));
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: users[found] },
                            status: "success"
                        });
                    }, Math.random() * 500 + 1000)
                }
            }
        })
    }
    static newProject(id: string, title: string)
    {
        return new Promise<APIResponse>((resolve: Function, reject: Function) =>
        {
            let users: any;
            let found = -1;
            if (window.localStorage.getItem("userData") !== null)
            {
                users = JSON.parse(String(window.localStorage.getItem("userData")));
            }
            for (let i = 0; i < users.length; i++)
            {
                if (users[i].id === id)
                {
                    found = i;
                    break;
                }
            }
            if (found === -1)
            {
                setTimeout(() =>
                {
                    resolve({
                        data:
                            { message: "Could not find user" },
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            }
            else
            {
                if (title)
                {
                    users[found].projects.unshift({ title: title });
                    window.localStorage.setItem("userData", JSON.stringify(users));
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: users[found] },
                            status: "success"
                        });
                    }, Math.random() * 500 + 1000)
                }
                else
                {
                    setTimeout(() =>
                    {
                        resolve({
                            data:
                                { message: "Missing title" },
                            status: "error"
                        });
                    }, Math.random() * 500 + 1000)
                }
            }
        })
    }
    static deleteProject(id: string, index: number)
    {
        return new Promise<APIResponse>((resolve: Function, reject: Function) =>
        {
            let users: any;
            let found = -1;
            if (window.localStorage.getItem("userData") !== null)
            {
                users = JSON.parse(String(window.localStorage.getItem("userData")));
            }
            for (let i = 0; i < users.length; i++)
            {
                if (users[i].id === id)
                {
                    found = i;
                    break;
                }
            }
            if (found === -1)
            {
                setTimeout(() =>
                {
                    resolve({
                        data:
                            { message: "Could not find user" },
                        status: "error"
                    });
                }, Math.random() * 500 + 1000)
            }
            else
            {
                users[found].projects.splice(index, 1);
                window.localStorage.setItem("userData", JSON.stringify(users));
                setTimeout(() =>
                {
                    resolve({
                        data:
                            { message: users[found] },
                        status: "success"
                    });
                }, Math.random() * 500 + 1000)
            }

        })
    }
}