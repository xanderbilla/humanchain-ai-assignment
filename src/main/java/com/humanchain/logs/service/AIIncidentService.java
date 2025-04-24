package com.humanchain.logs.service;

import com.humanchain.logs.model.AIIncident;
import com.humanchain.logs.repository.AIIncidentRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AIIncidentService {

    private final AIIncidentRepository repository;

    public AIIncidentService(AIIncidentRepository repository) {
        this.repository = repository;
    }

    public List<AIIncident> getAllIncidents() {
        return repository.findAll();
    }

    public Optional<AIIncident> getIncidentById(ObjectId id) {
        return repository.findById(id);
    }

    public AIIncident createIncident(AIIncident incident) {
        return repository.save(incident);
    }

    public void deleteIncident(ObjectId id) {
        repository.deleteById(id);
    }
}