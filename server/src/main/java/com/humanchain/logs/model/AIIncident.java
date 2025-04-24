package com.humanchain.logs.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.humanchain.logs.serializer.ObjectIdSerializer;
import com.humanchain.logs.serializer.ObjectIdDeserializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Entity class representing an AI Incident in the system.
 * This class maps to the 'incidents' collection in MongoDB.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "incidents")
public class AIIncident {
    /**
     * Unique identifier for the incident
     */
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId id;

    /**
     * Title of the incident
     */
    private String title;

    /**
     * Detailed description of the incident
     */
    private String description;

    /**
     * Severity level of the incident
     */
    private Severity severity;

    /**
     * Timestamp when the incident was reported
     */
    private LocalDateTime reportedAt = LocalDateTime.now();

    /**
     * Enum representing the severity levels of an incident
     */
    public enum Severity {
        LOW, MEDIUM, HIGH
    }
}