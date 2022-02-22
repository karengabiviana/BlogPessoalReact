import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";  
import "./Navbar.css";
import "../../../paginas/home/Home";

function Navbar() {
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
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                        
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Cadastrar Tema
                            </Typography>
                        </Box>
                        <Link to="/login" className="cursor">
                            <Box mx={1} >
                                <Typography variant="h6" color="inherit">
                                    LogOut
                                </Typography>
                            </Box>
                        </Link>  
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;