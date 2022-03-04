import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Box, Typography,TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { login } from "../../services/Service";
import { addToken } from "../../store/tokens/Actions";
import { toast } from "react-toastify";
import UserLogin from "../../models/UserLogin";
import "./Login.css";



function Login()
{
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario:'',
            senha:'',
            token:''
        })

        function updatedModel(e: ChangeEvent<HTMLInputElement>) 
        {
            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }
    

    useEffect(()=>{
        if( token != '')
        {
            dispatch(addToken(token))
            history.push('/home')
        }
    } ,[token])    

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) 
    {
        e.preventDefault();
        try
        {
            await login(`/usuarios/logar`, userLogin, setToken)

            toast.success('Login efetuado com sucesso!',// mensagem para a pessoa usuária 
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
        }
        catch(error)
        {
            toast.error('Dados inconsistentes. Falha ao logar!',// mensagem para a pessoa usuária 
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
        }
    }

    return(
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="texto1"> Entrar </Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" fullWidth />
                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
                        <Box marginTop={2} textAlign="center">
                                <Button type="submit" variant="contained" color="primary" >Logar</Button>
                        </Box>
                    </form>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center" 
                             >Ainda não tem uma conta?</Typography>
                        </Box>
                        <Link to="/usuarios/cadastrar" > 
                            <Typography variant="subtitle1" gutterBottom align="center" className="texto1">Cadastre-se</Typography>
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