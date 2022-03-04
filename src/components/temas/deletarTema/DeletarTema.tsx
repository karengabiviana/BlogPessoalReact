import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, Box, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { buscaId, deleteId, } from "../../../services/Service";
import { toast } from "react-toastify";
import Tema from "../../../models/Tema";
import './DeletarTema.css';


function DeletarTema() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if (token == "")//Se o token estiver vazio
        {
            toast.error('É necessário efetuar o login para essa ação!',// mensagem para a pessoa usuária 
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
            history.push("/login")// a pessoa usuária vai ser redirecionada ao Login
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) { // se o tiver id
            findById(id)// vai usar a função assíncrona buscaId
        }
    }, [id])

    async function findById(id: string) 
    {
        buscaId(`/temas/${id}`, setTema, { headers: { 'Authorization': token } })
    }

    function sim()// opção sim pra o botão
    {
        history.push('/temas')//a pessoa vai ser redirecionada ao temas
        deleteId(`/temas/${id}`, { headers: {'Authorization': token } } );
        toast.success('Tema deletado com sucesso!',// mensagem para a pessoa usuária 
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

    function nao()// opção não pra o botão
    {
        history.push('/temas')//a pessoa vai ser redirecionada ao temas
    }

    return(
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