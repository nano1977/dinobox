import { useState } from 'react';
import axios from 'axios';
import { API_URL } from './api.js';

const ESTADOS = ['En Recepción', 'En Despacho', 'En Tránsito', 'Entregado'];

function BuscarEncomienda() {
  const [codigo, setCodigo] = useState('');
  const [encomienda, setEncomienda] = useState(null);
  const [error, setError] = useState('');

  const buscar = async () => {
    setEncomienda(null);

    if (codigo.trim() === '') {
      setError('Ingresa un codigo de seguimiento');
      return;
    }
    setError('');

    try {
      const respuesta = await axios.get(API_URL + '/' + codigo.trim().toUpperCase());
      setEncomienda(respuesta.data);
    } catch (err) {
      setError('No se encontro una encomienda con ese codigo');
    }
  };

  return (
    <div className="card p-4">
      <h2 className="text-center">Estado de Encomienda</h2>

      <div className="input-group my-3">
        <input
          className="form-control"
          placeholder="Ingrese codigo de seguimiento"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={buscar}>Buscar</button>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      {encomienda && (
        <div>
          <p>
            <strong>Codigo:</strong> {encomienda.codigo} <br />
            <strong>Destinatario:</strong> {encomienda.destinatario} <br />
            <strong>Direccion:</strong> {encomienda.direccion}
          </p>

          <div className="row text-center">
            {ESTADOS.map((estado) => (
              <div className="col-6 col-md-3 mb-2" key={estado}>
                <div className={estado === encomienda.estado ? 'card p-3 bg-success text-white' : 'card p-3 bg-light'}>
                  <strong>{estado}</strong>
                  {estado === encomienda.estado && <small>Ubicación: {encomienda.ubicacion}</small>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarEncomienda;
