import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from "@material-ui/core";
import { busca } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { toast } from "react-toastify";
import Postagem from "../../../models/Postagem";
import "./ListaPostagem.css";


function ListaPostagem() {
    const [posts, setPosts] = useState<Postagem[]>([])
    let history = useHistory();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => { //Efeito colateral
        if (token == '')//Se Postagem não existir== token vazio ->
        {
            toast.error('É necessário efetuar o login para essa ação!',// mensagem para a pessoa usuária 
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
            history.push("/login")// pessoa usuária será redirecionade ao login 
        }
    }, [token])

    async function getPost() //função assíncrona
    { //aguardando o método busca(from service)
        await busca("/postagens", setPosts, { headers: { 'Authorization': token } }) //3 parâmetros: (url, setDado, header)
    }
    //chamar o getTema usuando o useEffetc -> efeito colateral
    useEffect(() => { getPost() }, [posts.length]) //sempre que o tamanho do tema for alterado a função getTema será ativada

    return (
        <>
            {
                posts.map(post => ( //mapear cada postagem
                    <Box m={4}>
                        <Card variant="outlined" className="bottonPrimary cardPrimary ">
                            <CardContent>
                                <Typography variant="h5" className="primaryColor" align="center">
                                    {post.titulo} {/* Vai pegar a título da postagem */}
                                </Typography>
                                <Typography variant="body1" className="tertiaryColor " align="center">
                                    {post.tema?.descricao} {/* Vai pegar o tema da postagem */}
                                </Typography>
                                <Typography variant="body2" align="center" className="breakLines" gutterBottom>
                                    {post.texto} {/* Vai pegar o texto da postagem */}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1.5} >
                                    <Link to={`/formularioPostagens/${post.id}`} className="text-decorator-none" >
                                        <Box mx={1}>
                                            <Button variant="outlined" size='small' className="bottonPrimary">
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarPostagens/${post.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="outlined" size='small' className="bottonSecondary">
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