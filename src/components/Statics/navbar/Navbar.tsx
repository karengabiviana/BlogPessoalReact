import React from "react";
import useLocalStorage from "react-use-localstorage";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import "../../../paginas/home/Home";

function Navbar() {
    //capturar o token - isso mesmo , como se o token fosse um pokemon 
    const [token, setToken] = useLocalStorage('token')
    let history = useHistory();
    //mas se a pessoa usuária usar o goLogout vai soltar o pokemon na natureza
    function goLogout() {
        setToken('');//vamos zerar o token
        alert("O login do usuário foi desconectado") // mensagem para a pessoa usuária 
        history.push('/login') //redireciona para página de login
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Box className="cursor" >
                        <Typography variant="h5" color="inherit">
                            Blog Pessoal
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="start">
                        <Link to="/home" className="cursor">
                            <Box mx={1} >
                                <Typography variant="h6" color="inherit">
                                    Home
                                </Typography>
                            </Box>
                        </Link>
                        <Box mx={1} className="cursor">
                            <Link to="/postagens" className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Postagens
                                </Typography>
                            </Link>
                        </Box>

                        <Box mx={1} className="cursor">
                            <Link to="/tema" className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Temas
                                </Typography>
                            </Link>

                        </Box>

                        <Box mx={1} className="cursor">
                            <Link to='/formularioTema' className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Cadastrar Tema
                                </Typography>
                            </Link>
                        </Box>

                        <Box mx={1} className="cursor" onClick={goLogout}>
                            <Typography variant="h6" color="inherit">
                                LogOut
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;