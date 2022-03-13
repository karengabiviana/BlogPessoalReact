import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/TokensReducer';
import { toast } from 'react-toastify';
import TabPostagem from '../../components/postagens/tabPostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import '../../../src/Style Global.css';
import './Home.css';


function Home() {

    let history = useHistory();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "")//Se o token estiver vazio
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
            history.push("/login")// a pessoa usuária vai ser redirecionada ao Login
        }
    }, [token])


    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='backgroundDark'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={15} >
                        <Typography variant="h3" gutterBottom component="h3" align="center" className='tertiaryColor' >Seja bem vinde ao Caos</Typography>
                    </Box>
                    <Box paddingX={12}>
                        <Typography variant="body1"  component="body" align="center" > Estamos todos perdidos no caos tecnológico de muitos números 1 e 0   </Typography>
                    </Box>
                    <Box paddingTop={4} display="flex" justifyContent="center">
                        <Box marginRight={1} > {/* botão de criação de postagem */}
                            <ModalPostagem />
                        </Box>
                        <Link to="/formularioTema" className='text-decorator-none'> {/* botão de ver de postagem */}
                            <Button variant="outlined" className='bottonSecondary' >
                                 Novo Tema 
                            </Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} className="imageHome" >
                </Grid>
                <Grid xs={12} >
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;