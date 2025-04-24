package com.humanchain.logs.service;

import com.humanchain.logs.model.AIIncident;
import com.humanchain.logs.repository.AIIncidentRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for AI Incident operations.
 * Handles business logic and data access operations for AI incidents.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@Service
public class AIIncidentService {

    private final AIIncidentRepository repository;

    /**
     * Constructs a new AIIncidentService with required repository
     *
     * @param repository The repository for AI incident data access
     */
    public AIIncidentService(AIIncidentRepository repository) {
        this.repository = repository;
    }

    /**
     * Retrieves all incidents from the database
     *
     * @return List of all incidents
     */
    public List<AIIncident> getAllIncidents() {
        return repository.findAll();
    }

    /**
     * Retrieves a specific incident by its ID
     *
     * @param id The ID of the incident to retrieve
     * @return Optional containing the incident if found
     */
    public Optional<AIIncident> getIncidentById(ObjectId id) {
        return repository.findById(id);
    }

    /**
     * Creates a new incident in the database
     *
     * @param incident The incident to create
     * @return The created incident with generated ID
     */
    public AIIncident createIncident(AIIncident incident) {
        return repository.save(incident);
    }

    /**
     * Deletes an incident by its ID
     *
     * @param id The ID of the incident to delete
     */
    public void deleteIncident(ObjectId id) {
        repository.deleteById(id);
    }
}