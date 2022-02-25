import React from "react";
import { Button, Container, FormControl, FormHelperText, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import './CadastroPostagem.css'

function CadastroPostagem()
{
    return(
        <Container maxWidth="sm" className="topo">
            <form>
                <Typography variant="h3" color="textSecondary" component="h1" align="center">
                    Cadastro de Postagem
                </Typography>
                <TextField id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField id="texto" label="texto" variant="outlined" name="texto" margin="normal" fullWidth/>

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"></Select>
                    <FormHelperText>
                        Escolha um Tema para Postagem
                    </FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPostagem;