import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/Service";
import { addToken } from "../../store/tokens/Actions";
import { toast } from "react-toastify";
import UserLogin from "../../models/UserLogin";
import "./Login.css";
import "../../Style Global.css";



function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token))
            history.push('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)

            toast.success('Login efetuado com sucesso!',// mensagem para a pessoa usuária 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined
                });
        }
        catch (error) {
            toast.error('Dados inconsistentes. Falha ao logar!',// mensagem para a pessoa usuária 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined
                });
        }
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className="backgroundDark">
            <Grid alignItems="center" xs={6}  >
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h4" gutterBottom component="h4" align="right" className="tertiaryColor"> Entrar </Typography>
                    
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="Usuário" variant="outlined" name="usuario" margin="normal" className="backgroundLight textfieldRadius"  fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="Senha" variant="outlined" name="senha" margin="normal" type="password" className="backgroundLight textfieldRadius" fullWidth />
                        
                        <Box marginTop={2} textAlign="center" >
                            <Button type="submit" variant="contained" className="primaryBackground" >Logar</Button>
                        </Box>
                    </form>
                    <Box display="flex" justifyContent="flex-end" marginTop={2} >
                        <Box marginRight={1}>
                            <Typography variant="body1" gutterBottom align="center" className="noBreakLines"
                            >Ainda não tem uma conta?</Typography>
                        </Box>
                        <Link to="/usuarios/cadastrar" >
                            <Typography variant="body1" gutterBottom align="right" className="secondaryColor noBreakLines">Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className="imagem">

            </Grid>
        </Grid>
    );
}

export default Login;