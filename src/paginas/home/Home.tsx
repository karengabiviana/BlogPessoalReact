import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/TokensReducer';
import TabPostagem from '../../components/postagens/tabPostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import './Home.css';


function Home() {

    let history = useHistory();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "")//Se o token estiver vazio
        {
            alert("É necessário efetuar o login para essa ação!")
            history.push("/login")// a pessoa usuária vai ser redirecionada ao Login
        }
    }, [token])


    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo' >Seja bem vinde!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo' >Testando o Teste ;D</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to="/postagens" className='text-decorator-none'>
                            <Button variant="outlined" className='botao'>Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://arteeartistas.com.br/wp-content/uploads/2018/09/Noite-Estrelada.-Vincent-van-Gogh.jpg" alt="Quadro 'Noite Estrelada' de Van Gogh" width="600px" height="282px" />
                </Grid>
                <Grid xs={12} className="postagem" >
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;