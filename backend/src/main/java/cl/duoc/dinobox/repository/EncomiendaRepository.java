package cl.duoc.dinobox.repository;

import cl.duoc.dinobox.model.Encomienda;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository ya trae save, findAll, findById, delete, etc.
public interface EncomiendaRepository extends JpaRepository<Encomienda, Long> {

    // Busca una encomienda por su codigo de seguimiento
    Encomienda findByCodigo(String codigo);
}
