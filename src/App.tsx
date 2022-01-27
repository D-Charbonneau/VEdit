import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import './App.css';
import { GlobalContext } from './contexts/globalContext';
import { AccountView } from './views/protected/account.view';
import { FileListView } from './views/protected/fileList.view';
import { HomeView } from './views/public/home.view';
import { LoginView } from './views/public/login.view';
import { NotFound404 } from './views/public/NotFound404.view';
import { SignUpView } from './views/public/signUp.view';

function PublicRoutes()
{
    return (
        <>
            <header>
                <Menu>
                    <Menu.Item>
                        <Link to="/"><h2>VEdit</h2></Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Link to="/signup">Sign Up</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/login">Log In</Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </header>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/signup" element={<SignUpView />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </>
    )
}

function ProtectedRoutes({ user, logOut }: any)
{
    return (
        <>
            <header>
                <Menu>
                    <Menu.Item>
                        <Link to="/"><h2>VEdit</h2></Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button.Group>
                                <Button as={Link} to="/account">Welcome, {user.username}!</Button>
                                <Button>
                                    <Dropdown>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <Link to="/projects">Projects</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Link onClick={logOut} to="/">Log Out</Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Button>
                            </Button.Group>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </header>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/account" element={<AccountView />} />
                <Route path="/projects" element={<FileListView />} />
                <Route path="/company/:id?" element={<SignUpView />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </>
    )
}

function App()
{
    const { state: { loggedIn, user }, onLogout } = useContext(GlobalContext);
    return (
        <>
            {loggedIn ? <ProtectedRoutes user={user} logOut={onLogout} /> : <PublicRoutes />}
        </>
    );
}

export default App;
