import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, Box, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Tema from "../../../models/Tema";
import { buscaId, deleteId, } from "../../../services/Service";
import './DeletarTema.css';

function DeletarTema() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [token, setToken] = useLocalStorage('token');
    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if (token == "")//Se o token estiver vazio
        {
            alert("É necessário efetuar o login para essa ação!")
            history.push("/login")// a pessoa usuária vai ser redirecionada ao Login
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) { // se o tiver id
            findById(id)// vai usar a função assíncrona buscaId
        }
    })

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, { Headers: { 'Authorization': token } })
    }

    function sim()// opção sim pra o botão
    {
        history.push('/temas')//a pessoa vai ser redirecionada ao temas
        deleteId(`/tema/&{id}`, { headers: 'Authorization: token' });
        alert('Tema deletado com sucesso!')
    }

    function nao()// opção não pra o botão
    {
        history.push('/temas')//a pessoa vai ser redirecionada ao temas
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom >
                                Deseja deletar o tema?
                            </Typography>
                            <Typography color="textSecondary">
                                {tema?.descricao}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size="large" color="primary" >
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' color="secondary" >
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default DeletarTema;