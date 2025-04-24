package com.humanchain.logs.repository;

import com.humanchain.logs.model.AIIncident;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AIIncidentRepository extends MongoRepository<AIIncident, ObjectId> {
}