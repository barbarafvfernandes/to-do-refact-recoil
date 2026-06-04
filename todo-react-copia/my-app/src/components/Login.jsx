//grava usuário no contexto global
import { useInput } from "../hooks/useInput";
import { useContext } from "react";
import { useSetRecoilState } from "recoil";
import userState from "../state/user";

function Login(){
    const nomeDoUsuario = useInput();
    const setUsuario = useSetRecoilState(userState)

    const handleLogin = (e) =>{
        e.preventDefault();

        //grava usuário no contexto global
        setUsuario({nome: nomeDoUsuario.valor, estaLogado: true})
    
    }

    return(
        <form onSubmit={handleLogin}>
            <input type="text"
            placeholder="Digite seu nome"
            value={nomeDoUsuario.valor}
            onChange={nomeDoUsuario.onChange}
            />
            <button type="submit">Entrar</button>
        </form>
    )
}
export default Login;