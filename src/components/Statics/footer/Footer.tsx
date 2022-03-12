import React from "react";
import { Typography, Box, Grid } from '@material-ui/core';
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import "./Footer.css";
import '../../../Style Global.css';

function Footer() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;

    if (token !== "") {
        footerComponent =
            <Grid container direction="row" justifyContent="center" alignItems="center" className="backgroundDark">
                <Grid alignItems="center" item xs={12}  >
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" className="box1 backgroundDark">
                        <Box marginLeft={4}>
                                <a target="_blank" href="https://brasil.generation.org">
                                    <Typography variant="subtitle2" align="center" gutterBottom className="texto" >©2022 Copyright:</Typography>
                                    <Typography variant="subtitle2" gutterBottom className="texto" align="center">brasil.generation.org</Typography>
                                </a>
                        </Box>
                        <Box marginRight={3} display="flex">
                            <Box padding={1}>
                                <a target="_blank" href="https://github.com/karengabiviana">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="ícone do GitHub" className="iconFooter" />
                                </a>
                            </Box>
                            <Box padding={1}>
                                <a target="_blank" href="https://www.linkedin.com/in/karen-gabrieli-viana/">
                                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="ícone do LinkedIn" className="iconFooter" />
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;