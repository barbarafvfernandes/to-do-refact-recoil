import { useRecoilValue } from 'recoil';
import { useState } from 'react'; 
import ListaTarefas from './components/ListaTarefas';
import Login from './components/Login';
import userState from './state/user';
import { tarefasCountSelector } from './state/tarefas';

/*app() é um componente App()*/
function App() {
  const usuario = useRecoilValue(userState);
  const tarefasCount = useRecoilValue(tarefasCountSelector);
  const [filtro, setFiltro] = useState('todas');

  return (
    <>
      <h1>To Do List:</h1>
      
      {usuario.estaLogado ? (
        <>
          <ListaTarefas filtro={filtro} /> 
          
          <h2>Quantidade de tarefas: {tarefasCount}</h2>
          
          <div>
            <label>Filtrar: </label>
            <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="todas">Todas as tarefas</option>
              <option value="concluidas">Apenas as concluídas</option>
              <option value="pendentes">Apenas as pendentes</option>
            </select>
          </div>
        </>
      ) : (
        
        <Login />
      )}
    </>
  );
}

export default App;


