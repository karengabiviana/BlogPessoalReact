import React, { useState, useEffect, ChangeEvent} from "react";
import User from "../../models/User";
import { cadastroUsuario } from "../../services/Service";
import "./CadastroUsuario.css";
import { Grid, Typography, TextField, Box, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function CadastroUsuario()
{
//histórico para usuário poder navegar
    let history = useHistory();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

//useEffect é usado como efeito colateral de alguma ação.
//O efeito do cadastro completo, tendo o id != 0, é ser direcionados para a tela Login
    useEffect(() => { 
        if (userResult.id !== 0) {
            history.push("/login")
        }
    }, [userResult])

//atribuindo valor a confirmaSenha 
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }

//passando valores do formulário aos atributos
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        //previne recarregamento da página -> para não ferir o conceito de SPA
        e.preventDefault()
        //garantir que a senha seja igual ao confimar senha && senha tenha 8 ou mais caracteres
        if(confirmarSenha == user.senha && user.senha.length >= 8 ){
        cadastroUsuario('/usuarios/cadastrar', user, setUserResult)
        alert('Usuario cadastrado com sucesso')
        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }
    
    return(
        <Grid container direction="row" justifyContent= "center" alignItems="center" >
            <Grid item xs={6} className="imagem2" ></Grid>
            <Grid item xs={6} >
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="texto2"> Cadastro </Typography>
                            <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />
                            <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" fullWidth placeholder="nome@email.com"/>
                            <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth placeholder="Insira uma senha com 8 caracteres" />
                            <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>)=> confirmarSenhaHandle(e)} id="confirmarSenha" label="confirmarSenha" variant="outlined" name="confirmarSenha" margin="normal" type="password" fullWidth />
                            <Box marginTop={2} textAlign="center">
                            
                                    <Button type="submit" variant="contained" color="primary" className="btnCancelar" >Cadastrar</Button>
                                
                                <Link to="/login" className="text-decorator-none">
                                    <Button variant="contained" color="secondary" >Cancelar</Button>
                                </Link>
                            </Box>
                    </form>
                </Box>
            </Grid>



        </Grid>
    );
}

export default CadastroUsuario;