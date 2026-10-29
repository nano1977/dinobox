import { useState } from 'react';
import axios from 'axios';
import { API_URL } from './api.js';

function EnviarEncomienda() {
  const [remitente, setRemitente] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [direccion, setDireccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [codigo, setCodigo] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    setCodigo('');

    // Validacion: los campos obligatorios no pueden estar vacios
    if (remitente.trim() === '' || destinatario.trim() === '' || direccion.trim() === '') {
      setError('Debes completar remitente, destinatario y direccion');
      return;
    }
    setError('');

    try {
      const respuesta = await axios.post(API_URL, { remitente, destinatario, direccion, descripcion });
      setCodigo(respuesta.data.codigo);
      // Limpiar el formulario
      setRemitente('');
      setDestinatario('');
      setDireccion('');
      setDescripcion('');
    } catch (err) {
      setError('No se pudo registrar la encomienda. Revisa que el backend este encendido.');
    }
  };

  return (
    <div className="card p-4">
      <h2>Enviar encomienda</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {codigo && (
        <div className="alert alert-success">
          Encomienda registrada. Tu codigo de seguimiento es: <strong>{codigo}</strong>
        </div>
      )}

      <form onSubmit={enviar}>
        <div className="mb-3">
          <label className="form-label">Remitente *</label>
          <input className="form-control" value={remitente} onChange={(e) => setRemitente(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Destinatario *</label>
          <input className="form-control" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Direccion de entrega *</label>
          <input className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripcion del paquete</label>
          <input className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success">Enviar</button>
      </form>
    </div>
  );
}

export default EnviarEncomienda;
