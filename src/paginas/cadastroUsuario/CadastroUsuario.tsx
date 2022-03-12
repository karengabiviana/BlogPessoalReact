import React, { useState, useEffect, ChangeEvent } from "react";
import User from "../../models/User";
import { cadastroUsuario } from "../../services/Service";
import { Grid, Typography, TextField, Box, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./CadastroUsuario.css";
import "../../Style Global.css";

function CadastroUsuario() {
    //histórico para usuário poder navegar
    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
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
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])

    //atribuindo valor a confirmaSenha 
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
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
        if (confirmarSenha == user.senha && user.senha.length >= 8) {
            cadastroUsuario('/usuarios/cadastrar', user, setUserResult)
            toast.success('Usuario cadastrado com sucesso',// mensagem para a pessoa usuária 
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
        } else {
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.',// mensagem para a pessoa usuária 
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
        <Grid container direction="row" justifyContent="center" alignItems="center" className="backgroundDark" >
            <Grid item xs={6} className="imagem2" ></Grid>
            <Grid item xs={6} >
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h4" gutterBottom component="h4" align="right" className="texto2 tertiaryColor"> Cadastro </Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="nome" label="Nome" variant="outlined" name="nome" margin="normal" className="backgroundLight textfieldRadius" fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="Usuário" variant="outlined" name="usuario" margin="normal" fullWidth placeholder="nome@email.com" className="backgroundLight textfieldRadius" />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="Senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth placeholder="Insira uma senha com 8 caracteres" className="backgroundLight textfieldRadius" />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id="confirmarSenha" label="Confirmar Senha" variant="outlined" name="confirmarSenha" margin="normal" type="password" fullWidth className="backgroundLight textfieldRadius" />
                        <Box display="flex" justifyContent="center" marginTop={2} textAlign="center">
                            <Box padding={2}>
                                <Button type="submit" variant="outlined" className="bottonPrimary" >Cadastrar</Button>
                            </Box>
                            <Box padding={2}>
                                <Link to="/login" className="text-decorator-none ">
                                    <Button variant="outlined" className="bottonSecondary" >Cancelar</Button>
                                </Link>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Grid>



        </Grid>
    );
}

export default CadastroUsuario;