import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { addToken } from "../../../store/tokens/Actions";
import { toast } from "react-toastify";
import "./Navbar.css";
import "../../../paginas/home/Home";

function Navbar() {
    //capturar o token - isso mesmo , como se o token fosse um pokemon 
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let history = useHistory();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        toast.info('O login do usuário foi desconectado',// mensagem para a pessoa usuária 
        {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick:true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined
        });

        history.push('/login') //redireciona para página de login
    }

    var navbarComponent;

    if(token!=="")
    {
        navbarComponent =
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
                            <Link to="/temas" className="cursor">
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
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;