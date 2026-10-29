package cl.duoc.dinobox.service;

import cl.duoc.dinobox.model.Encomienda;
import cl.duoc.dinobox.repository.EncomiendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class EncomiendaService {

    @Autowired
    private EncomiendaRepository repository;

    // Crea la encomienda con un codigo aleatorio y estado inicial
    public Encomienda crear(Encomienda encomienda) {
        encomienda.setCodigo(generarCodigo());
        encomienda.setEstado("En Recepción");
        encomienda.setUbicacion("Santiago Centro");
        return repository.save(encomienda);
    }

    public List<Encomienda> listar() {
        return repository.findAll();
    }

    public Encomienda buscar(String codigo) {
        return repository.findByCodigo(codigo);
    }

    // Cambia el estado y la ubicacion de una encomienda
    public Encomienda actualizar(String codigo, String estado, String ubicacion) {
        Encomienda encomienda = repository.findByCodigo(codigo);
        if (encomienda == null) {
            return null;
        }
        encomienda.setEstado(estado);
        encomienda.setUbicacion(ubicacion);
        return repository.save(encomienda);
    }

    public boolean eliminar(String codigo) {
        Encomienda encomienda = repository.findByCodigo(codigo);
        if (encomienda == null) {
            return false;
        }
        repository.delete(encomienda);
        return true;
    }

    // Genera un codigo como DINO-123456 y revisa que no se repita
    private String generarCodigo() {
        Random random = new Random();
        String codigo;
        do {
            int numero = 100000 + random.nextInt(900000);
            codigo = "DINO-" + numero;
        } while (repository.findByCodigo(codigo) != null);
        return codigo;
    }
}
