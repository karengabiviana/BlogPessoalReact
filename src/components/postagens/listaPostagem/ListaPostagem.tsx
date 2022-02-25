import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import useLocalStorage from "react-use-localstorage";
import "./ListaPostagem.css";
import Postagem from "../../../models/Postagem";
import { busca } from "../../../services/Service";

function ListaPostagem() {
    const [posts, setTemas] = useState<Postagem[]>([])
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    useEffect(() => { //Efeito colateral
        if (token == '')//Se Postagem não existir== token vazio ->
        {
            alert("Você precisa estar com login ativo")//Vai aparecer esse aviso para a pessoa usuária
            history.push("/login")// pessoa usuária será redirecionade ao login 
        }
    }, [token])

    async function getPost() //função assíncrona
    { //aguardando o método busca(from service)
        await busca("/postagens", setTemas, { headers: { 'Authorization': token } }) //3 parâmetros: (url, setDado, header)
    }
    //chamar o getTema usuando o useEffetc -> efeito colateral
    useEffect(() => { getPost() }, [posts.length]) //sempre que o tamanho do tema for alterado a função getTema será ativada

    return (
        <>
            {
                posts.map(post=>( //mapear cada postagem
                <Box m={2}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" >
                                Postagens
                            </Typography>
                            <Typography>
                                {post.titulo} {/* Vai pegar a título da postagem */}
                            </Typography>
                            <Typography>
                                {post.texto} {/* Vai pegar o texto da postagem */}
                            </Typography>
                            <Typography>
                                {post.tema?.descricao} {/* Vai pegar o tema da postagem */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" justifyContent="center" mb={1.5} >

                                <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none">
                                    <Box mx={1}>
                                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                            atualizar
                                        </Button>
                                    </Box>
                                </Link>
                                <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
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

export default ListaPostagem;