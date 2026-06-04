import {atom, selector} from 'recoil';
import userState from './user';

export const tarefasState = atom({
    key:"tarefasState",
    default: []
})

export const tarefasCountSelector = selector({
    key: "tarefasCount",
    get: ({get}) =>{
        const tarefas = get(tarefasState);
        const usuario = get(userState)

        if(!usuario.estaLogado) return 0;

        //filtro para contar apenas as tarefas que pertencem ao usuário logado
        const tarefasDoUsuario = tarefas.filter(tarefa => tarefa.usuario === usuario.nome);

        return tarefasDoUsuario.length;
    }
})