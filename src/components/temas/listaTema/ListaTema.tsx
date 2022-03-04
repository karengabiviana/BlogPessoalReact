import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { busca } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import "./ListaTema.css";
import Tema from "../../../models/Tema";


function ListaTema() {
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let history = useHistory();

    useEffect(() => { //Efeito colateral
        if (token == '')//Se Tema não existir== token vazio ->
        {
            alert("Você precisa estar com login ativo")//Vai aparecer esse aviso para a pessoa usuária
            history.push("/login")// pessoa usuária será redirecionade ao login 
        }
    }, [token])

    async function getTema() //função assíncrona
    { //aguardando o método busca(from service)
        await busca("/temas", setTemas, { headers: { 'Authorization': token } }) //3 parâmetros: (url, setDado, header)
    }
    //chamar o getTema usuando o useEffetc -> efeito colateral
    useEffect(() => { getTema() }, [temas.length]) //sempre que o tamanho do tema for alterado a função getTema será ativada

    return (
        <>
            {
                temas.map(tema=>( //mapear cada tema
                <Box m={2}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" >
                                Tema
                            </Typography>
                            <Typography>
                                {tema.descricao} {/* Vai pegar a descrição do temas */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" justifyContent="center" mb={1.5} >

                                <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                            atualizar
                                        </Button>
                                    </Box>
                                </Link>
                                <Link to={`/deletarTemas/${tema.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" size='small' color="secondary">
                                            deletar
                                        </Button>
                                    </Box>
                                </Link>
                            </Box>
                        </CardActions>
                    </Card>
                </Box>
            ))}
        </>
    )
}

export default ListaTema;