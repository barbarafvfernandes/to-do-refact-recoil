import { useState, memo, useEffect } from "react"; 
import "./tarefas.css";
import { API_URL } from "./ListaTarefas";
import userState from "../state/user";
import { useRecoilValue } from 'recoil';

function Tarefas({ texto, id, statusInicial, onExcluir }) {

    const [concluida, setConcluida] = useState(statusInicial);
    const usuario = useRecoilValue(userState);

    useEffect(() => {
        setConcluida(statusInicial);
    }, [statusInicial]);

    const alternarConcluida = () => {
        const novoStatus = !concluida;

        const dadosAtualizados = {
            id: id,
            usuario: usuario.nome,
            texto: texto,
            concluida: novoStatus
        };
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Falha na resposta do servidor');
                }
                return res;
            })
            .then(() => {
                // Atualiza o estado local apenas após o sucesso do servidor
                setConcluida(novoStatus);
            })
            .catch(error => console.error("Erro ao atualizar tarefa:", error));
    };

    return (
        <li>
            {/*propriedade checked vinculada ao estado */}
            <input type="checkbox" checked={concluida} onChange={alternarConcluida} />
            <span className={concluida ? 'concluida' : ''}>{texto}</span>
            <button
                type="button"
                onClick={() => onExcluir(id)}
                style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>Excluir
            </button>
        </li>
    )
}
export default memo(Tarefas);
