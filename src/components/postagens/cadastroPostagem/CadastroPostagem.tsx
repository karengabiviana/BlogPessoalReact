import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { busca, buscaId, post, put } from "../../../services/Service";
import useLocalStorage from "react-use-localstorage";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import './CadastroPostagem.css';

function CadastroPostagem()
{
    let history= useHistory();
    const {id} = useParams<{id: string}>();
    const [temas, setTemas] = useState<Tema[]>([]) //Plural:armazena todos os temas já cadastrados na api
    const [token, setToken] = useLocalStorage('token');
    
    useEffect(() => {
        if(token ==="")
        {
            alert("É necessário efetuar o login para essa ação!")
            history.push("/login")
        }
    }, [token])

    const [tema, setTema] = useState<Tema>( //Singular: pega tema específico por Id
        {
            id: 0,
            descricao:''
        })

    const [postagem, setPostagem] = useState<Postagem>(//é o cadastro das postagens
        {
            id: 0,
            titulo: '',
            texto:'',
            tema: null
        })

     // efeito colateral -> mexer no select de temas
    useEffect( () => { // quando selecionado um tema, vai preencher o campo "tema" da Postagem
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])// monitora se tem um tema específico

    // efeito colateral -> modificação de id da Postagem
    useEffect( () => {
        getTemas()//mudança aciona a function getTemas
        if (id !== undefined) // se o id estiver preenchido
        {
            findByIdPostagem(id)// acha a Postagem
        }
    }, [id])//monitora o id da postagem

    async function getTemas() //buscar os temas
    {
        await busca("/temas", setTemas, {headers:{'Authorization': token}})
    }

    async function findByIdPostagem(id: string) 
    {
        await buscaId(`/postagens/${id}`, setPostagem,{headers:{'Authorization': token}})
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>)//vai preencher objeto com as infos que a pessoa usuário preencher nos campos
    {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })
    }

    async function onSubmit(e:ChangeEvent<HTMLFormElement>) 
    {
        e.preventDefault()

        if(id !== undefined)//se o id estiver preenchido
        {
            put(`/postagens`, postagem, setPostagem, // atualiza a postagem
            {headers:{'Authorization': token }}) //requirido autenticação
            alert("Postagem atualizada com sucesso!")
        } 
        else//caso não
        {
            post(`/postagens`, postagem, setPostagem, // cadastra nova postagem
            {headers:{'Authorization': token }}) //requirido autenticação
            alert("Postagem cadastrada com sucesso!")
        }
        back()   
    }

    function back()
    {
        history.push('/postagens')
    }
   
    return(
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center">
                    Cadastro de Postagem
                </Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" variant="outlined" name="texto" margin="normal" fullWidth/>

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema</InputLabel>
                    {/* lista suspensa com as opções de tema */}
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
                    onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema,{headers:{'Authorization': token}})}>
                    {
                        // opções de temas para escolha vão ser listadas
                        temas.map(tema => (
                            <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                        ))
                    }
                    </Select>
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