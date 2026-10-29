import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './api.js';

const ESTADOS = ['En Recepción', 'En Despacho', 'En Tránsito', 'Entregado'];

function ListaEncomiendas() {
  const [encomiendas, setEncomiendas] = useState([]);
  const [error, setError] = useState('');

  // Trae todas las encomiendas del backend
  const cargar = async () => {
    try {
      const respuesta = await axios.get(API_URL);
      setEncomiendas(respuesta.data);
      setError('');
    } catch (err) {
      setError('No se pudo conectar con el backend');
    }
  };

  // Se ejecuta una vez al abrir la vista
  useEffect(() => {
    cargar();
  }, []);

  const actualizar = async (codigo, estado, ubicacion) => {
    if (ubicacion.trim() === '') {
      alert('Debes ingresar la ubicacion');
      return;
    }
    await axios.put(API_URL + '/' + codigo, { estado, ubicacion });
    cargar();
  };

  const eliminar = async (codigo) => {
    if (window.confirm('¿Eliminar la encomienda ' + codigo + '?')) {
      await axios.delete(API_URL + '/' + codigo);
      cargar();
    }
  };

  return (
    <div className="card p-4">
      <h2>Encomiendas</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Destinatario</th>
            <th>Estado</th>
            <th>Ubicacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {encomiendas.map((e) => (
            <FilaEncomienda key={e.id} encomienda={e} onActualizar={actualizar} onEliminar={eliminar} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

// Cada fila tiene su propio estado para el select y el input
function FilaEncomienda({ encomienda, onActualizar, onEliminar }) {
  const [estado, setEstado] = useState(encomienda.estado);
  const [ubicacion, setUbicacion] = useState(encomienda.ubicacion);

  return (
    <tr>
      <td>{encomienda.codigo}</td>
      <td>{encomienda.destinatario}</td>
      <td>
        <select className="form-select form-select-sm" value={estado} onChange={(e) => setEstado(e.target.value)}>
          {ESTADOS.map((e) => <option key={e}>{e}</option>)}
        </select>
      </td>
      <td>
        <input className="form-control form-control-sm" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
      </td>
      <td>
        <button className="btn btn-primary btn-sm me-1" onClick={() => onActualizar(encomienda.codigo, estado, ubicacion)}>Actualizar</button>
        <button className="btn btn-danger btn-sm" onClick={() => onEliminar(encomienda.codigo)}>Eliminar</button>
      </td>
    </tr>
  );
}

export default ListaEncomiendas;
