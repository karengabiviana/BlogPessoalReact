import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { addToken } from "../../../store/tokens/Actions";
import { toast } from "react-toastify";
import "./Navbar.css";
import '../../../Style Global.css';
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
        <AppBar position="static" className="backgroundDark">
                <Toolbar variant="dense" className="bar" >
                    <Link to="/home" className="cursor">
                        <Box display="flex" className="cursor" >
                            <Typography variant="h3" className="cursor primaryColor">
                                Caos 
                            </Typography>
                            <Typography variant="h3" className="secondaryColor">
                                Tech
                            </Typography>
                        </Box>
                    </Link>
                    <Box display="flex" justifyContent="start">
                        <Box mx={1} className="cursor tertiaryColor" onClick={goLogout}>
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