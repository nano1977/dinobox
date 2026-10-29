package cl.duoc.dinobox.controller;

import cl.duoc.dinobox.model.Encomienda;
import cl.duoc.dinobox.service.EncomiendaService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/encomienda")
@CrossOrigin(origins = "http://localhost:5173")
public class EncomiendaController {

    @Autowired
    private EncomiendaService service;

    @Operation(summary = "Registrar una nueva encomienda (responde con el codigo de seguimiento)")
    @PostMapping
    public ResponseEntity<Encomienda> crear(@Valid @RequestBody Encomienda encomienda) {
        return ResponseEntity.status(201).body(service.crear(encomienda));
    }

    @Operation(summary = "Listar todas las encomiendas")
    @GetMapping
    public List<Encomienda> listar() {
        return service.listar();
    }

    @Operation(summary = "Buscar una encomienda por su codigo de seguimiento")
    @GetMapping("/{codigo}")
    public ResponseEntity<Encomienda> buscar(@PathVariable String codigo) {
        Encomienda encomienda = service.buscar(codigo);
        if (encomienda == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(encomienda);
    }

    @Operation(summary = "Actualizar el estado y la ubicacion de una encomienda")
    @PutMapping("/{codigo}")
    public ResponseEntity<Encomienda> actualizar(@PathVariable String codigo, @RequestBody Encomienda datos) {
        if (datos.getEstado() == null || datos.getEstado().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        Encomienda encomienda = service.actualizar(codigo, datos.getEstado(), datos.getUbicacion());
        if (encomienda == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(encomienda);
    }

    @Operation(summary = "Eliminar una encomienda")
    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> eliminar(@PathVariable String codigo) {
        if (!service.eliminar(codigo)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
