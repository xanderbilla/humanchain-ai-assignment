package com.humanchain.logs.controller;

import com.humanchain.logs.model.AIIncident;
import com.humanchain.logs.service.AIIncidentService;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/incidents")
public class AIIncidentController {

    private static final Logger logger = LoggerFactory.getLogger(AIIncidentController.class);
    private final AIIncidentService service;

    public AIIncidentController(AIIncidentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<AIIncident>> getAllIncidents() {
        logger.info("Fetching all incidents");
        return ResponseEntity.ok(service.getAllIncidents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIncidentById(@PathVariable String id) {
        logger.info("Fetching incident with id: {}", id);
        try {
            ObjectId objectId = new ObjectId(id);
            Optional<AIIncident> incident = service.getIncidentById(objectId);
            return incident.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            logger.error("Invalid ObjectId format: {}", id);
            return ResponseEntity.badRequest()
                    .body("Invalid ID format. Please provide a valid MongoDB ObjectId");
        }
    }

    @PostMapping
    public ResponseEntity<AIIncident> createIncident(@RequestBody AIIncident incident) {
        logger.info("Creating new incident: {}", incident.getTitle());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createIncident(incident));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncident(@PathVariable String id) {
        logger.info("Deleting incident with id: {}", id);
        try {
            ObjectId objectId = new ObjectId(id);
            service.deleteIncident(objectId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            logger.error("Invalid ObjectId format: {}", id);
            return ResponseEntity.badRequest()
                    .body("Invalid ID format. Please provide a valid MongoDB ObjectId");
        }
    }
}