import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { busca, buscaId, post, put } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokensReducer";
import { toast } from 'react-toastify'
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import './CadastroPostagem.css';


function CadastroPostagem()
{
    let history= useHistory();
    const {id} = useParams<{id: string}>();
    const [temas, setTemas] = useState<Tema[]>([]) //Plural:armazena todos os temas já cadastrados na api
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    useEffect(() => {
        if(token ==="")
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
           
            history.push("/login") // a pessoa usuária vai ser redirecionada ao Login
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
            toast.success('Postagem atualizada com sucesso!',// mensagem para a pessoa usuária 
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
        else//caso não
        {
            post(`/postagens`, postagem, setPostagem, // cadastra nova postagem
            {headers:{'Authorization': token }}) //requirido autenticação
            toast.success('Postagem cadastrada com sucesso!',// mensagem para a pessoa usuária 
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
        back()   
    }

    function back()
    {
        history.push('/postagens')
    }
   
    return(
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" component="h4" align="center" className="primaryColor" >
                    Cadastro de Postagem
                </Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="Título" variant="outlined" name="titulo" margin="normal"  className="backgroundLight textfieldRadius" fullWidth />
                {/* <TextField value={postagem.imagem} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="imagem" label="URL da Imagem" variant="outlined" name="imagem" margin="normal" className="backgroundLight textfieldRadius" placeholder="Insira uma URL de imagem aqui!">Imagem</TextField> */}
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="Texto" variant="outlined" name="texto" margin="normal" className="backgroundLight textfieldRadius" multiline rows={8}  fullWidth/>
                
                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label" className="tertiaryColor" >Tema</InputLabel>
                    {/* lista suspensa com as opções de tema */}
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" 
                    onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema,{headers:{'Authorization': token}})}>
                    {
                        // opções de temas para escolha vão ser listadas
                        temas.map(tema => (
                            <MenuItem id={"Tema" + tema.id} value={tema.id}>{tema.descricao}</MenuItem>
                        ))
                    }
                    </Select>
                    <FormHelperText>
                        Escolha um Tema para Postagem
                    </FormHelperText>
                    <Button type="submit" variant="outlined" className="bottonPrimary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPostagem;