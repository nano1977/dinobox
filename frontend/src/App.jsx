import { useState } from 'react';
import EnviarEncomienda from './EnviarEncomienda.jsx';
import BuscarEncomienda from './BuscarEncomienda.jsx';
import ListaEncomiendas from './ListaEncomiendas.jsx';

function App() {
  // Guarda que vista se esta mostrando
  const [vista, setVista] = useState('buscar');

  return (
    <div>
      <nav className="navbar navbar-dark bg-success mb-4">
        <div className="container">
          <span className="navbar-brand">Dinobox 🦖</span>
          <div>
            <button className="btn btn-light btn-sm me-2" onClick={() => setVista('buscar')}>Seguimiento</button>
            <button className="btn btn-light btn-sm me-2" onClick={() => setVista('enviar')}>Enviar</button>
            <button className="btn btn-light btn-sm" onClick={() => setVista('lista')}>Encomiendas</button>
          </div>
        </div>
      </nav>

      <div className="container">
        {vista === 'buscar' && <BuscarEncomienda />}
        {vista === 'enviar' && <EnviarEncomienda />}
        {vista === 'lista' && <ListaEncomiendas />}
      </div>
    </div>
  );
}

export default App;
