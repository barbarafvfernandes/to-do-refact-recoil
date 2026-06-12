import Tarefas from './Tarefas'
import {useEffect} from 'react';
import { useInput } from '../hooks/useInput';
import { useRecoilValue, useRecoilState} from 'recoil';
import userState from "../state/user";
import { tarefasState } from '../state/tarefas';

export const API_URL = 'https://crudcrud.com/api/43a67da25f504d4b9c916d7d2973b9b6/tarefas';

//'filtro' como propriedade
function ListaTarefas({ filtro }) {

  const [listTarefas, setTarefas] = useRecoilState(tarefasState);
  const tarefa = useInput();
  const usuario = useRecoilValue(userState);

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(dados => setTarefas(dados))
    .catch(error => console.error("Erro ao buscar tarefas:", error))
  }, [setTarefas])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(tarefa.valor === '') return;

    const nova = {usuario: usuario.nome, texto: tarefa.valor, concluida: false}
    fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(nova)
    })
    .then(res => res.json())
    .then(tarefaCriada => {
      setTarefas([...listTarefas, tarefaCriada]); 
      tarefa.limpar();
    })
    .catch(error => console.error("Erro ao adicionar tarefas:", error))
  }

  const handleExcluir = (idDeletado) => {
    fetch(`${API_URL}/${idDeletado}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao deletar no servidor");
      setTarefas(prevLista => prevLista.filter(t => t._id !== idDeletado));
    })
    .catch(error => console.error("Erro ao excluir tarefa:", error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite uma nova tarefa"
          value={tarefa.valor}
          onChange={tarefa.onChange}
        />
        <button type='submit'>Adicionar</button>
      </form>
      <ul>
        {listTarefas
        //Garante apenas as tarefas do usuário logado
        .filter(tarefa => tarefa.usuario === usuario.nome)
        //APLICAÇÃO DO FILTRO DO SELECT
        .filter(tarefa => {
          if (filtro === 'concluidas') return tarefa.concluida === true;
          if (filtro === 'pendentes') return tarefa.concluida === false;
          return true; 
        })
        .map(tarefa => (
          <Tarefas 
            // MODIFICAÇÃO DA KEY: Força o React a re-renderizar a linha ao mudar o filtro
            key={`${tarefa._id}-${filtro}`} 
            texto={tarefa.texto}  
            id={tarefa._id} 
            statusInicial={tarefa.concluida} 
            onExcluir={handleExcluir} 
          />
        ))}
      </ul>
    </>
  )
}

export default ListaTarefas;

