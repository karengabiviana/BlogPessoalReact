import axios from "axios";
import { url } from "inspector";

export const api = axios.create(
    {
        baseURL: "https://caostech.herokuapp.com"
    })

export const cadastroUsuario = async (url:any, dados:any, setDado:any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data)
}
export const login = async (url:any, dados:any, setDado:any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data.token)
}
export const busca = async (url:any, setDado:any, header:any) => {
    const resposta = await api.get(url, header) //requisitos: url= caminho, header=se usuário está autenticado(logado)
    setDado(resposta.data) //dados vão ser armazenados em "resposta" -> atribuidos ao front atráves do setDado
}
export const buscaId = async (url:any, setDado:any, header:any) => {
    const resposta = await api.get(url, header) 
    setDado(resposta.data) 
}
export const post = async (url:any, dados:any, setDado:any, header:any) => {
    const resposta = await api.post(url, dados, header) 
    setDado(resposta.data) 
}
export const put = async (url:any, dados:any, setDado:any, header:any) => {
    const resposta = await api.put(url, dados, header) 
    setDado(resposta.data) 
}
export const deleteId = async (url:any, header:any) => {
    await api.delete(url, header) //não precisa de "const resposta =" pq não precisa armazenar dados
    
}