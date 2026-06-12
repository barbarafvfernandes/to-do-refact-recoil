import { useState, memo, useEffect } from "react";
import "./tarefas.css";
import { API_URL } from "./ListaTarefas";
import userState from "../state/user";
import { tarefasState } from "../state/tarefas";
import { useRecoilValue, useSetRecoilState } from 'recoil';

function Tarefas({ texto, id, statusInicial, onExcluir }) {
    const usuario = useRecoilValue(userState);
    const setTarefas = useSetRecoilState(tarefasState); // Hook para atualizar o estado global

    const alternarConcluida = () => {
        const novoStatus = !statusInicial;
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
            setTarefas((tarefasAnteriores) => {
                // Evita erros caso tarefasAnteriores não seja um array no momento
                if (!Array.isArray(tarefasAnteriores)) return [];
                
                return tarefasAnteriores.map((tarefa) =>
                    String(tarefa._id) === String(id) ? { ...tarefa, concluida: novoStatus } : tarefa
                );
            });
        })
        .catch(error => console.error("Erro ao atualizar tarefa:", error));
    };

    return (
        <li>
            <input type="checkbox" checked={statusInicial} onChange={alternarConcluida} />
            <span className={statusInicial ? 'concluida' : ''}>{texto}</span>
            <button type="button" onClick={() => onExcluir(id)}
                style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>Excluir
            </button>
        </li>
    );
}

export default memo(Tarefas);

