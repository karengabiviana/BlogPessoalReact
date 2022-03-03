import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory, useParams, } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { buscaId, post, put } from "../../../services/Service";
import useLocalStorage from "react-use-localstorage";
import Tema from "../../../models/Tema";
import './CadastroTema.css';

function CadastroTema() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [token, setToken] = useLocalStorage('token');
    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })

    useEffect(() => {
        if (token == "")//Se o token estiver vazio
        {
            alert("É necessário efetuar o login para essa ação!")
            history.push("/login")// a pessoa usuária vai ser redirecionada ao Login
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, { headers: { 'Authorization': token } }
        )
    }

    function updatedTema(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()//previnir que a tela seja atualizada -> ferindo conceito de SPA
        console.log("temas" + JSON.stringify(tema))//mostrar no console

        if (id !== undefined) // se o id estiver preenchido, tema será atualizado
        {
            put(`/temas`, tema, setTema, {headers: { 'Authorization': token }})
            alert("Tema atualizado com sucesso!");
        }
        else // caso contrário, se o id estiver vazio, tema será criado
        {
            post(`/temas`, tema, setTema, {headers: { 'Authorization': token }})
            alert("Tema cadastrado com sucesso!");
        }
        back()
    }

    function back()
    {
        history.push('/temas')
    }

    return(
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >
                    Cadastro de Tema
                </Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;